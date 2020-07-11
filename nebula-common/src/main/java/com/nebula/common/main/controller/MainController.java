package com.nebula.common.main.controller;

import com.nebula.common.main.entity.BigMenuInfo;
import com.nebula.common.main.service.MainService;
import com.nebula.common.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 描述：main主页Controller
 * 作者：Marionette
 */
@Controller
@RequestMapping("/main")
public class MainController {

    @Autowired
    private MainService mainService;

    /**
     * 描述：获取主页菜单
     * @return
     */
    @ResponseBody
    @RequestMapping("/getMenu")
    public ResultUtil getMenu(){
        List<BigMenuInfo> list =  mainService.getMenu();
        if(list == null || list.size() < 1){
            return ResultUtil.result(false,"获取主页菜单失败");
        }
        return ResultUtil.result(true, list, "获取主页菜单成功");
    }

}
