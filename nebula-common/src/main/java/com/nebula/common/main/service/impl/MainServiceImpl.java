package com.nebula.common.main.service.impl;

import com.nebula.common.main.dao.MainDao;
import com.nebula.common.main.entity.BigMenuInfo;
import com.nebula.common.main.service.MainService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 描述：Main主页Service
 * 作者：Marionette
 */
@Service("mainService")
public class MainServiceImpl implements MainService {

    @Resource
    private MainDao mainDao;

    @Override
    public List<BigMenuInfo> getMenu() {
        return mainDao.getMenu();
    }
}
