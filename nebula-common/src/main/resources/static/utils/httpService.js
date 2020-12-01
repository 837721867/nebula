/**
 * 描述：公共请求封装
 * 说明：方便扩展维护
 * 作者：Marionette
 */
window.httpService = {
    /** 获取项目根路径 */
    getRootPath: function(){
        //当前全url 如： http://localhost:8083/nebula/login/login.html
        let nowComURL = window.location.href;
        //获取主机地址之后的目录，如： nebula/login/login.html
        let pathName = window.document.location.pathname;
        let pos = nowComURL.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        let localhostPath = nowComURL.substring(0,pos);
        //获取带"/"的项目名，如：/nebula
        let projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
        //拼接返回根路径
        return (localhostPath + projectName);
    },


    /**
     * get请求参数json
     * @param url required 根目录已封装
     * @param data default {}
     * @returns {jQuery}
     */
    jsonGetAjax: function (url, data) {
        let deffer = $.Deferred();
        $.ajax({
            type: 'GET',
            url: this.getRootPath() + url,
            data: typeof (data) == 'undefined' ? {} : data,
            dataType: 'json',
            cache: true,
            success: function (res) {
                deffer.resolve(res);
                console.log(res);
            },
            error: function (e) {
                deffer.reject();
                console.log(e);
            }
        })
        return deffer.promise();
    },

    /**
     * post请求参数默认application/x-www-form-urlencoded
     * @param url required 根目录已封装
     * @param data default {}
     * @returns {jQuery}
     */
    postAjax: function (url, data) {
        let deffer = $.Deferred();
        $.ajax({
            type: 'POST',
            url: this.getRootPath() + url,
            data: typeof (data) == 'undefined' ? {} : data,
            success: function (res) {
                deffer.resolve(res);
                console.log(res);
            },
            error: function (e) {
                deffer.reject();
                console.log(e);
            }
        })
        return deffer.promise();
    }
}
