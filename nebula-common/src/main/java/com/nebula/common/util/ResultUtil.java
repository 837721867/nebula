package com.nebula.common.util;


import lombok.Data;
import java.io.Serializable;

/**
 * 描述：交互返回封装工具类
 * 作者：Marionette
 * @param <T>
 */
@Data
public class ResultUtil<T> implements Serializable {

    private static final long serialVersionUID = 7206990865925659614L;

    /** 返回的代码，0表示成功，其他表示失败 */
    private int code;

    /** 返回数据封装 */
    private T data;

    /** 返回结果信息 */
    private String message;

    /**
     * 构造函数
     * @param resultStatusEnum
     * @param data
     */
    public ResultUtil(ResultStatusEnum resultStatusEnum, T data){
        this.code = resultStatusEnum.getCode();
        this.message = resultStatusEnum.getMessage();
        this.data = data;
    }

    /**
     * 构造函数
     * @param resultStatusEnum
     * @param data
     * @param message
     */
    public ResultUtil(ResultStatusEnum resultStatusEnum, T data, String message){
        this.code = resultStatusEnum.getCode();
        this.message = resultStatusEnum.getMessage();
        this.data = data;
        this.message = message;
    }

    /**
     * 构造函数
     * @param code
     * @param data
     * @param message
     */
    public ResultUtil(int code, T data, String message){
        this.code = code;
        this.data = data;
        this.message = message;
    }

    /**
     * 构造函数
     * @param code
     * @param message
     */
    public ResultUtil(int code, String message){
        this(code, null, message);
    }

    /**
     * 构造函数
     * @param resultStatusEnum
     */
    public ResultUtil(ResultStatusEnum resultStatusEnum){
        this(resultStatusEnum, null);
    }


    /**
     * 静态方法
     * @return
     */
    public static ResultUtil success(){
        return new ResultUtil(ResultStatusEnum.OK);
    }

    /**
     * 静态方法
     * @return
     */
    public static ResultUtil success(Object data){
        return new ResultUtil(ResultStatusEnum.OK, data);
    }

    /**
     * 静态方法
     * @return
     */
    public static ResultUtil success(Object data, String message){
        return new ResultUtil(ResultStatusEnum.OK, data, message);
    }

    /**
     * 静态方法
     * @return
     */
    public static ResultUtil fail(int code, String message){
        return new ResultUtil(code, message);
    }

    /**
     * 静态方法
     * @return
     */
    public static ResultUtil fail(ResultStatusEnum resultStatusEnum){
        return new ResultUtil(resultStatusEnum);
    }

    /**
     * 静态方法
     * @return
     */
    public static ResultUtil fail(ResultStatusEnum resultStatusEnum, String message){
        return new ResultUtil(resultStatusEnum, null, message);
    }

    /**
     * 静态方法
     * @return
     */
    public static ResultUtil fail(ResultStatusEnum resultStatusEnum, Object data, String message){
        return new ResultUtil(resultStatusEnum, data, message);
    }



}
