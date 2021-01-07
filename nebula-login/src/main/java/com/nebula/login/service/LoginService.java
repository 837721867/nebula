package com.nebula.login.service;

import com.nebula.common.admin.userManage.entity.UserInfo;
import com.nebula.common.admin.userManage.repository.UserInfoRepository;
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

    @Resource(name = "userInfoRepository")
    private UserInfoRepository userInfoRepository;

    public UserInfo getUserByPhone(String phone) {
        return userInfoRepository.getUserByPhone(phone);
    }

}
