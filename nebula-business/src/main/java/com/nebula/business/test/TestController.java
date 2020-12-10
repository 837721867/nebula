package com.nebula.business.test;

//import com.nebula.common.util.HttpClientUtil;
import com.nebula.common.util.HttpClientUtil;
import com.nebula.common.util.ResultUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @RequestMapping("/test")
    public ResultUtil test(){
        Map<String, String> param = new HashMap<>();
        param.put("msg", "47279953");
        String result = HttpClientUtil.sendPostRequest("http://localhost:9999/api/test", param);
        if("200".equals(result)){
            return ResultUtil.success();
        }else{
            return ResultUtil.fail();
        }
    }
}
