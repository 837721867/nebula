package com.nebula.login.service;

import com.nebula.common.main.entity.UserInfo;
import com.nebula.login.repository.LoginRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * 描述：登录service实现
 * 作者：Marionette
 */
@Service("loginService")
@Transactional(rollbackFor = Exception.class)
public class LoginService {

    @Resource(name = "loginRepository")
    private LoginRepository loginRepository;

    public UserInfo getUserByPhone(String phone) {
        return loginRepository.getUserByPhone(phone);
    }

}
