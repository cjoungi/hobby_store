<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<link href="${pageContext.request.contextPath}/css/course.css" rel="stylesheet">
<!-- 중앙 컨텐츠 시작 -->
<script src="${pageContext.request.contextPath}/js/course.fav.js"></script>
<script src="${pageContext.request.contextPath}/js/course.reply.js"></script>
<script src="${pageContext.request.contextPath}/js/course.reply.fav.js"></script>
<!-- datepicker 사용 -->
<link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=fefd68452eb1631196f5d667fac06edf&libraries=services"></script>
	
<div class="course-info">
	<!-- 왼쪽 대표 이미지 -->
	<div class="left-img">
		<!-- 이미지 캐러셀 --> 
		<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
		  <div class="carousel-indicators" style="display: none;">
		    <button type="button" id="img1" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
		    <button type="button" id="img2" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
		    <button type="button" id="img3" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
		  </div>
		  <div class="carousel-inner">
	     	<div class="carousel-item active">
		      <img src="/course/imageView.do?course_num=${course.course_num}&item_type=1" class="d-block w-100">
		    </div>
	        <c:if test="${!empty course.course_photo_name2}">
		    <div class="carousel-item">
		      <img src="/course/imageView.do?course_num=${course.course_num}&item_type=2" class="d-block w-100">
		    </div>
		    </c:if>
		    <c:if test="${!empty course.course_photo_name3}">
		    <div class="carousel-item">
		      <img src="/course/imageView.do?course_num=${course.course_num}&item_type=3" class="d-block w-100">
		    </div>
		    </c:if>
		  </div>
		  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
		    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
		    <span class="visually-hidden">Previous</span>
		  </button>
		  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
		    <span class="carousel-control-next-icon" aria-hidden="true"></span>
		    <span class="visually-hidden">Next</span>
		  </button>
		</div>
		
		<ul>
			<li>
				<label for="img1"><img src="/course/imageView.do?course_num=${course.course_num}&item_type=1" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></label>
			</li>
			
			<!-- photo2가 있는 경우 -->
			<c:if test="${!empty course.course_photo_name2}">
			<li>
				<label for="img2"><img src="/course/imageView.do?course_num=${course.course_num}&item_type=2"></label>
			</li>
			</c:if>
			
			<!-- photo3이 있는 경우 -->
			<c:if test="${!empty course.course_photo_name3}">
			<li>
				<label for="img3"><img src="/course/imageView.do?course_num=${course.course_num}&item_type=3"></label>
			</li>
			</c:if>
		</ul>
	</div>
	<!-- 오른쪽 클래스 설명 -->
	<div class="right-class" <c:if test="${course.course_onoff.equals('on')}">style="height:480px;"</c:if>>
		<p>
			${course.mem_store} 
			<span class="heart" data-num="${course.course_num}"><i class="fa-regular fa-heart" style="color:red;"></i> 찜하기</span>
		</p>
		<p style="font-size:12pt;">
			<c:if test="${course.course_onoff.equals('on')}">
			 [온라인 클래스]
			</c:if>
			<c:if test="${course.course_onoff.equals('off')}">
			 [오프라인 클래스]
			</c:if>
			<c:if test="${course.course_oneweek.equals('one')}">
			 [원데이 클래스]
			</c:if>
			<c:if test="${course.course_oneweek.equals('week')}">
			 [정기 클래스]
			</c:if>
		</p>
		<p>
			<h3><b>${course.course_name}</b></h3>
		</p>
		<div>
			<c:if test="${!empty course.course_zipcode}">
			<span class="gray" data-ad="${course.course_address1}">
				<i class="fa-solid fa-location-dot"></i> &nbsp;${course.course_address1} ${course.course_address2}
			</span>
			<br>
			</c:if>
			<span class="star">★</span> 
			<span class="star-avg"></span> 
			<span class="gray">(후기 <span class="reply-count"></span>)</span>	
		</div>
		<%-- 오프라인 결제정보 전송 폼(클래스이름,가격,인원,클래스번호) --%>
		<c:if test="${course.course_onoff.equals('off')}">
		<form id="course_cart" action="/order/orderNowForm.do" method="post">
			<input type="hidden" name="course_num" value="${course.course_num}" id="course_num">
			<input type="hidden" name="course_name" value="${course.course_name}" id="course_name">
			<input type="hidden" name="course_price" value="${course.course_price}" id="course_price">
			<input type="hidden" name="course_onoff" value="${course.course_onoff}" id="course_onoff">
			<input type="hidden" name="course_oneweek" value="${course.course_oneweek}" id="course_oneweek">
			<input type="hidden" name="course_limit" value="${course.course_limit}" id="course_limit">
			
			<ul class="day" style="display:none;">
				<c:forEach var="day" items="${days}">
					<li>${day}</li>
				</c:forEach>
			</ul>
			
			<div class="reservation">
				<%-- 원데이 클래스 --%>
				<c:if test="${course.course_oneweek.equals('one')}">
				<p>날짜선택<input type="text" id="datePicker" name="course_date" 
					<c:forEach var="date" items="${course_time}">
						<c:if test="${date.course_reg_date=='월'}">
							data-mon="1"
						</c:if>
						<c:if test="${date.course_reg_date=='화'}">
							data-tues="2"
						</c:if>
						<c:if test="${date.course_reg_date=='수'}">
							data-wed="3"
						</c:if>
						<c:if test="${date.course_reg_date=='목'}">
							data-thur="4"
						</c:if>
						<c:if test="${date.course_reg_date=='금'}">
							data-fri="5"
						</c:if>
						<c:if test="${date.course_reg_date=='토'}">
							data-sat="6"
						</c:if>
						<c:if test="${date.course_reg_date=='일'}">
							data-sun="0"
						</c:if>
					</c:forEach>
				></p>
				<p>시간선택<select name="course_time" class="time" data-ctime="${course_time}" disabled></select></p>
				<p class="reserved" style="height: 30px;display: none;">
					<span class="cnt">현재인원</span><span class="course-limit"><b></b> / ${course.course_limit}</span>
					<span class="sold-out">매진임박</span>
				</p>
				</c:if>
				
				<%-- 정기클래스 --%>
				<c:if test="${course.course_oneweek.equals('week')}">
				<p style="height: 30px;">
					<span style="float:left;">시작날짜</span>
					<span class="start">${course.course_startdate}</span>
				</p>
				<p style="height: 30px;">
					<span style="float:left;">기간/횟수</span>
					<span class="period">${course.course_month}개월 / ${course.course_count}회</span>
				</p>
				<p class="reserved" style="line-height: 30px;">
					<span class="cnt">현재인원</span>
					<span class="course-limit"><b>${reserved}</b> / ${course.course_limit}</span>
					<span class="sold-out">매진임박</span>
				</p>
				</c:if>
				<%-- 정기클래스 끝 --%>
				
				<div class="limit">
					<span>예약인원 </span>
					<ul>
						<li id="minus"><i class="fa-solid fa-minus" style="line-height:30px;"></i></li>
						<li>
							<input type="number" name="course_quan" id="course_quan" value="1" min="1" max="${course.course_limit}" 
									<c:if test="${course.course_oneweek.equals('one')}">disabled</c:if>>
						</li>
						<li id="plus"><i class="fa-solid fa-plus" style="line-height:30px;"></i></li>
					</ul>
				</div>
				<span class="price"><fmt:formatNumber>${course.course_price}</fmt:formatNumber>원</span>
				<hr size="2" noshade width="100%" style="color:gray;">
				<input type="submit" class="buy" style="width:100%;" value="예약하기"/>
			</div>
		</form>
		</c:if>
		<%-- 오프라인 끝 --%>
		
		<%-- 온라인 장바구니정보 전송 폼(클래스번호,회원번호) --%>
		<c:if test="${course.course_onoff.equals('on')}">
		<form id="courseOn_cart" method="post">	
			<input type="hidden" name="course_num" value="${course.course_num}" id="course_num">
			<input type="hidden" name="course_price" value="${course.course_price}" id="course_price">
			<input type="hidden" name="course_name" value="${course.course_name}" id="course_name">
      		<input type="hidden" name="course_onoff" value="${course.course_onoff}" id="course_onoff">
      		<input type="hidden" name="course_quan" value="1" id="course_quan">
			<div class="reservation">
				<span class="price" style="line-height:70px;"><fmt:formatNumber>${course.course_price}</fmt:formatNumber>원</span>
				<hr size="2" noshade width="100%" style="color:gray;">
				<div style="display:flex;justify-content:space-between;">
					<input type="submit" class="buy" value="장바구니" formaction="/cart/insert.do">
					<input type="submit" class="buy" value="구매하기" formaction="/order/orderNowForm.do">
				</div>
			</div>
		</form>
		</c:if>
		<%-- 온라인 끝 --%>
	</div>
