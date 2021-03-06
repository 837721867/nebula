package com.nebula.common.admin.userManage.entity;

import com.nebula.common.admin.roleManage.entity.RoleInfo;
import com.nebula.common.base.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Table;
import javax.persistence.*;

/**
 * 描述：用户实体
 * 作者：Marionette
 */
@Getter
@Setter
@Entity(name = "sys_user")
@Table(appliesTo = "sys_user", comment = "用户信息表")
public class UserInfo extends BaseEntity {

    private static final long serialVersionUID = -8548305901170981510L;

    /** 登录名 */
    @Column(columnDefinition = " varchar(10) comment '登录名' ")
    private String loginName;

    /** 用户密码 */
    @Column(columnDefinition = " varchar(32) comment '用户密码' ")
    private String passWord;

    /** 用户编号 */
    @Column(columnDefinition = " varchar(6) comment '用户编码' ")
    private String code;

    /** 用户名称 */
    @Column(columnDefinition = " varchar(10) comment '用户名称' ")
    private String name;

    /** 用户电话 */
    @Column(columnDefinition = " varchar(11) comment '用户电话' ")
    private String phone;

    /** 所属权限 */
    @ManyToOne(fetch = FetchType.EAGER, targetEntity = RoleInfo.class, cascade = CascadeType.REFRESH)
    @JoinColumn(nullable = false, columnDefinition = " varchar(50) comment '所属权限' ")
    private RoleInfo role;
}
