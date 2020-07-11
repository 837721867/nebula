package com.nebula.login.dao;

import com.nebula.common.base.dao.BaseDao;
import com.nebula.common.main.entity.UserInfo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

/**
 * 描述：登录Dao接口
 * 作者：Marionette
 */
@Component
public interface LoginDao extends BaseDao<UserInfo, String> {

    /**
     * 描述：根据注册手机号获取用户
     * @param phone
     * @return
     */
    @Query(value = "select * from sys_user where phone = :#{#phone}",nativeQuery = true)
    UserInfo getUserByPhone(@Param("phone") String phone);
}
