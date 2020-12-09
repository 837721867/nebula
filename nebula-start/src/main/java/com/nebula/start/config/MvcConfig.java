package com.nebula.start.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 描述：设置系统默认访问页面
 * 作者：Marionette
 */
@Configuration
public class MvcConfig implements WebMvcConfigurer {

    /**
     * 设置系统默认访问页面
     * @param registry
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry){
        registry.addViewController("/").setViewName("user/login");
    }
}
