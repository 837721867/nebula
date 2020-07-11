package com.nebula.login.service;

import com.nebula.common.main.entity.UserInfo;

/**
 * 描述：登录Service接口
 * 作者：Marionette
 */
public interface LoginService {

     UserInfo getUserByPhone(String phone);
}
