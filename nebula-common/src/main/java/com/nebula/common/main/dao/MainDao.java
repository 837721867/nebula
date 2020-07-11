package com.nebula.common.main.dao;

import com.nebula.common.base.dao.BaseDao;
import com.nebula.common.main.entity.BigMenuInfo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import java.util.List;

/**
 * 描述：Main主页dao
 * @author Marionette
 */
@Component
public interface MainDao extends BaseDao<BigMenuInfo, String> {

    /**
     * 描述：根据手机号码获取用户
     * @return List<BigMenuInfo>
     */
    @Query(value = "select * from sys_big_menu where disables = '0'", nativeQuery = true)
    List<BigMenuInfo> getMenu();


}
