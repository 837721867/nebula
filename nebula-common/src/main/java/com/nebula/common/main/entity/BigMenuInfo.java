package com.nebula.common.main.entity;

import com.nebula.common.base.entity.BaseEntity;
import lombok.Data;
import org.hibernate.annotations.Table;
import java.util.Set;
import javax.persistence.*;

/**
 * 描述：星云主界面大菜单
 * 作者：Marionette
 */
@Data
@Entity(name = "sys_big_menu")
@Table(appliesTo = "sys_big_menu", comment = "菜单大类表")
public class BigMenuInfo extends BaseEntity {

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

    /** 所属权限 */
    @ManyToOne(targetEntity = RoleInfo.class)
    @JoinColumn(nullable = false, columnDefinition = " varchar(50) comment '所属权限' ")
    private RoleInfo role;

    /** 二级菜单列表 */
    @OneToMany(mappedBy = "bigMenu", cascade = CascadeType.ALL, fetch = FetchType.EAGER, targetEntity = SmallMenuInfo.class)
    private Set<SmallMenuInfo> smallMenuInfoSet;
}
