package com.nebula.admin.index.controller;

import com.nebula.admin.index.service.IndexService;
import com.nebula.admin.userManage.entity.UserInfo;
import com.nebula.common.base.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 描述：首页Controller
 * 作者：Marionette
 */
@Controller
public class IndexController extends BaseController {

    @Resource
    private HttpServletRequest request;
    @Resource(name = "indexService")
    private IndexService indexService;

    /**
     * 描述：加载index界面框架
     * @return
     */
    @RequestMapping("/index")
    public String index(){
        UserInfo userInfo = (UserInfo) request.getSession().getAttribute("userInfo");
        Map<String, Object> result = indexService.getIndexDate(userInfo);
        request.setAttribute("result", result);
        return "index/index";
    }

    /**
     * 描述：加载home主页界面
     * @return
     */
    @RequestMapping("/home/console")
    public String console(){
        return "layuiAdmin/home/console";
    }
}
