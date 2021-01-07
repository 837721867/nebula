package com.nebula.common.admin.userManage.repository;

import com.nebula.common.admin.userManage.entity.UserInfo;
import com.nebula.common.base.repository.BaseRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

/**
 * 描述：用户信息Repository
 * 作者：Marionette
 */
@Repository("userInfoRepository")
public interface UserInfoRepository extends BaseRepository<UserInfo, String> {
    /**
     * 描述：根据注册手机号获取用户
     * @param phone
     * @return
     */
    @Query(value = "select * from sys_user where phone = :#{#phone}",nativeQuery = true)
    UserInfo getUserByPhone(@Param("phone") String phone);
}
