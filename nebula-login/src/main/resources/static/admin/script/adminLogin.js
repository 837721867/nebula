layui.config({
    base: rootUrl + '/layuiadmin/'//静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'form'], function(){
    let $ = layui.$,form = layui.form;
    form.render();

    //提交
    form.on('submit(LAY-user-login-submit)', function(obj){

        if(obj.field.username == ''){
            $('.login-tips').html("*&nbsp;登录失败：用户名不允许为空！");
            $('input[name=username]').focus();
            return false;
        }
        if(obj.field.password == ''){
            $('.login-tips').html("*&nbsp;登录失败：密码不允许为空！");
            $('input[name=password]').focus();
            return false;
        }
        if(obj.field.verCode == ''){
            $('.login-tips').html("*&nbsp;登录失败：验证码不允许为空！");
            $('input[name=verCode]').focus();
            return false;
        }
        //请求登入接口
        $.ajax({
            url: rootUrl + '/login/login',
            type: "post",
            dataType: "json",
            data: {
                userName:obj.field.username,
                userPwd:obj.field.password,
                randomVal:obj.field.verCode
            },
            success: function(res){
                if(res.state == 100){
                    //登录成功后前台设置缓存token
                    localStorage.setItem('Authorization',res.token);
                    localStorage.setItem('userName', res.userName);
                    location.href = res.url;
                }else{
                    $('.login-tips').html("*&nbsp;" + res.msg);
                    $('input[name=username]').focus();
                }
            }
        });

    });

    //更换图形验证码
    $('#verCode').click(function(){
        $("#verCode").attr("src", rootUrl + '/login/getVerify?' + Math.random());
    });

    //捕捉回车
    $(document).ready(function() {
        $("body").bind('keydown', function(event) {
            if(event.keyCode==13){
                if($('input[name=username]').val() == ''){
                    $('.login-tips').html("*&nbsp;登录失败：用户名不允许为空！");
                    $('input[name=username]').focus();
                    return false;
                }
                if($('input[name=password]').val() == ''){
                    $('.login-tips').html("*&nbsp;登录失败：密码不允许为空！");
                    $('input[name=password]').focus();
                    return false;
                }
                if($('input[name=verCode]').val() == ''){
                    $('.login-tips').html("*&nbsp;登录失败：验证码不允许为空！");
                    $('input[name=verCode]').focus();
                    return false;
                }
                //请求登入接口
                $.ajax({
                    url: rootUrl + '/login/login',
                    type: "post",
                    dataType: "json",
                    data: {
                        userName:$('input[name=username]').val(),
                        userPwd:$('input[name=password]').val(),
                        randomVal:$('input[name=verCode]').val()
                    },
                    success: function(res){
                        if(res.state == 100){
                            //登录成功后前台设置缓存token
                            localStorage.setItem('Authorization',res.token);
                            localStorage.setItem('userName', res.userName);
                            location.href = res.url;
                        }else{
                            $('.login-tips').html("*&nbsp;" + res.msg);
                            $('input[name=username]').focus();
                        }
                    }
                });
            }
        });
    });
});