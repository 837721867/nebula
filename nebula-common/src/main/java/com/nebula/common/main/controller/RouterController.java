package com.nebula.common.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 描述：公用路由请求Controller
 * 作者：Marionette
 * 说明：前期提取得公用方法做界面跳转方便维护<b/>
 * 后期需要优化为前端做路由管理
 */
@Controller
public class RouterController {


    @RequestMapping({"/","","/userLogin"})
    public String userLogin(){
        return "user/login";
    }

    @RequestMapping("/main/main")
    public String main(){
        return "main/main";
    }

    @RequestMapping("/router")
    public String router(String address){
        return address;
    }
}
