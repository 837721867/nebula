package com.nebula.login.controller;

import com.nebula.admin.userManage.entity.UserInfo;
import com.nebula.common.base.controller.BaseController;
import com.nebula.common.geetest.VerifyLoginServlet;
import com.nebula.common.util.ResultUtil;
import com.nebula.login.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class LoginController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Resource
    private HttpServletRequest request;
    @Resource
    private LoginService loginService;

    @RequestMapping("/login")
    public String login(){
        return "user/login";
    }

    @ResponseBody
    @RequestMapping("/login/login")
    public ResultUtil login(String userName, String passWord) throws IOException {
        VerifyLoginServlet ver = new VerifyLoginServlet();
        if (!ver.doubleVerify(request).get("status").getAsBoolean()) {
            return ResultUtil.fail("行为验证失败");
        }
        // 验证用户是否存在
        UserInfo userInfo = loginService.getUserByPhone(userName);
        if (StringUtils.isEmpty(userInfo)) {
            return ResultUtil.fail("该手机号尚未注册");
        }
        // 验证密码是否正确
        if (!passWord.equals(userInfo.getPassWord())) {
            return ResultUtil.fail("密码错误");
        }
        request.getSession().setAttribute("userInfo", userInfo);
        logger.info("用户:" + userInfo.getName() + "登录成功");
        return ResultUtil.success("/index", "登录成功");
    }

}
