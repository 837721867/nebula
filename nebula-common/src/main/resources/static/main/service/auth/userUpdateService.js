layui.config({
    base: rootUrl + '/layuiadmin/'//静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form'], function () {
    var $ = layui.$
        , form = layui.form;
    var userId = $("input[name='userId']").val();
    edit(userId);

    /**
     * 初始化修改用户页面
     */
    function edit(userId) {
        $.ajax({
            url: rootUrl + "/uqiansoftAdmin/auth/user/one",
            type: "post",
            cache: false,
            dataType: "json",
            data: "userId=" + userId,
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
        formObj.find('select[name]').each(function (i, ele) {
            $(ele).val(jsonObj[$(ele).attr("name")]);
            form.render('select');
        })
    }

    //监听提交
    form.on('submit(layuiadmin-app-user-edit)', function (data) {
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        var params = $('#editForm').serializeJSON();
        //提交 Ajax 成功后，关闭当前弹层并重载表格
        $.ajax({
            url: rootUrl + "/uqiansoftAdmin/auth/user/modify",
            type: "post",
            cache: false,
            contentType: 'application/json',
            dataType: "json",
            data: JSON.stringify(params),
            async: false,
            success: function (result) {
                if (result.status == '200') {
                }
                layer.msg(result.message, {
                    // icon: 1,
                    time: 1000 //1秒关闭（如果不配置，默认是3秒）
                }, function () {
                    parent.layui.table.reload('LAY-app-user-list'); //重载表格
                    parent.layer.close(index); //再执行关闭
                });

            }
        });


    });
})