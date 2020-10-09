package com.nebula.common.main.controller;

import com.nebula.common.main.entity.BigMenuInfo;
import com.nebula.common.main.service.MainService;
import com.nebula.common.util.ResultUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/**
 * 描述：main主页Controller
 * 作者：Marionette
 */
@Controller
@RequestMapping("/main")
public class MainController {

    @Resource
    private MainService mainService;

    /**
     * 描述：跳转主页
     * @return
     */
    @RequestMapping("/")
    public String main(){
        return "main/main";
    }

    /**
     * 描述：获取主页菜单
     * @return
     */
    @ResponseBody
    @RequestMapping("/getMenu")
    public ResultUtil getMenu(){
        List<BigMenuInfo> list =  mainService.getMenu();
        if(list == null || list.isEmpty()){
            return ResultUtil.result(false,"获取主页菜单失败");
        }
        return ResultUtil.result(true, list, "获取主页菜单成功");
    }

}
