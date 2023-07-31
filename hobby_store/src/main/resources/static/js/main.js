$(function(){
	//키워드 검색시, 클래스 페이지로 넘어감
	$('#search_form').submit(function(){
		if($('#search_bar').val().trim()==''){
			Swal.fire({
                icon: 'warning',
                title:'검색어를 입력하세요!',
                showCancelButton: false,
                confirmButtonText: "확인",
                confirmButtonColor: "#FF4E02"
            })
			$('#search_bar').val('').focus();
			return false;
		}
	});
	
	//지역 카테고리 클릭시, 클래스 페이지로 넘어감
	$('#location').on('change',function(){
		location.href='/course/courseList.do?location='+$(this).val();
	});
	
	//클래스 카테고리 클릭시, 클래스 페이지로 넘어감
	$('#cate').on('change',function(){
		location.href='/course/courseList.do?cate='+$(this).val();
	});
});