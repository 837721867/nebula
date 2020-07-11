layui.config({
    base: rootUrl + '/layuiadmin/'//静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'auth/deptListModule', 'table'], function () {
    var table = layui.table
        , form = layui.form;

    //监听搜索
    form.on('submit(LAY-app-dept-search)', function (data) {
        var field = data.field;

        //执行重载
        table.reload('LAY-app-dept-list', {
            where: field
        });
    });

    var $ = layui.$, active = {
        batchdel: function () {
            var checkStatus = table.checkStatus('LAY-app-dept-list')
                , checkData = checkStatus.data; //得到选中的数据

            if (checkData.length === 0) {
                return layer.msg('请选择数据');
            }
            layer.confirm('确定删除吗？', function (index) {
                var treeObj = $.fn.zTree.getZTreeObj("deptTree");
                var deptIds = [];
                for (var i in checkData) {
                    deptIds.push(checkData[i].deptId);
                }
                var deptStr = deptIds.join(',');

                // 执行 Ajax 后重载
                $.ajax({
                    url: rootUrl + "/uqiansoftAdmin/auth/dept/del",
                    type: "post",
                    cache: false,
                    dataType: "json",
                    data: {ids: deptStr},
                    async: false,
                    success: function (result) {
                        if (result.status == '200') {
                            for (var j in checkData) {
                                var nodes = treeObj.getNodesByParam("id", checkData[j].deptId, null);
                                treeObj.removeNode(nodes[0]);
                            }

                        }
                        layer.msg(result.message, {
                            // icon: 1,
                            time: 1000 //1秒关闭（如果不配置，默认是3秒）
                        }, function () {
                            table.reload('LAY-app-dept-list');
                        });
                    }
                });

            });
        },
        add: function () {
            var treeObj = $.fn.zTree.getZTreeObj("deptTree");
            var nodes = treeObj.getSelectedNodes();
            if (nodes.length > 1 || nodes.length == 0) {
                return layer.msg('请选择一个节点');
            }
            layer.open({
                type: 2
                , title: '新增部门'
                , content: 'dept/deptAdd'
                , maxmin: true
                , area: ['550px', '550px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#layuiadmin-app-dept-submit");
                    submit.click();
                }
            });
        }
    };

    $('.layui-btn.layuiadmin-btn-list').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
    var zTree;
    var setting = {
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
        },
        callback: {
            beforeClick: function (treeId, treeNode) {

            },
            /**
             * 回调函数（点击之后，pId获取点击的id，刷新列表）
             */
            onClick: function (event, treeId, treeNode) {
                var ids = [];
                var treeObj = $.fn.zTree.getZTreeObj("deptTree");
                var nodes = treeObj.getSelectedNodes();
                if (nodes.length > 0) {
                    ids = getChildren(ids, nodes[0]);
                    $("input[name='idArray']").val(ids.join(","));
                }
                layui.table.reload('LAY-app-dept-list', {
                    where: {
                        "idArray": $("input[name='idArray']").val()
                    }
                });
            },
            onRightClick: function (event, treeId, treeNode) {
                event.preventDefault();//屏蔽右击事件
                var chks = $('input[name="chk"]:checked');
                if (chks.length == 0) {
                    modal.dialog(
                        {
                            "title": "操作提示",//标题
                            "message": "请选择要调用的部门",//内容
                            "okText": "确定",//确定按钮文字
                        });
                    return;
                }
                //获取值
                var checkBoxArr = [];
                chks.each(function () {
                    checkBoxArr.push($(this).val());
                });
                var parentId = treeNode.id;
                var parentPid = treeNode.pid;
                var checkIds = checkBoxArr.join(",");
                if (checkIds.indexOf(parentId) != -1) {
                    modal.dialog(
                        {
                            "title": "操作提示",//标题
                            "message": "本部门不能调用本部门，请重新选择",//内容
                            "okText": "确定",//确定按钮文字
                        });
                    return;
                }
                if (checkIds.indexOf(parentPid) != -1) {
                    modal.dialog(
                        {
                            "title": "操作提示",//标题
                            "message": "父部门不能调动到子部门，请重新选择",//内容
                            "okText": "确定",//确定按钮文字
                        });
                    return;
                }
                var param = {"parentId": treeNode.id, "deptIds": checkBoxArr.join(",")};
                modal.confirm(
                    {
                        "title": "操作提示",//标题
                        "message": "是否确定该部门调动带您右键选择的部门下面？",//内容
                        "okText": "确定",//确定按钮文字
                        "noText": "关闭",//关闭按钮文字
                        "okfn": function () {
                            $.ajax({
                                url: "uqiansoftAdmin/auth/dept/changeParentDept",
                                type: "post",
                                cache: false,
                                data: param,
                                dataType: "json",
                                success: function (result) {
                                    if (result.status == "200") {

                                    } else {

                                    }
                                }
                            });
                        },//按钮回调函数
                        "nofn": function () {
                            searchData();
                        }//关闭按钮回调
                    });
            }
        }
    };
    /**
     * 获取ztree数据
     */
    $.ajax({
        url: rootUrl + "/uqiansoftAdmin/auth/dept/listDeptTree",
        type: "post",
        cache: false,
        dataType: "json",
        async: false,
        success: function (result) {
            zNodes = result;
        }
    });

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
     * 检索某节点下面的所有子节点的id
     * @param ids
     * @param treeNode
     * @returns
     */
    function getChildren(ids, treeNode) {
        ids.push(treeNode.id);
        if (treeNode.isParent) {
            for (var obj in treeNode.children) {
                getChildren(ids, treeNode.children[obj]);
            }
        }
        return ids;
    }

    //部门菜单树
    $.fn.zTree.init($("#deptTree"), setting, zNodes);
    //检索菜单树
    $('#searchTree').click(function(){
        debugger
        if ($("input[name='searchTreeText']").val()==''||$("input[name='searchTreeText']").val()==null) {
           return layer.msg('请输入您要选择的树节点的名称');
        }
        var ids = [];
        var treeObj = $.fn.zTree.getZTreeObj("deptTree");
        var node = treeObj.getNodesByParamFuzzy("name", $("input[name='searchTreeText']").val(), null);
        if (node.length>0) {
            treeObj.selectNode(node[0]);
            var nodes = treeObj.getSelectedNodes();
            if (nodes.length > 0) {
                ids = getChildren(ids, nodes[0]);
                $("input[name='idArray']").val(ids.join(","));
            }
            layui.table.reload('LAY-app-dept-list', {
                where: {
                    "idArray": $("input[name='idArray']").val()
                }
            });
        }
    })
});