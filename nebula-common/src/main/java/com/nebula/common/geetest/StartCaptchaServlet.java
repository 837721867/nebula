package com.nebula.common.geetest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

/**
 * 描述：使用Get的方式返回challenge和capthca_id,<br/>
 *      此方式以实现前后端完全分离的开发模式<br/>
 * 说明：初始化认证，获取流水表示及状态码<br/>
 * 作者：Marionette
 */
@Controller
@RequestMapping("/geeTest")
public class StartCaptchaServlet extends HttpServlet {

    @ResponseBody
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    protected void register(HttpServletRequest request, HttpServletResponse response) throws IOException {

        GeetestLib gtSdk = new GeetestLib(
                GeetestConfig.getGeetest_id(),
                GeetestConfig.getGeetest_key(),
                GeetestConfig.isnewfailback()
        );

        String resStr = "{}";
        String userId = "test";

        //自定义参数,可选择添加
        HashMap<String, String> param = new HashMap<>();
        //网站用户id
        param.put("user_id", userId);
        //web:电脑上的浏览器；h5:手机上的浏览器，包括移动应用内完全内置的web_view；native：通过原生SDK植入APP应用的方式
        param.put("client_type", "web");
        //传输用户请求验证时所携带的IP
        param.put("ip_address", "127.0.0.1");

        //进行验证预处理
        int gtServerStatus = gtSdk.preProcess(param);

        //将服务器状态设置到session中
        request.getSession().setAttribute(gtSdk.gtServerStatusSessionKey, gtServerStatus);
        //将userid设置到session中
        request.getSession().setAttribute("userId", userId);

        resStr = gtSdk.getResponseStr();

        PrintWriter out = response.getWriter();
        out.println(resStr);
    }

}
