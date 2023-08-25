package kr.spring.main.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

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
		CompletableFuture<List<CourseVO>> result = courseService.selectCourseMainList(map1);
		
		Map<String,Object> map2 = new HashMap<String,Object>();
		map2.put("start", 1);
		map2.put("end", 4);
		CompletableFuture<List<CourseVO>> result2 = courseService.selectCourseMainList2(map2);
		
		Map<String,Object> map3 = new HashMap<String,Object>();
		map3.put("start", 1);
		map3.put("end", 4);
		CompletableFuture<List<CourseVO>> result3 = courseService.selectCourseMainList3(map3);
		
		//여러 개의 CompletableFuture를 받아와서 모든 비동기 작업이 완료될 때까지 대기하는 새로운 CompletableFuture를 생성하는 메소드
		CompletableFuture<Void> combinedFuture = CompletableFuture.allOf(result, result2, result3);
		
		combinedFuture.thenApply(ignored -> {
		    List<CourseVO> list1 = result.join();
		    List<CourseVO> list2 = result2.join();
		    List<CourseVO> list3 = result3.join();
		    
		    listOfLists.add(list1);
		    listOfLists.add(list2);
		    listOfLists.add(list3);
		    
		    return null; // thenApply 콜백 메소드의 반환 값. 다음 thenApply 메소드 체인으로 넘겨질 때 사용
		}).join();
		
		model.addAttribute("listOfLists",listOfLists);
		
		return "main";//타일스 설정값
	}
}





