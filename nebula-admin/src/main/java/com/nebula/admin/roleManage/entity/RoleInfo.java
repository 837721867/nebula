package com.nebula.admin.roleManage.entity;

import com.nebula.admin.menuManage.entity.MenuInfo;
import com.nebula.admin.userManage.entity.UserInfo;
import com.nebula.common.base.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Table;
import javax.persistence.*;
import java.util.List;

/**
 * 描述：权限角色实体
 * 作者：Marionette
 */
@Getter
@Setter
@Entity(name = "sys_role")
@Table(appliesTo = "sys_role", comment = "用户权限表")
public class RoleInfo extends BaseEntity {

    private static final long serialVersionUID = 6455990565417950542L;

    /**
     * 角色编号
     */
    @Column(columnDefinition = " varchar(6) comment '角色编号' ")
    private String code;

    /**
     * 角色名称
     */
    @Column(columnDefinition = " varchar(10) comment '角色名称' ")
    private String name;

    /**
     * 角色类型 0：admin 1：普通
     */
    @Column(nullable = false, columnDefinition = " tinyint(1) default '1' comment '角色类型 0：管理员 1：普通用户' ")
    private String type;

    /**
     * 角色用户
     */
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "role")
    private List<UserInfo> userList;

    /**
     * 角色菜单关系
     */
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "sys_role_menu")
    private List<MenuInfo> sys_menu;
}
