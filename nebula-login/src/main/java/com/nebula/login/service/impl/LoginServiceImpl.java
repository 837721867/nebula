package com.nebula.login.service.impl;

import com.nebula.common.main.entity.UserInfo;
import com.nebula.login.dao.LoginDao;
import com.nebula.login.service.LoginService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * 描述：登录service实现
 * 作者：Marionette
 */
@Service("loginService")
@Transactional(rollbackFor = Exception.class)
public class LoginServiceImpl implements LoginService {

    @Resource
    private LoginDao loginDao;

    @Override
    public UserInfo getUserByPhone(String phone) {
        return loginDao.getUserByPhone(phone);
    }

}
