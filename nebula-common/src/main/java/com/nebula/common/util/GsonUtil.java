package com.nebula.common.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.util.List;
import java.util.Map;

/**
 * 描述：Gson工具类
 * 作者：Marionette
 */
public class GsonUtil {

    /**
     * 描述：不用创建对象,直接使用Gson.就可以调用方法
     * 说明：当使用GsonBuilder方式时属性为空的时候输出来的json字符串是有键值key的,<br/>
     *      显示形式是"key":null，而直接new出来的就没有"key":null的;<br/>
     *      判断gson对象是否存在了,不存在则创建对象
     */
    private static Gson gson = null;
    static {
        if (gson == null) {
            gson= new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
        }
    }

    /**
     * 描述：无参的私有构造方法
     */
    private GsonUtil() {}

    /**
     * 描述：将对象转成json格式
     * @param object
     * @return String
     */
    public static String ObjectToJson(Object object) {
        String objectToJson = null;
        if (gson != null) {
            objectToJson = gson.toJson(object);
        }
        return objectToJson;
    }

    /**
     * 描述：将json转成特定的cls的对象
     * @param jsonString
     * @param cls
     * @return
     */
    public static <T> T GsonToBean(String jsonString, Class<T> cls) {
        T bean = null;
        if (gson != null) {
            bean = gson.fromJson(jsonString, cls);
        }
        return bean;
    }

    /**
     * 描述：json字符串转成list
     * 说明：根据泛型返回解析指定的类型,<br/>
     *      TypeToken<List<T>>{}.getType()获取返回类型
     * @param jsonString
     * @param cls
     * @return
     */
    public static <T> List<T> GsonToList(String jsonString, Class<T> cls) {
        List<T> list = null;
        if (gson != null) {
            list = gson.fromJson(jsonString, new TypeToken<List<T>>() {
            }.getType());
        }
        return list;
    }

    /**
     * 描述：json字符串转成list中有map的
     * @param gsonString
     * @return
     */
    public static <T> List<Map<String, T>> GsonToListMaps(String gsonString) {
        List<Map<String, T>> list = null;
        if (gson != null) {
            list = gson.fromJson(gsonString,
                    new TypeToken<List<Map<String, T>>>() {
                    }.getType());
        }
        return list;
    }

    /**
     * 描述：json字符串转成map的
     * @param jsonString
     * @return
     */
    public static <T> Map<String, T> GsonToMaps(String jsonString) {
        Map<String, T> map = null;
        if (gson != null) {
            map = gson.fromJson(jsonString, new TypeToken<Map<String, T>>() {
            }.getType());
        }
        return map;
    }

}
