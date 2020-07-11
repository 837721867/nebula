package com.nebula.common.base.entity;


import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * 描述：封装继承实体
 * 作者：Marionette
 */
@Data
@MappedSuperclass
public class BaseEntity implements Serializable {

    private static final long serialVersionUID = 7550792210665830400L;

    @Id
    @GeneratedValue
    @Column(columnDefinition = " varchar(50) comment '主键id' ")
    private String id;

    @Column(columnDefinition = " varchar(10) comment '创建者' ")
    private String creator;

    @CreatedDate
    @Column(columnDefinition = " datetime comment '创建时间' ")
    private Date createTime;

    @Column(columnDefinition = " varchar(10) comment '修改者' ")
    private String modifier;

    @LastModifiedDate
    @Column(columnDefinition = " datetime comment '修改时间' ")
    private Date modifyTime;

    @Column(nullable = false, columnDefinition = " tinyint(1) default '0' comment '禁用 0：正常 1：禁用' ")
    private boolean disables;


}
