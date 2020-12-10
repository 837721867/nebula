package com.nebula.admin.index.controller;

import com.nebula.common.base.controller.BaseController;
import org.hibernate.annotations.NaturalId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.annotation.Resources;
import javax.servlet.http.HttpServletRequest;

/**
 * 描述：首页Controller
 * 作者：Marionette
 */
@Controller
public class IndexController extends BaseController {

    @Resource
    private HttpServletRequest request;

    @RequestMapping("/index")
    public String index(){

        return "index/index";
    }
}
