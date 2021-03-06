layui.config({
    base: '/nebula/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'jquery', 'layer'], function () {

    /************************************************* 定义 **************************************************************/
    let $ = layui.jquery,
        layer = layui.layer,
        admin = layui.admin,
        setter = layui.setter;

    /************************************************* 绑定 **************************************************************/
    /** 加载极验 */
    loadGeeTest();

    /************************************************* 函数 **************************************************************/

    /**
     * 加载极验
     * @param captchaObj
     */
    function loadGeeTest() {
        httpService.jsonGetAjax('/geeTest/register?t=' + (new Date()).getTime(), {}).then(function (data) {
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                // 表示用户后台检测极验服务器是否宕机
                offline: !data.success,
                // 用于宕机时表示是新验证码的宕机
                new_captcha: data.new_captcha,
                //弹出方式
                product: "bind",
                width: "300px",
                https: true
            }, login);
        })
    }

    /**
     * 完成登录
     * @param captchaObj
     */
    function login(captchaObj) {
        captchaObj.onSuccess(function () {
            let result = captchaObj.getValidate();
            if (!result) {
                layer.msg('请完成验证');
            }

            let param = {
                userName: $("input[name='userName']").val(),
                passWord: $("input[name='passWord']").val(),
                geetest_challenge: result.geetest_challenge,
                geetest_validate: result.geetest_validate,
                geetest_seccode: result.geetest_seccode
            }

            httpService.postAjax('/login/login', param).then(function (res) {
                if (0 == res.code) {
                    $('.login-tips').html(res.message);
                    setTimeout(function(){
                        location.href = rootUrl + res.data;
                    },600);
                } else {
                    captchaObj.reset();
                    $('.login-tips').html(res.message);
                }
            })
        })


        $('#submit').click(function () {
            // 调用之前先通过前端表单校验
            if (checkForm()) {
                captchaObj.verify();
            }
        });
        //捕捉回车
        $(document).ready(function () {
            $("body").bind('keydown', function (event) {
                if (event.keyCode == 13) {
                    if (checkForm()) {
                        captchaObj.verify();
                    }
                }
            });
        });

        //用户登录前的表单填写校验
        let checkForm = function () {
            if ($("input[name='userName']").val() == '') {
                $("input[name='userName']").focus();
                $('.login-tips').html('登录失败：用户名必填');
                return false;
            }
            if ($("input[name='passWord']").val() == '') {
                $("input[name='passWord']").focus();
                $('.login-tips').html('登录失败：密码必填');
                return false;
            }
            return true;
        }
    }

})