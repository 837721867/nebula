layui.define(['table', 'form'], function (exports) {
    var $ = layui.$
        , table = layui.table
        , form = layui.form;

    //文章管理
    table.render({
        elem: '#LAY-app-dept-list'
        , url: 'dept/listDept'
        , method: 'post'
        , parseData: function (res) { //res 即为原始返回的数据
            return {
                "code": res.status, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.count, //解析数据长度
                "data": res.data //解析数据列表
            };
        }
        , cols: [[
            {type: 'checkbox', fixed: 'left'}
            , {field: 'deptId', title: '部门ID'}
            , {field: 'deptName', title: '部门名称'}
            , {field: 'status', title: '部门状态', templet: '#buttonTpl', align: 'center'}
            , {field: 'updateTime', title: '更新时间', sort: true}
            , {title: '操作', align: 'center', fixed: 'right', toolbar: '#table-dept-list'}
        ]]
        , page:
            true
        , limit:
            10
        , limits:
            [10, 15, 20, 25, 30]
        , text: {
            none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        }
    })
    ;

    //监听工具条
    table.on('tool(LAY-app-dept-list)', function (obj) {
        var data = obj.data;
        if (obj.event === 'set') {
            var confirmStr = "";
            var status = "";
            if(data.status == '1'){
                confirmStr = "确定停用此部门？";
                status = "0"
            }else{
                confirmStr = "确定启用此部门？";
                status = "1"
            }
            layer.confirm(confirmStr, function (index) {
                var param = {deptId:data.deptId,status:status};
                $.ajax({
                    url : "dept/setStatus",
                    type : "post",
                    cache:false,
                    dataType : "json",
                    data: param,
                    async:false,
                    success : function(result) {
                        if(result.status == '200'){

                        }else{

                        }
                        layer.msg(result.message, {
                            // icon: 1,
                            time: 1000 //1秒关闭（如果不配置，默认是3秒）
                        }, function () {
                            table.reload('LAY-app-dept-list');
                        });
                    }
                });
                layer.close(index);
            });

        } else if (obj.event === 'edit') {
            layer.open({
                type: 2
                , title: '修改部门'
                , content: 'dept/deptUpdate?deptId=' + data.deptId
                , maxmin: true
                , area: ['550px', '550px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //点击确认触发 iframe 内容中的按钮提交
                    var submit = layero.find('iframe').contents().find("#layuiadmin-app-dept-edit");
                    submit.click();
                }
            });
        }
    });

    exports('auth/deptListModule', {})
});