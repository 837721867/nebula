package com.nebula.common.main.entity;

import com.nebula.common.base.entity.BaseEntity;
import lombok.Data;
import org.hibernate.annotations.Table;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * 描述：用户实体
 * 作者：Marionette
 */
@Data
@Entity(name = "sys_user")
@Table(appliesTo = "sys_user", comment = "用户信息表")
public class UserInfo extends BaseEntity {

    /** 用户编号 */
    @Column(columnDefinition = " varchar(6) comment '用户编码' ")
    private String code;

    /** 用户名称 */
    @Column(columnDefinition = " varchar(10) comment '用户名称' ")
    private String name;

    /** 用户简拼 */
    @Column(columnDefinition = " varchar(5) comment '用户简拼' ")
    private String pinYin;

    /** 用户电话 */
    @Column(columnDefinition = " varchar(11) comment '用户电话' ")
    private String phone;

    /** 用户密码 */
    @Column(columnDefinition = " varchar(32) comment '用户密码' ")
    private String password;

    /** 用户注册状态 */
    @Column(columnDefinition = " tinyint(1) default '0' comment '注册状态 0:未注册 1：正常' ")
    private boolean status;

    /** 所属权限 */
    @ManyToOne(targetEntity = RoleInfo.class)
    @JoinColumn(nullable = false, columnDefinition = " varchar(50) comment '所属权限' ")
    private RoleInfo role;

}
