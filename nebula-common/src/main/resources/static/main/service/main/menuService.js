layui.use('element', function () {
    var element = layui.element;
    var $ = layui.jquery;
    autoMenu();

    /**
     * 自动加载菜单树
     */
    function autoMenu() {
        $.ajax({
                type: "post",
                data: {menuID: "3e2865b6-66d2-4472-bce1-e2c2daa44fc7"},
                url: 'adminIndex/menu/leftMenuList',
                dataType: "json",
                success: function (data) {
                    for (var d = 0; d < data.length; d++) {
                        var menu = data[d];
                        if (d == 0) {
                            var $li = "            <li data-name=\"" + menu.menuId + "\" class=\"layui-nav-item layui-nav-itemed \">\n" +
                                "                    <a href=\"javascript:;\" lay-tips=\"" + menu.menuName + "\" lay-direction=\"2\">\n" +
                                "                    <i class=\"layui-icon layui-icon-home\"></i>\n" +
                                "                    <cite>" + menu.menuName + "</cite>\n" +
                                "                    <span class=\"layui-nav-more\"></span>" +
                                "                    </a>\n";
                        } else {
                            var $li = "            <li data-name=\"" + menu.menuId + "\" class=\"layui-nav-item  \">\n" +
                                "                    <a href=\"javascript:;\" lay-tips=\"" + menu.menuName + "\" lay-direction=\"2\">\n" +
                                "                    <i class=\"layui-icon layui-icon-home\"></i>\n" +
                                "                    <cite>" + menu.menuName + "</cite>\n" +
                                "                    <span class=\"layui-nav-more\"></span>" +
                                "                    </a>\n";
                        }
                        if (menu.menuList.length > 0) {
                            $li = $li + "           <dl class=\"layui-nav-child\">";
                        }
                        for (var dd = 0; dd < menu.menuList.length; dd++) {
                            var menuc = menu.menuList[dd];
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
                        if (menu.menuList.length > 0) {
                            $li = $li + "           </dl>\n";
                        }
                        $li = $li + "            </li>\n"
                        $('ul.layui-nav-tree').append($li);

                    }
                    element.init();
                }
            }
        );
    }

    /**
     * 跳转页面并处理权限
     */
    window.loadContent = function (menuName, subMenuName, url) {
        var roleBtnStr = '<input type="hidden" id="roleBtnStr" name="roleBtnStr" value=""> ';
        $.ajax({
            type: "post",
            data: {menuUrl: url},
            url: 'adminIndex/menu/roleBtn',
            dataType: "json",
            success: function (data) {
                $('#roleBtnStr').val(data.operId);
                // setRoleBtn();
            }
        });
        $('iframe.layadmin-iframe').attr("src", url);
        element.init();
    }
});

