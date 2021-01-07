package com.nebula.common.admin.menuManage.entity;

import com.nebula.common.base.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Table;


import javax.persistence.*;
import java.util.List;

/**
 * 描述：主界面大菜单
 * 作者：Marionette
 */
@Getter
@Setter
@Entity(name = "sys_menu")
@Table(appliesTo = "sys_menu", comment = "菜单表")
public class MenuInfo extends BaseEntity {

    private static final long serialVersionUID = 4678418277688671684L;

    /** 菜单编号 */
    @Column(columnDefinition = " varchar(6) comment '菜单编码' ")
    private String code;

    /** 菜单名称 */
    @Column(columnDefinition = " varchar(10) comment '菜单名称' ")
    private String name;

    /** 模块名称 */
    @Column(columnDefinition = " varchar(10) comment '模块名称' ")
    private String mode;

    /** 图标class */
    @Column(columnDefinition = " varchar(50) comment '图标class' ")
    private String icon;

    /** 界面位置 */
    @Column(columnDefinition = " varchar(100) comment '界面位置' ")
    private String address;

    /** 有无界面 0：无 1：有 */
    @Column(nullable = false, columnDefinition = " integer default '0' comment '有无界面 0：无 1：有' ")
    private Integer type;

    /** 层级 */
    @Column(nullable = false, columnDefinition = " integer default '0' comment '层级' ")
    private Integer level;

    /** 顺序 */
    @Column(columnDefinition = " integer comment '排序' ")
    private Integer num;

    /** 子菜单列表 */
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "parent")
    private List<MenuInfo> details;

    /** 父节点ID */
    @ManyToOne(targetEntity = MenuInfo.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(columnDefinition = " varchar(50) comment '父节点ID' ")
    private MenuInfo parent;
}
