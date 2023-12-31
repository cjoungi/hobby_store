<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>
<script>
	window.addEventListener("load", function() {
		<c:if test="${!empty accessMsg || !empty accessText}">
			Swal.fire({
				imageUrl:'/image_bundle/icon.png',
		        imageWidth:200,
		        imageHeight:130,
		        title:'${accessMsg}',
		        showCancelButton: false,
		        confirmButtonColor: "#FF4E02",
		        
		        <c:if test="${!empty accessUrl && empty accessText}">
		        confirmButtonText: "${accessBtn}"
				</c:if>
		        
				<c:if test="${empty accessUrl}">
		        confirmButtonText: "메인으로"
				</c:if>
				
				//text는 작은 글씨
				<c:if test="${!empty accessText}">
				text:'${accessText}',
	    	    confirmButtonText: "${accessBtn}",
				showDenyButton: true,
				denyButtonColor: '#808080',
	    	    denyButtonText: "${accessDeny}"
				</c:if>
				
				}).then(function(result){
					if (result.isConfirmed) {
						<c:if test="${!empty accessUrl}">
						location.href='${accessUrl}'
						</c:if>
				        
						<c:if test="${empty accessUrl}">
						location.href='${pageContext.request.contextPath}/main/main.do'
						</c:if>
					} else if (result.isDenied) {
						location.href='${accessUrl2}'
					}
		    });
		</c:if>
			
		<c:if test="${empty accessMsg && empty accessText}">
			Swal.fire({
		        icon: 'error',
		        title:"잘못된 접속입니다!",
		        showCancelButton: false,
		        confirmButtonText: "확인",
		        confirmButtonColor: "#FF4E02"
				}).then(function(){
					<c:if test="${!empty accessUrl}">
			        location.href='${accessUrl}'
					</c:if>
			        
					<c:if test="${empty accessUrl}">
					location.href='${pageContext.request.contextPath}/main/main.do'
					</c:if>
		    });
		</c:if>
	});
</script>