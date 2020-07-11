layui.config({
    base: rootUrl + '/layuiadmin/'//静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'auth/roleObjectListModule', 'table'], function () {
    var table = layui.table
        , form = layui.form;
    //监听搜索
    form.on('submit(layuiadmin-app-role-objectSet)', function (data) {
        var treeObj = $.fn.zTree.getZTreeObj("deptTree");
        var nodes = treeObj.getSelectedNodes();
        if (nodes.length > 1 || nodes.length == 0) {
            return layer.msg('请选择一个节点');
        }
        var objectId;
        if (nodes[0].type == 'u') {
            objectId = nodes[0].userId;
        } else {
            objectId = nodes[0].id;
        }
        //Ajax提交
        var jsonData = {
            roleId: $("input[name='roleId']").val(),
            objectId: objectId,
            objectType: nodes[0].type
        }
        $.ajax({
            type: "post",
            data: jsonData,
            url: rootUrl + '/uqiansoftAdmin/auth/role/roleSetUser',
            dataType: "json",
            success: function (result) {
                if (result.status == '200') {
                    layer.msg(result.message, {
                        // icon: 1,
                        time: 1000 //1秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        //执行重载
                        table.reload('LAY-app-roleObject-list', {
                            where: {roleId: $("input[name='roleId']").val()}
                        });
                        // parent.layer.close(index); //再执行关闭
                    });
                }

            }
        });
    });
    form.on('submit(layuiadmin-app-role-objectCancel)', function (data) {
        var checkStatus = table.checkStatus('LAY-app-roleObject-list')
            , checkData = checkStatus.data; //得到选中的数据

        if (checkData.length === 0) {
            return layer.msg('请选择数据');
        }
        var objectIds = [];
        for (var i in checkData) {
            objectIds.push(checkData[i].uuid);
        }
        var objectStr = objectIds.join(',');
        //Ajax提交
        $.ajax({
            type: "post",
            data: {checkBoxArr: objectStr},
            url: rootUrl + '/uqiansoftAdmin/auth/role/roleSetUserCancel',
            dataType: "json",
            success: function (result) {
                if (result.status == '200') {
                    layer.msg(result.message, {
                        // icon: 1,
                        time: 1000 //1秒关闭（如果不配置，默认是3秒）
                    }, function () {
                        //执行重载
                        table.reload('LAY-app-roleObject-list', {
                            where: {roleId: $("input[name='roleId']").val()}
                        });
                    });
                }

            }
        });
    });

    $('.layui-btn.layuiadmin-btn-list').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    var setting = {
        view: {
            dblClickExpand: false,
            selectedMulti: false,
            fontCss: getFont,
            nameIsHTML: true,
            txtSelectedEnable: true
        },
        key: {
            title: "t"
        },
        check: {
            enable: false,
            chkStyle: "checkbox"
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pid",
                rootPId: ""
            }
        },
        async: {
            enable: true
        }
    };
    var menuSetting = {
        view: {
            dblClickExpand: false,
            selectedMulti: false,
            fontCss: getFont,
            nameIsHTML: true
        },
        key: {
            title: "t"
        },
        check: {
            enable: true,
            chkStyle: "checkbox"
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pid",
                rootPId: ""
            }
        },
        async: {
            enable: true
        }
    };

    /**
     * 获取字体
     * @param treeId
     * @param node
     * @returns
     */
    function getFont(treeId, node) {
        return node.t == 1 ? {'color': 'red'} : node.t == 0 ? {'color': 'blue'} : {'color': 'black'};
    }

    /**
     * 获取ztree数据
     */
    $.ajax({
        url: rootUrl + "/uqiansoftAdmin/auth/role/listObjectTree",
        type: "post",
        cache: false,
        dataType: "json",
        async: false,
        success: function (result) {

            $.each(result, function (i, val) {

                if (val.type == "d") {

                    val["icon"] = rootUrl + "/images/t.png";
                } else {

                    val["icon"] = rootUrl + "/images/u.png";
                }
            })
            zNodes = result;
            $.fn.zTree.init($("#deptTree"), setting, zNodes);


        }
    });


});