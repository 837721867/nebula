package com.nebula.common.main.entity;

import com.nebula.common.base.entity.BaseEntity;
import lombok.Data;
import org.hibernate.annotations.Table;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * 描述：星云主界面二级菜单
 * 作者：Marionette
 */
@Data
@Entity(name = "sys_small_menu")
@Table(appliesTo = "sys_small_menu", comment = "菜单小类表")
public class SmallMenuInfo extends BaseEntity {

    /** 菜单编号 */
    @Column(columnDefinition = " varchar(6) comment '菜单编码' ")
    private String code;

    /** 菜单名称 */
    @Column(columnDefinition = " varchar(10) comment '菜单名称' ")
    private String name;

    /** 界面需要 */
    @Column(columnDefinition = " varchar(4) comment '界面需要 0：不需要 1：需要' ")
    private String type;

    /** 界面位置 */
    @Column(columnDefinition = " varchar(100) comment '界面位置' ")
    private String address;

    /** 上级菜单ID */
    @ManyToOne(targetEntity = BigMenuInfo.class)
    @JoinColumn(nullable = false, columnDefinition = " varchar(50) not null comment '上级菜单Id' ")
    BigMenuInfo bigMenu;
}
