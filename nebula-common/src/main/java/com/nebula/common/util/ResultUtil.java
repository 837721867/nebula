package com.nebula.common.util;


import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * 描述：交互返回封装工具类
 * 作者：Marionette
 * @param <T>
 */
@Setter
@Getter
public class ResultUtil<T> implements Serializable {

    private static final long serialVersionUID = 7206990865925659614L;

    /** 返回结果状态 */
    private boolean result = true;
    /** 返回数据封装 */
    private T data;
    /** 返回路由地址 */
    private String routerAddress;
    /** 返回结果信息 */
    private String message = "成功";

    public ResultUtil(){

    }

    public ResultUtil(boolean result) {
        this.result = result;
    }

    public ResultUtil(boolean result, String message){
        this.result = result;
        this.message = message;
    }

    public ResultUtil(boolean result, T data, String message){
        this.result = result;
        this.data = data;
        this.message = message;
    }

    public ResultUtil(boolean result, String routerAddress, String message){
        this.result = result;
        this.routerAddress = routerAddress;
        this.message = message;
    }

    public ResultUtil(boolean result, T data, String routerAddress, String message){
        this.result = result;
        this.data = data;
        this.routerAddress = routerAddress;
        this.message = message;
    }

    public static <T> ResultUtil<T> result(){
        return new ResultUtil();
    }

    public static ResultUtil result(boolean result){
        return new ResultUtil(result);
    }

    public static ResultUtil result(boolean result, String message){
        return new ResultUtil(result, message);
    }

    public static ResultUtil result(boolean result, Object data, String message){
        return new ResultUtil(result, data, message);
    }

    public static ResultUtil result(boolean result, String routerAddress, String message){
        return new ResultUtil(result, routerAddress, message);
    }

    public static ResultUtil result(boolean result, Object data, String routerAddress, String message){
        return new ResultUtil(result, data, routerAddress, message);
    }
}
