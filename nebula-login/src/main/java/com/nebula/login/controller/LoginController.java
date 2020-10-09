package com.nebula.login.controller;

import com.nebula.common.base.controller.BaseController;
import com.nebula.common.geetest.VerifyLoginServlet;
import com.nebula.common.main.entity.UserInfo;
import com.nebula.common.util.ResultUtil;
import com.nebula.login.service.LoginService;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * 描述：登录Controller
 * 作者：Marionette
 */
@Controller
public class LoginController {

    @Resource
    private HttpServletRequest request;
    @Resource
    private LoginService loginService;


    @ResponseBody
    @RequestMapping("/login")
    public ResultUtil login() throws IOException {
        VerifyLoginServlet ver = new VerifyLoginServlet();
        String phone = request.getParameter("username");
        String passWord = request.getParameter("password");
        if(!ver.doubleVerify(request).get("status").getAsBoolean()){
            return ResultUtil.result(false,"行为验证失败");
        }
        // 验证用户是否存在
        UserInfo userInfo = loginService.getUserByPhone(phone);
        if(StringUtils.isEmpty(userInfo)){
            return ResultUtil.result(false, "该手机号尚未注册");
        }
        // 验证密码是否正确
        if(!passWord.equals(userInfo.getPassword())){
            return ResultUtil.result(false, "密码错误");
        }
        request.getSession().setAttribute("user", userInfo);
        return ResultUtil.result(true, "main/","登录成功");
    }

}
