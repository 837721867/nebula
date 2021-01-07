package com.nebula.common.admin.menuManage.repository;

import com.nebula.common.admin.menuManage.entity.MenuInfo;
import com.nebula.common.base.repository.BaseRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository("menuRepository")
public interface MenuRepository extends BaseRepository<MenuInfo, String> {


    @Query(value="select menu.* from sys_role_menu rm left join sys_menu menu on rm.sys_menu_id = menu.id where rm.sys_role_id  = :roleId", nativeQuery = true)
    List<MenuInfo> getListByRoleId(String roleId);

}