</div>

<div class="course-d-info">
	<div class="scroll">
		<ul class="title">
			<li class="intro">소개</li>
			<li class="rev">후기 <span class="badge reply-badge"></span></li>
		</ul>
	<hr size="2" noshade width="100%" style="color:gray;margin:0;">
	</div>
	<!-- 소개 시작 -->
	<div class="c-content">
		<!-- 왼쪽 소개 -->
		<div class="left-intro">${course.course_content}</div>
		
		<!-- 오른쪽 지도 -->
		<c:if test="${course.course_onoff=='off'}">
		<div class="right-map">
			<div id="map"></div>
		</div>
		</c:if>
	</div>
	<!-- 소개 끝 -->
	
	<!-- 후기 시작 -->
	<div class="reply">
		<h5>후기 <b></b>개</h5>
		<hr size="2" noshade width="100%" style="color:gray;">
		<ul class="reply-avg">
			<li><span>★ </span><span class="star-avg"></span><li>
			<li><span class="count"></span> 건의 후기 중<br><span class="star5_per"></span> % 의 고객이 5점을 주었어요!</li>
		</ul>
	</div>
	<hr size="2" noshade width="100%" style="color:gray;">
	
	<form id="reply_form"<c:if test="${empty user}">style="height:370px;"</c:if>>
		<input type="hidden" name="course_num" value="${course.course_num}" id="course_num">
		<c:if test="${!empty user}">
		<div class="reply_star">별점
		<fieldset>
			<input type="radio" name="star_auth" value="5" id="rate1">
			<label for="rate1">★</label>
			<input type="radio" name="star_auth" value="4" id="rate2">
			<label for="rate2">★</label>
			<input type="radio" name="star_auth" value="3" id="rate3">
			<label for="rate3">★</label>
			<input type="radio" name="star_auth" value="2" id="rate4">
			<label for="rate4">★</label>
			<input type="radio" name="star_auth" value="1" id="rate5">
			<label for="rate5">★</label>
			<span class="letter-count">300 / 300</span>
		</fieldset>
		</div>
		</c:if>
		
		<textarea rows="3" cols="50" name="reply_content" id="reply_content" class="reply-content" 
				<c:if test="${empty user}">disabled="disabled"</c:if>
				><c:if test="${empty user}">로그인해야 작성할 수 있습니다.</c:if></textarea>
				
		<c:if test="${!empty user}">
		<div class="reply-photo">
			<ul class="image">
				<li>
					<img class="course-photo1">
					<label for="upload1" class="label1 l1">
						<i class="fa-solid fa-circle-plus"></i><br>
					</label>
					<i class="fa-solid fa-circle-xmark d1"></i>
					<input type="file" name="upload1" id="upload1" style="display:none;" accept="image/jpeg,image/png,image/gif">
				</li>
				<li>
					<img class="course-photo2">
					<label for="upload2" class="label1 l2">
						<i class="fa-solid fa-circle-plus"></i><br>
					</label>
					<i class="fa-solid fa-circle-xmark d2"></i>
					<input type="file" name="upload2" id="upload2" style="display:none;" accept="image/jpeg,image/png,image/gif">
				</li>
				<li>
					<img class="course-photo3">
					<label for="upload3" class="label1 l3">
						<i class="fa-solid fa-circle-plus"></i><br>
					</label>
					<i class="fa-solid fa-circle-xmark d3"></i>
					<input type="file" name="upload3" id="upload3" style="display:none;" accept="image/jpeg,image/png,image/gif">
				</li>
			</ul>
			<div class="reply-submit-btn">
				<label for="submit" style="width:40px;height:40px;"><i class="fa-solid fa-paper-plane"></i></label>
				<input type="submit" id="submit" style="display:none;">
			</div>
		</div>
		</c:if>
	</form>

	<%-- 정렬 --%>
	<div class="reply-search">
		<select class="form-select select" id="order" name="order" data-num="${course.course_num}" style="width:100px;">
			<option value="1" <c:if test="${param.order == 1}">selected</c:if>>최신순</option>
			<option value="2" <c:if test="${param.order == 2}">selected</c:if>>별점순</option>
			<option value="3" <c:if test="${param.order == 3}">selected</c:if>>좋아요순</option>
		</select>
		<hr size="2" noshade style="color:gray;">
	</div>
	
	<!-- 후기 목록 출력 시작 -->
	<div id="output"></div>
	<!-- 페이징 처리 시작 -->
	<ul class="paging-btn"></ul>
	<!-- 페이징 처리 끝 -->
	<div id="loading" style="display:none;">
		<img src="${pageContext.request.contextPath}/images/loading2.gif" width="40" height="40">
	</div>
	<!-- 후기 목록 출력 끝 -->
	<!-- 후기 끝 -->
</div>


<!-- ============================= kakao map ========================== -->
<script>
		var container = document.getElementById('map');
		
		var options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3 // 지도의 확대 레벨
		};
		
		var map = new kakao.maps.Map(container, options); // 지도를 생성합니다
		
		
		//주소-좌표 변환 객체를 생성합니다
		var geocoder = new kakao.maps.services.Geocoder();
		//DB에 저장된 주소값
		var address = $('.gray').attr('data-ad');
		
		// 주소로 좌표를 검색합니다
		geocoder.addressSearch(address, function(result, status) {

		    // 정상적으로 검색이 완료됐으면 
		     if (status === kakao.maps.services.Status.OK) {

		        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
		        
		        // 결과값으로 받은 위치를 마커로 표시합니다
		        var marker = new kakao.maps.Marker({
		            map: map,
		            position: coords
		        });


		        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
		        map.setCenter(coords);
		    } 
		});
</script>

<!-- 중앙 컨텐츠 끝 -->