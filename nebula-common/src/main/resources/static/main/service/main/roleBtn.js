function setRoleBtn() {
    if ($('#roleBtnStr').val().indexOf("01") == -1) {//新增
        $('.roleAdd').hide();
    }
    if ($('#roleBtnStr').val().indexOf("02") == -1) {//查询
        $('.roleSel').hide();
    }
    if ($('#roleBtnStr').val().indexOf("03") == -1) {//修改
        $('.roleUpdate').hide();
    }
    if ($('#roleBtnStr').val().indexOf("04") == -1) {//删除
        $('.roleDel').hide();
    }
    if ($('#roleBtnStr').val().indexOf("05") == -1) {//详细
        $('.roleDetail').hide();
    }
    if ($('#roleBtnStr').val().indexOf("06") == -1) {//设置
        $('.roleSet').hide();
    }
    if ($('#roleBtnStr').val().indexOf("07") == -1) {//导出
        $('.roleExport').hide();
    }
    if ($('#roleBtnStr').val().indexOf("08") == -1) {//移动
        $('.roleMove').hide();
    }
}