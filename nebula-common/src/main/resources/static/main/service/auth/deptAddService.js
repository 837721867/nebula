layui.config({
    base: rootUrl + '/layuiadmin/'//静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form'], function () {
    var $ = layui.$
        , form = layui.form;

    //监听提交
    form.on('submit(layuiadmin-app-dept-submit)', function (data) {
        // var field = data.field; //获取提交的字段
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        var treeObj = parent.$.fn.zTree.getZTreeObj("deptTree");
        var nodes = treeObj.getSelectedNodes();
        var params = $('#addForm').serializeJSON();
        params['superDeptId'] = nodes[0].id;
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            url: rootUrl + "/uqiansoftAdmin/auth/dept/addSub",
            type: "post",
            cache: false,
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify(params),
            async: false,
            success: function (result) {
                if (result.status == '200') {
                    var newNode = {id: result.data.id, name: $('#addForm').find("[name=deptName]").val()};
                    treeObj.addNodes(nodes[0], newNode);
                    var nodesTemp = treeObj.getSelectedNodes();
                    var ids = [];
                    if (nodesTemp.length > 0) {
                        ids = getChildren(ids, nodesTemp[0]);
                        parent.$("input[name='idArray']").val(ids.join(","));
                    }
                }
                layer.msg(result.message, {
                    // icon: 1,
                    time: 1000 //1秒关闭（如果不配置，默认是3秒）
                }, function () {
                    parent.layui.table.reload('LAY-app-dept-list', {
                        where: {
                            deptName: parent.$("input[name='deptName']").val(),
                            idArray: parent.$("input[name='idArray']").val(),
                            status: parent.$("input[name='status']").val()
                        }
                    }); //重载表格
                    parent.layer.close(index); //再执行关闭
                });

            }
        });

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
    });
})