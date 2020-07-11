layui.config({
    base: rootUrl + '/layuiadmin/'//静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form'], function () {
    var $ = layui.$
        , form = layui.form;
    //监听搜索
    form.on('submit(layuiadmin-app-role-menuSet)', function (data) {
        debugger
        var treeObj = $.fn.zTree.getZTreeObj("menuTree");
        var selNode = treeObj.getCheckedNodes(true);
        var nodes = [];
        for (var i = 0; i < selNode.length; i++) {
            var node = new Object();
            node.roleId = $("input[name='roleId']").val();
            node.type = selNode[i].type;
            if (selNode[i].type == 'm') {
                node.menuId = selNode[i].id;
            } else {
                node.buttonId = selNode[i].buttonId;
                node.menuId = selNode[i].pid;
            }
            nodes.push(node);
        }
        //Ajax提交
        var jsonData = {
            roleId: $("input[name='roleId']").val(),
            nodes: JSON.stringify(nodes)
        }
        $.ajax({
            type: "post",
            data: jsonData,
            url: rootUrl + '/uqiansoftAdmin/auth/role/selectMenu',
            dataType: "json",
            success: function (result) {
                if (result.status == '200') {
                    layer.msg(result.message, {
                        // icon: 1,
                        time: 1000 //1秒关闭（如果不配置，默认是3秒）
                    }, function () {
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

    var roleId = $("input[name='roleId']").val();
    /**
     * 获取ztree数据
     */
    var jsonData = {roleId: roleId}
    $.ajax({
        type: "post",
        data: jsonData,
        url: rootUrl + '/uqiansoftAdmin/auth/role/listMenuTree',
        dataType: "json",
        success: function (result) {

            $.each(result, function (i, val) {

                if (val.type == "m") {

                    val["icon"] = rootUrl + "/images/x.png";
                } else {

                    val["icon"] = rootUrl + "/images/g.png";
                }
            });
            var zNodes = result;
            $.fn.zTree.init($("#menuTree"), menuSetting, zNodes);
            zTree = $.fn.zTree.getZTreeObj("menuTree");
            debugger
            for (var i = 0; i < zNodes.length; i++) {
                if (zNodes[i].value == '1') {
                    var node = zTree.getNodeByParam("id", zNodes[i].id);
                    zTree.checkNode(node, true);
                    //处理父节点checked
                    var pnode = node.getParentNode();
                    while (pnode) {
                        zTree.checkNode(pnode, true);
                        pnode = pnode.getParentNode();
                        if (pnode == "undefined") {
                            break;
                        }

                    }

                }
            }
        }
    });


});