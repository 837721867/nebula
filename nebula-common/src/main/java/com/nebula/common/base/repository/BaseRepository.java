package com.nebula.common.base.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import java.io.Serializable;

/**
 * 描述：父类接口Dao
 * 作者：Marionette
 * @param <T>
 * @param <ID>
 */
@NoRepositoryBean
public interface BaseRepository <T, ID extends Serializable> extends JpaRepository<T, ID>, JpaSpecificationExecutor<T>, CrudRepository<T, ID> {

}
