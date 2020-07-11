package com.nebula.common.main.entity;

import com.nebula.common.base.entity.BaseEntity;
import lombok.Data;
import org.hibernate.annotations.Table;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * 描述：权限角色实体
 * 作者：Marionette
 */
@Data
@Entity(name = "sys_role")
@Table(appliesTo = "sys_role", comment = "用户权限表")
public class RoleInfo extends BaseEntity {

    /** 角色编号 */
    @Column(columnDefinition = " varchar(6) comment '角色编号' ")
    private String code;

    /** 角色名称 */
    @Column(columnDefinition = " varchar(10) comment '角色名称' ")
    private String name;

    /** 角色类型 0：admin 1：普通 */
    @Column(nullable = false, columnDefinition = " tinyint(1) default '1' comment '角色类型 0：管理员 1：普通用户' ")
    private String type;

}
