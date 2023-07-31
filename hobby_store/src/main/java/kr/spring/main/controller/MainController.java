package kr.spring.main.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.spring.course.service.CourseService;
import kr.spring.course.vo.CourseVO;

@Controller
public class MainController {
	
	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	
	@Autowired
	private CourseService courseService;
	
	@RequestMapping("/")
	public String main() {
		return "redirect:/main/main.do";
	}
	
	@RequestMapping("/main/main.do")
	public String main(Model model) {
		List<List<CourseVO>> listOfLists = new ArrayList<>();
		
		Map<String,Object> map1 = new HashMap<String,Object>();
		map1.put("start", 1);
		map1.put("end", 4);
		List<CourseVO> list1 = courseService.selectCourseMainList(map1);
		listOfLists.add(list1);
		
		Map<String,Object> map2 = new HashMap<String,Object>();
		map2.put("start", 1);
		map2.put("end", 4);
		List<CourseVO> list2 = courseService.selectCourseMainList2(map2);
		listOfLists.add(list2);
		
		Map<String,Object> map3 = new HashMap<String,Object>();
		map3.put("start", 1);
		map3.put("end", 4);
		List<CourseVO> list3 = courseService.selectCourseMainList3(map3);
		listOfLists.add(list3);
		
		model.addAttribute("listOfLists",listOfLists);
		
		return "main";//타일스 설정값
	}
}





