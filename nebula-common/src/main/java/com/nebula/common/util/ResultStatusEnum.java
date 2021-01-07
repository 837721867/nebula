package com.nebula.common.util;

/**
 * 描述：返回结果状态枚举
 * 作者：Marionette
 */
public enum ResultStatusEnum {

    OK(0, "请求成功"),
    TOKEN_INVALID(1001, "token失效"),
    LOGIN_CHECK_FAIL(1002, "登录行为验证失败"),
    USER_NO_REGISTER(1003, "该用户尚未注册"),
    PASSWORD_ERROR(1004, "登陆密码错误");


    private int code;
    private String message;

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    ResultStatusEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
