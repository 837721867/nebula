package com.nebula.admin.menuManage.entity;

import java.util.List;

/**
 * 描述：主界面大菜单
 * 作者：Marionette
 */
@Data
@Entity(name = "sys_menu")
@Table(appliesTo = "sys_menu", comment = "菜单表")
public class MenuInfo extends BaseEntity{

    /** 菜单编号 */
    @Column(columnDefinition = " varchar(6) comment '菜单编码' ")
    private String code;

    /** 菜单名称 */
    @Column(columnDefinition = " varchar(10) comment '菜单名称' ")
    private String name;

    /** 界面位置 */
    @Column(columnDefinition = " varchar(100) comment '界面位置' ")
    private String address;

    /** 有无界面 0：无 1：有 */
    @Column(nullable = false, columnDefinition = " tinyint(1) default '0' comment '有无界面 0：无 1：有' ")
    private String type;

    /** 层级 */
    @Column(nullable = false, columnDefinition = " integer default '0' comment '层级' ")
    private Integer level;

    /** 顺序 */
    @Column(columnDefinition = " integer comment '排序' ")
    private Integer num;

    /** 父节点ID */
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(columnDefinition = " varchar(50) comment '父节点ID' ")
    private List<MenuInfo> parent;
}
