layui.config({
    base: rootUrl + '/layuiadmin/'//静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form'], function () {
    var table = layui.table
        , form = layui.form;

    //监听提交
    form.on('submit(add)', function (data) {
        var treeObj = $.fn.zTree.getZTreeObj("menuTree");
        var nodes = treeObj.getSelectedNodes();
        var newNodeName = $("input[name='menuName']").val();
        if (nodes.length > 1 || nodes.length == 0) {
            layer.msg('请选择一个节点', {
                time: 1000 //1秒关闭（如果不配置，默认是3秒）
            }, function () {
            });
            return;
        }
        var arr = [];
        $("input:checkbox[name='operId']:checked").each(function () {
            arr.push($(this).val());
        });
        $("input[name='oper']").val(arr.join(","));
        layer.confirm('是否于当前节点下创建子节点？', function (index) {
            var params = $('#menuForm').serializeJSON();
            $.ajax({
                url: rootUrl + "/uqiansoftAdmin/auth/menu/insertMenu",
                contentType: 'application/json',
                type: "post",
                cache: false,
                dataType: "json",
                data: JSON.stringify(params),
                async: false,
                success: function (result) {
                    if (result.status == '200') {
                        var newNode = {id: result.data.id, name: newNodeName};
                        treeObj.addNodes(nodes[0], newNode);
                    }
                    layer.msg(result.message, {
                        // icon: 1,
                        time: 1000 //1秒关闭（如果不配置，默认是3秒）
                    }, function () {
                    });
                }
            });
        });
        return false;
    });
    form.on('submit(update)', function (data) {
        var treeObj = $.fn.zTree.getZTreeObj("menuTree");
        var nodes = treeObj.getSelectedNodes();
        var newNodeName = $("input[name='menuName']").val();
        if (nodes.length > 1 || nodes.length == 0) {
            layer.msg('请选择一个节点', {
                time: 1000 //1秒关闭（如果不配置，默认是3秒）
            }, function () {
            });
            return;
        }
        var arr = [];
        $("input:checkbox[name='operId']:checked").each(function () {
            arr.push($(this).val());
        });
        $("input[name='oper']").val(arr.join(","));
        layer.confirm('是否确定更新当前节点？', function (index) {
            var params = $('#menuForm').serializeJSON();
            $.ajax({
                url: rootUrl + "/uqiansoftAdmin/auth/menu/updateMenu",
                contentType: 'application/json',
                type: "post",
                cache: false,
                dataType: "json",
                data: JSON.stringify(params),
                async: false,
                success: function (result) {
                    if (result.status == '200') {
                        debugger
                        var nodes = treeObj.getNodesByParam("id", $("input[name='menuId']").val(), null);
                        nodes[0].name = newNodeName;
                        treeObj.updateNode(nodes[0]);
                    }
                    layer.msg(result.message, {
                        // icon: 1,
                        time: 1000 //1秒关闭（如果不配置，默认是3秒）
                    }, function () {
                    });
                }
            });
        });
        return false;
    });
    form.on('submit(del)', function (data) {
        var treeObj = $.fn.zTree.getZTreeObj("menuTree");
        var nodes = treeObj.getSelectedNodes();
        var pant = nodes[0].getParentNode();
        var newNodeName = $("input[name='menuName']").val();
        if (nodes.length > 1 || nodes.length == 0) {
            layer.msg('请选择一个节点', {
                time: 1000 //1秒关闭（如果不配置，默认是3秒）
            }, function () {
            });
            return;
        }
        layer.confirm('是否确定删除当前节点？', function (index) {
            var params = $('#menuForm').serializeJSON();
            $.ajax({
                url: rootUrl + "/uqiansoftAdmin/auth/menu/delMenu",
                contentType: 'application/json',
                type: "post",
                cache: false,
                dataType: "json",
                data: JSON.stringify(params),
                async: false,
                success: function (result) {
                    if (result.status == '200') {
                        treeObj.removeNode(nodes[0]);
                    }
                    layer.msg(result.message, {
                        // icon: 1,
                        time: 1000 //1秒关闭（如果不配置，默认是3秒）
                    }, function () {
                    });
                }
            });
        });
        return false;
    });
    var $ = layui.$, active = {};

    $('.layui-btn.layuiadmin-btn-list').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
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
             * 回调函数（点击之后渲染右侧）
             */
            onClick: function (event, treeId, treeNode) {
                var menuId = treeNode.id;
                $.ajax({
                    url: rootUrl + "/uqiansoftAdmin/auth/menu/getMenu",
                    type: "post",
                    cache: false,
                    data: {
                        menuId: menuId
                    },
                    dataType: "json",
                    success: function (result) {
                        if (result) {
                            $("#menuForm")[0].reset();
                            if (result.operId) {
                                var oper = result.operId
                                var operIds = $("input[name='operId']");
                                for (i = 0; i < operIds.length; i++) {
                                    var val = operIds[i].value;
                                    if (oper.split(',').indexOf(val) != -1) {
                                        operIds[i].checked = true;
                                    }
                                }

                            }
                            if (result.target == 'page') {
                                $("#urlDiv").show();
                                $("#operDiv").show();

                            } else {
                                $("#urlDiv").hide();
                                $("#operDiv").hide();
                            }
                            deserialize($('#menuForm'), result);
                            $("input[name='menuLevel']").val(result.nodeLevel);
                            form.render();
                        } else {
                            modal.dialog(
                                {
                                    "title": "操作提示",//标题
                                    "message": "获取菜单失败！",//内容
                                    "okText": "确定",//确定按钮文字
                                });
                        }
                    }
                });
            }
        }
    };
    /**
     * 获取ztree数据
     */
    $.ajax({
        url: rootUrl + "/uqiansoftAdmin/auth/menu/getMenuTree",
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
    $.fn.zTree.init($("#menuTree"), setting, zNodes);

    /**
     * 反序列化到表单中
     * @param formObj
     * @param jsonObj
     */
    function deserialize(formObj, jsonObj) {
        formObj.find('input[name][type=text],input[name][type=hidden],textarea[name]').each(function (i, ele) {
            $(ele).val(jsonObj[$(ele).attr("name")]);
        })
        formObj.find('select[name]').each(function (i, ele) {
            $(ele).val(jsonObj[$(ele).attr("name")]);
            form.render('select');
        })
    }

    form.on('select(target)', function (data) {
        if (data.value == 'page') {
            $("#urlDiv").show();
            $("#operDiv").show();
        } else {
            $("#urlDiv").hide();
            $("#operDiv").hide();
        }
    });

});