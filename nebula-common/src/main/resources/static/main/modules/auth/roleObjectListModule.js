layui.define(['table', 'form'], function (exports) {
    var $ = layui.$
        , table = layui.table
        , form = layui.form;
    var roleId = $("input[name='roleId']").val();
    var rootUrl = $("input[name='rootUrl']").val();
    //文章管理
    table.render({
        elem: '#LAY-app-roleObject-list'
        , url: rootUrl + '/uqiansoftAdmin/auth/role/selectRoleObjectList'
        , method: 'post'
        , where: {roleId: roleId}
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
            , {field: 'objectName', title: '部门/用户名称', align: 'center'}
            , {field: 'objectTypeName', title: '类型', align: 'center'}
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
    table.on('tool(LAY-app-roleObject-list)', function (obj) {
        var data = obj.data;
    });

    exports('auth/roleObjectListModule', {})
});