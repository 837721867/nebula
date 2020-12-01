package com.nebula.web.config;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * 描述：配置过滤器
 * 作者: Marionette
 */
@WebFilter(filterName = "FilterConfig", urlPatterns = {"/*"})
public class FilterConfig implements Filter {

    //不需要登录就可以访问的路径
    private String[] includeUrls = new String[]{"login", "register"};

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpSession session = request.getSession(false);
        String path = request.getContextPath();
        String loginUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/login";
        String url = request.getRequestURI().substring(request.getRequestURI().lastIndexOf("/") + 1);
        if (isNeedFilter(url)) {
            filterChain.doFilter(servletRequest, servletResponse);
        } else {
            if (session != null && session.getAttribute("userInfo") != null) {
                filterChain.doFilter(request, response);
            } else {
                String requestType = request.getHeader("X-Requested-With");
                //判断是否是ajax请求
                if (requestType != null && "XMLHttpRequest".equals(requestType)) {
                    response.getWriter().write("未登录");
                } else {
                    //重定向到登录页(需要在static文件夹下建立此html文件)
                    response.sendRedirect(loginUrl);
                }
                return;
            }
        }
    }

    private boolean isNeedFilter(String uri) {

        for (String includeUrl : includeUrls) {
            if (includeUrl.equals(uri)) {
                return true;
            }

            if(uri.contains(".")){
                return true;
            }
        }
        return false;
    }
}
