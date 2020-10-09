layui.config({
    base: '' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'element'], function () {

    /************************************************* 定义 **************************************************************/
    let element = layui.element;
    let $ = layui.jquery;

    /************************************************* 绑定 **************************************************************/
    getNebulaMenu();

    /************************************************* 函数 **************************************************************/
    function getNebulaMenu() {
        httpService.ajax('/main/getMenu', {}).then(function (res) {
            if (res.result) {
                for (let i = 0; i < res.data.length; i++) {
                    let menu = res.data[i];

                    let $li = "            <li data-name=\"" + menu.id + "\" class=\"layui-nav-item \">\n" +
                        "                    <a href=\"javascript:;\" lay-tips=\"" + menu.name + "\" lay-direction=\"2\">\n" +
                        "                    <i class=\"layui-icon layui-icon-home\"></i>\n" +
                        "                    <cite>" + menu.name + "</cite>\n" +
                        "                    <span class=\"layui-nav-more\"></span>" +
                        "                    </a>\n";

                    if (menu.menuList && menu.menuList.length > 0) {
                        $li = $li + "           <dl class=\"layui-nav-child\">";
                        for (let dd = 0; dd < menu.menuList.length; dd++) {
                            let menuc = menu.menuList[dd];
                            if (dd == 0) {
                                $li = $li + "                    <dd data-name= \"" + menu.menuName + "\" class=\"layui-this\">" +
                                    "                     <a lay-href=\"" + menuc.menuUrl + "\" \">" + menuc.menuName + "</a>\n" +
                                    "                    </dd>\n";
                            } else {
                                $li = $li + "                    <dd data-name= \"" + menu.menuName + "\" >" +
                                    "                     <a lay-href=\"" + menuc.menuUrl + "\" \">" + menuc.menuName + "</a>\n" +
                                    "                    </dd>\n";
                            }
                        }
                        $li = $li + "           </dl>\n";
                    }

                    // if (menu.menuList.length > 0) {
                    //     $li = $li + "           </dl>\n";
                    // }
                    $li = $li + "            </li>\n"
                    $('ul.layui-nav-tree').append($li);

                }
                element.init();
            } else {
                layer.open({
                    title: '错误提示：',
                    content: '菜单获取异常：' + res.message
                });
            }
        })
    }


    /************************************************* 监听 **************************************************************/

    /**
     * 描述：监听菜单交互
     * @param url
     */
    window.loadContent = function (url) {
        $('iframe.layadmin-iframe').attr("src", url);
        element.init();
    }
});