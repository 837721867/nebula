package com.nebula.common.geetest;

import com.google.gson.JsonObject;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;

/**
 * 描述：使用post方式，返回验证结果，<br/>
 *      request表单中必须包含challenge, validate, seccode<br/>
 * 说明：api2 二次验证，包括正常流程和宕机情况
 * 作者：Marionette
 */
public class VerifyLoginServlet extends HttpServlet {

    public JsonObject doubleVerify(HttpServletRequest request) throws IOException {

        GeetestLib gtSdk = new GeetestLib(
                GeetestConfig.getGeetest_id(),
                GeetestConfig.getGeetest_key(),
                GeetestConfig.isnewfailback()
        );

        String challenge = request.getParameter(GeetestLib.fn_geetest_challenge);
        String validate = request.getParameter(GeetestLib.fn_geetest_validate);
        String seccode = request.getParameter(GeetestLib.fn_geetest_seccode);

        //从session中获取gt-server状态
        int gt_server_status_code = (Integer) request.getSession().getAttribute(gtSdk.gtServerStatusSessionKey);

        //从session中获取userid
        String userId = (String)request.getSession().getAttribute("userId");

        //自定义参数,可选择添加
        HashMap<String, String> param = new HashMap<>();
        //网站用户id
        param.put("user_id", userId);
        //web:电脑上的浏览器；h5:手机上的浏览器，包括移动应用内完全内置的web_view；native：通过原生SDK植入APP应用的方式
        param.put("client_type", "web");
        //传输用户请求验证时所携带的IP
        param.put("ip_address", "127.0.0.1");

        int gtResult = 0;

        if (gt_server_status_code == 1) {
            //gt-server正常，向gt-server进行二次验证
            gtResult = gtSdk.enhencedValidateRequest(challenge, validate, seccode, param);
        } else {
            // gt-server非正常情况下，进行failback模式验证
            System.out.println("failback:use your own server captcha validate");
            gtResult = gtSdk.failbackValidateRequest(challenge, validate, seccode);
        }


        if (gtResult == 1) {
            // 验证成功
            JsonObject data = new JsonObject();
            data.addProperty("status", true);
            data.addProperty("version", gtSdk.getVersionInfo());
            return data;
        }
        else {
            // 验证失败
            JsonObject data = new JsonObject();
            data.addProperty("status", false);
            data.addProperty("version", gtSdk.getVersionInfo());
            return data;
        }

    }

}
