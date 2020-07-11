layui.config({
    base: rootUrl + '/layuiadmin/'//静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'auth/roleListModule', 'table'], function () {
    var table = layui.table
        , form = layui.form;

    //监听搜索
    form.on('submit(LAY-app-role-search)', function (data) {
        var field = data.field;

        //执行重载
        table.reload('LAY-app-role-list', {
            where: field
        });
    });

    var $ = layui.$, active = {
        batchdel: function () {
            var checkStatus = table.checkStatus('LAY-app-role-list')
                , checkData = checkStatus.data; //得到选中的数据

            if (checkData.length === 0) {
                return layer.msg('请选择数据');
            }
            layer.confirm('确定删除吗？', function (index) {
                var roleIds = [];
                for (var i in checkData) {
                    roleIds.push(checkData[i].roleId);
                }
                var roleStr = roleIds.join(',');

                // 执行 Ajax 后重载
                $.ajax({
                    url: rootUrl + "/uqiansoftAdmin/auth/role/deleteRole",
                    type: "post",
                    cache: false,
                    dataType: "json",
                    data: {ids: roleStr},
                    async: false,
                    success: function (result) {
                        if (result.status == '200') {
                        }
                        layer.msg(result.message, {
                            // icon: 1,
                            time: 1000 //1秒关闭（如果不配置，默认是3秒）
                        }, function () {
                            table.reload('LAY-app-role-list');
                        });
                    }
                });

            });
        },
        add: function () {

            layer.open({
                type: 2
                , title: '新增角色'
                , content: 'role/roleAdd'
                , maxmin: true
                , area: ['550px', '550px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#layuiadmin-app-role-submit");
                    submit.click();
                }
            });
        }
    };

    $('.layui-btn.layuiadmin-btn-list').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});