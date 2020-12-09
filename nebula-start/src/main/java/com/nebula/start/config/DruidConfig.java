package com.nebula.start.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.StatViewServlet;
import com.alibaba.druid.support.http.WebStatFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * 描述：配置Druid数据源监控
 * 作者：Marionette
 * 说明：更爱springboot2.x中jdbc默认的数据源为Druid
 */
@Configuration
public class DruidConfig {

    /**
     * druid监控登录账号
     */
    @Value("${spring.datasource.stat-view-servlet.userName}")
    private String userName;
    /**
     * druid监控登录密码
     */
    @Value("${spring.datasource.stat-view-servlet.passWord}")
    private String passWord;
    /**
     * druid监控根路径
     */
    @Value("${spring.datasource.stat-view-servlet.url-pattern}")
    private String urlPatch;
    /**
     * druid监控是否禁用“Reset All”功能
     */
    @Value("${spring.datasource.stat-view-servlet.reset-enable}")
    private String resetEnable;
    /**
     * druid监控过滤规则
     */
    @Value("${spring.datasource.web-stat-filter.url-pattern}")
    private String urlPattern;
    /**
     * druid监控过滤格式
     */
    @Value("${spring.datasource.web-stat-filter.exclusions}")
    private String exclusions;
    /**
     * druid监控白名单
     */
    @Value("${spring.datasource.stat-view-servlet.allow}")
    private String allow;
    /**
     * druid是否监控单个url调用SQL
     */
    @Value("${spring.datasource.web-stat-filter.profileEnable}")
    private String profileEnable;


    /**
     * 定义bean产生Druid数据源
     */
    @Bean(name = "default_dataDataSource")
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource druidDataSource() {
        return new DruidDataSource();
    }

    /**
     * 描述：druid监控台配置
     * 作者：Marionette
     */
    @Bean
    public ServletRegistrationBean druidServlet() {
        ServletRegistrationBean servletRegistrationBean = new ServletRegistrationBean();
        servletRegistrationBean.setServlet(new StatViewServlet());
        servletRegistrationBean.addUrlMappings(urlPatch);
        Map<String, String> initParameters = new HashMap<>(4);
        initParameters.put("allow", allow);
        initParameters.put("resetEnable", resetEnable);
        initParameters.put("loginUsername", userName);
        initParameters.put("loginPassword", passWord);
        servletRegistrationBean.setInitParameters(initParameters);
        return servletRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean filterRegistrationBean() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new WebStatFilter());
        filterRegistrationBean.addUrlPatterns(urlPattern);
        filterRegistrationBean.addInitParameter("exclusions", exclusions);
        filterRegistrationBean.addInitParameter("profileEnable", profileEnable);
        return filterRegistrationBean;
    }

}
