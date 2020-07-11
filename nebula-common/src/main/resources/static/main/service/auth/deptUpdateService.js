layui.config({
    base: rootUrl + '/layuiadmin/'//静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form'], function () {
    var $ = layui.$
        , form = layui.form;
    var deptId = $("input[name='deptId']").val();
    edit(deptId);

    /**
     * 初始化修改部门页面
     */
    function edit(deptId) {
        $.ajax({
            url: rootUrl + "/uqiansoftAdmin/auth/dept/getById",
            type: "post",
            cache: false,
            dataType: "json",
            data: "deptId=" + deptId,
            async: false,
            success: function (result) {
                deserialize($('#editForm'), result);
            }
        });
    }

    /**
     * 反序列化到表单中
     * @param formObj
     * @param jsonObj
     */
    function deserialize(formObj, jsonObj) {
        formObj.find('input[name],textarea[name]').each(function (i, ele) {
            $(ele).val(jsonObj[$(ele).attr("name")]);
        })
    }

    //监听提交
    form.on('submit(layuiadmin-app-dept-edit)', function (data) {
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        var params = $('#editForm').serializeJSON();
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            url: rootUrl + "/uqiansoftAdmin/auth/dept/editSub",
            type: "post",
            cache: false,
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify(params),
            async: false,
            success: function (result) {
                if (result.status == '200') {
                    var treeObj = parent.$.fn.zTree.getZTreeObj("deptTree");
                    var nodes = treeObj.getNodesByParam("id", $('#editForm').find("[name=deptId]").val(), null);
                    nodes[0].name = $('#editForm').find("[name=deptName]").val();
                    treeObj.updateNode(nodes[0]);
                }
                layer.msg(result.message, {
                    // icon: 1,
                    time: 1000 //1秒关闭（如果不配置，默认是3秒）
                }, function () {
                    parent.layui.table.reload('LAY-app-dept-list'); //重载表格
                    parent.layer.close(index); //再执行关闭
                });

            }
        });


    });
})