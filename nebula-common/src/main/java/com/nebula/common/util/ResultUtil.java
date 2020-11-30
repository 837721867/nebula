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

    /** 返回结果状态 用作判断 */
    private boolean result;

    /** 返回数据封装 */
    private T data;

    /** 返回结果信息 */
    private String message;


    /**
     * 构造函数
     * @param result
     */
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


    /**
     * 成功 静态方法
     * @return
     */
    public static ResultUtil success(){
        return new ResultUtil(true);
    }

    public static ResultUtil success(String message){
        return new ResultUtil(true, message);
    }

    public static ResultUtil success(Object data, String message){
        return new ResultUtil(true, data, message);
    }


    /**
     * 失败静态方法
     * @return
     */
    public static ResultUtil fail(){
        return new ResultUtil(false);
    }

    public static ResultUtil fail(String message){
        return new ResultUtil(false, message);
    }

    public static ResultUtil fail(Object data, String message){
        return new ResultUtil(false, data, message);
    }


}
