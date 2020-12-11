package com.nebula.admin.index.service;

import com.nebula.admin.menuManage.entity.MenuInfo;
import com.nebula.admin.menuManage.repository.MenuRepository;
import com.nebula.admin.userManage.entity.UserInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service("indexService")
@Transactional(rollbackOn = Exception.class)
public class IndexService {

    @Resource(name = "menuRepository")
    private MenuRepository menuRepository;

    public Map<String, Object> getIndexDate(UserInfo userInfo){
        Map<String, Object> result = new HashMap<>();
        result.put("userInfo", userInfo);

        List<MenuInfo> dateList = menuRepository.getListByRoleId(userInfo.getRole().getId());
        List<MenuInfo> oneList = dateList.stream().filter(s->0 == s.getLevel()).collect(Collectors.toList());
        List<MenuInfo> twoList = dateList.stream().filter(s->1 == s.getLevel()).collect(Collectors.toList());
        List<MenuInfo> resultList = new ArrayList<>();
        for(MenuInfo one:oneList){
            List<MenuInfo> detailList = new ArrayList<>();
            for(MenuInfo two:twoList){
                if(one.getId().equals(two.getParent().getId())){
                    detailList.add(two);
                }
            }
            one.setDetails(detailList);
            resultList.add(one);
        }
        result.put("menuList", resultList);
        return result;
    }
}
