package com.nebula.business.test;

import com.nebula.business.test.dto.SendDataDTO;
import com.nebula.common.util.GsonUtil;
import com.nebula.common.util.HttpClientUtil;
import com.nebula.common.util.ResultUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @RequestMapping("/test")
    public ResultUtil test(){

        SendDataDTO dto = new SendDataDTO();
        dto.setChannelId("a4b1c1fffea3e206-000044a4-00000003-1cf941227ea981a9-d319e743");
        dto.setMessage("你个瘪犊子玩应儿");
        String result = HttpClientUtil.sendPostRequest("http://localhost:9999/api/test", GsonUtil.ObjectToJson(dto));
        if("200".equals(result)){
            return ResultUtil.success();
        }else{
            return ResultUtil.fail(000, "失败");
        }
    }

}
