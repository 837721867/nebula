package com.nebula.common.main.service;

import com.nebula.common.main.entity.BigMenuInfo;

import java.util.List;

/**
 * 描述：Main主页Service接口
 * 作者：Marionette
 */
public interface MainService {

    /**
     * 描述：获取主界面菜单
     * @return
     */
    List<BigMenuInfo> getMenu();
}
