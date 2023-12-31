$(function() {
	//페이지와 관련된 정보를 가지는 변수
	let pageSize = 5;//화면에 보여줄 레코드 수
	let pageBlock = (pageSize / 4) + 1;//페이지 표시 단위
	let currentPage;//현재 보고 있는 화면
	let totalItem;//총 레코드 수 


	//후기 목록
	function selectList(pageNum) {
		currentPage = pageNum;

		//로딩 이미지 노출
		$('#loading').show();

		$.ajax({
			url: 'itemsReplyList.do',
			type: 'post',
			data: { pageNum: pageNum, items_num: $('#items_num').val() },
			dataType: 'json',
			success: function(param) {
				//로딩 이미지 감추기
				$('#loading').hide();
				var count = param.itemsReply;
				//로딩 이미지 감추기
				$('#loading').hide();


				//별점 평균
				$('#starAvg').text(param.itemsStar);
				//후기 개수
				$('#reply').text(param.itemsReply);
				$('#reply_1').text('후기 ' + param.itemsReply + ' 개');
				$('#reply_2').text(param.itemsReply + ' 건의 후기 중');

				$('#star_per').text(param.star5_per + '% 의 고객이 5점을 주었어요 !');

				$('#starAvg2').text(param.itemsStar);

				//호출시 해당 ID의 div의 내부 내용물 제거
				$('#output').empty();
				$('.paging-btn').empty();

				//후기 목록 작업
				$(param.list).each(function(index, item) {

					let output = '<div class="wid"><span class="r-list-star">';
					for (let i = 1; i <= item.star_auth; i++) {
						output += '★';
					}
					output += '</span>';

					output += '<span class="r-list-fav" data-num="' + item.reply_num + '">';
					if (item.fav_num != 0) {
						output += '<i class="fa-regular fa-thumbs-up" style ="color :#FF4E02;"></i>' + item.favcount + '</span></div>';
					}
					if (item.fav_num == 0) {
						output += '<i class="fa-regular fa-thumbs-up style ="color :#000;"></i>' + item.favcount + '</span></div>';
					}

					output += '<div class="item">';
					output += '<ul class="detail-info">';
					output += '<li>';
					output += '<img src="../member/viewProfile.do?mem_num=' + item.mem_num + '" width="50" height="50" class="my-photo">';
					output += '</li>';
					output += '<li>';
					if (item.mem_nickname) {
						output += item.mem_nickname + '<br>';
					} else {
						output += item.mem_id + '<br>';
					}
					if (item.reply_mdate) {
						output += '<span class="modify-date">' + item.reply_mdate + '</span>';
					} else {
						output += '<span class="modify-date">' + item.reply_date + '</span>';
					}
					output += '</li></ul>';
					output += '<div class="sub-item">';
					output += '<p>' + item.reply_content.replace(/\r\n/g, '<br>') + '</p>';
					if (item.reply_photo_name1 != null || item.reply_photo_name2 != null || item.reply_photo_name3 != null) {
						output += '<div class="look-photo">사진</div>';
					}
					output += '<p class="list-photos">';
					if (item.reply_photo_name1 != null) {
						output += '<img src="replyImageView.do?reply_num=' + item.reply_num + '&reply_type=1" width="100" height="100" class="photo1 modal-p">';
					}
					if (item.reply_photo_name2 != null) {
						output += '<img src="replyImageView.do?reply_num=' + item.reply_num + '&reply_type=2" width="100" height="100" class="photo2 modal-p">';
					}
					if (item.reply_photo_name3 != null) {
						output += '<img src="replyImageView.do?reply_num=' + item.reply_num + '&reply_type=3" width="100" height="100" class="photo3 modal-p">';
					}

					output += '</p>';
					if (param.user_num == item.mem_num) {
						output += '<div class="reply-btn">';
						output += ' <input type="button" data-num="' + item.reply_num + '" value="수정" class="modify-btn">';
						output += ' <input type="button" data-num="' + item.reply_num + '" value="삭제" class="delete-btn">';
						output += '</div>';
					}
					output += '</div>';//sub-item
					output += '</div>';//item
					output += '<hr size="1" noshade style="width:70%;margin:16px auto;color:gray;">';

					//모달창
					output += '<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">';
					output += '<div class="modal-dialog modal-dialog-centered">';
					output += '<div class="modal-content">';
					output += '<div class="modal-header">';
					output += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
					output += '</div>';
					output += '<div class="modal-body">';
					output += '<img src="" class="modal-img">';
					output += '</div>';
					output += '</div>';
					output += '</div>';
					output += '</div>';



					//문서 객체에 추가
					$('#output').append(output);
				});

				//후기 페이징 처리	
				totalItem = param.count;
				if (totalItem == 0) {
					return;
				}

				var totalPage = Math.ceil(totalItem / pageSize);

				if (currentPage == undefined || currentPage == '') {
					currentPage = 1;
				}
				//현재 페이지가 전체 페이지 수보다 크면 전체 페이지수로 설정
				if (currentPage > totalPage) {
					currentPage = totalPage;
				}

				//시작 페이지와 마지막 페이지 값을 구하기
				var startPage = Math.floor((currentPage - 1) / pageBlock) * pageBlock + 1;
				var endPage = startPage + pageBlock - 1;

				//마지막 페이지가 전체 페이지 수보다 크면 전체 페이지 수로 설정
				if (endPage > totalPage) {
					endPage = totalPage;
				}

				var add = '';
				if (startPage > pageBlock) {
					add += '<li data-page=' + (startPage - 1) + '><i class="fa-solid fa-chevron-left"></i></li>';
				}

				for (var i = startPage; i <= endPage; i++) {
					if (currentPage == i) {
						add += '<li data-page=' + i + ' style="color:#FF4E02;"><b>' + i + '</b></li>';
					} else {
						add += '<li data-page=' + i + '>' + i + '</li>';
					}
				}
				if (endPage < totalPage) {
					add += '<li data-page=' + (startPage + pageBlock) + '><i class="fa-solid fa-chevron-right"></i></li>';;
				}
				//ul 태그에 생성한 li를 추가
				$('.paging-btn').append(add);


			},
			errror: function() {
				//로딩 이미지 감추기
				$('#loading').hide();
				Swal.fire({
					icon: 'error',
					title: '네트워크 오류 발생!',
					showCancelButton: false,
					confirmButtonText: "확인",
					confirmButtonColor: "#FF4E02"
				});
			}
		});

	}

	//후기 목록 사진 모달
	document.addEventListener('click', function(e) {
		if (e.target.classList.contains('modal-p')) {
			let src = e.target.getAttribute('src');
			document.querySelector('.modal-img').src = src;
			const myModalAlternative = new bootstrap.Modal('#exampleModal');
			myModalAlternative.show();
		}
	});



	//후기 목록 사진보기 클릭
	$(document).on('click', '.look-photo', function() {

		$(this).parent().find('.list-photos').toggle();

	});



	//후기 등록
	$('#reply_form').submit(function(event) {
		//기본 이벤트 제거
		event.preventDefault();

		if ($('#reply_content').val().trim() == '') {
			Swal.fire({
				icon: 'warning',
				title: '내용을 입력하세요!',
				showCancelButton: false,
				confirmButtonText: "확인",
				confirmButtonColor: "#FF4E02"
			});
			$('#reply_content').val('').focus();
			return false;

		}

		if (!$('.reply_star input[type=radio]').is(':checked')) {
			Swal.fire({
				icon: 'warning',
				title: '별점을 입력하세요!',
				showCancelButton: false,
				confirmButtonText: "확인",
				confirmButtonColor: "#FF4E02"
			});
			return false;
		}


		$.ajax({
			url: 'itemsReply.do',
			type: 'post',
			data: new FormData($('#reply_form')[0]),
			dataType: 'json',
			processData: false,
			contentType: false,
			success: function(param) {
				if (param.result == 'logout') {
					alert('로그인해야 작성할 수 있습니다.');
				} else if (param.result == 'success') {
					//폼 초기화
					initForm();
					//등록된 데이터가 표시될 수 있도록 
					//목록 갱신
					selectList(1);
				}
			},
			error: function() {
				Swal.fire({
					icon: 'error',
					title: '네트워크 오류 발생',
					showCancelButton: false,
					confirmButtonText: "확인",
					confirmButtonColor: "#FF4E02"
				});
			}
		});


	});

	//후기 작성 폼 초기화
	function initForm() {
		$('textarea').val('');
		$('#reply_form .letter-count').text('300/300');
		/*$('.reply_star label').css('text-shadow', '0 0 0 #f0f0f0'); */
		$("input:radio[name='star_auth']").prop('checked', false);
		$('#upload1').val('');
		$('#upload2').val('');
		$('#upload3').val('');
		$('.image img').hide();
		$('.image .fa-circle-xmark').hide();
		$('.image .label1').show();
	}



	//textarea에 내용 입력시 글자수 체크
	$(document).on('keyup', 'textarea', function() {
		//입력한 글자수 구하기
		let inputLength = $(this).val().length;

		if (inputLength > 300) {//300자를 넘어선 경우
			$(this).val($(this).val().substring(0, 300));
		} else {//300자 이하인 경우
			//남은 글자수 구하기
			let remain = 300 - inputLength;
			remain += ' / 300';
			if ($(this).attr('id') == 'reply_content') {
				//등록 폼 글자수
				$('#reply_form .letter-count').text(remain);
			} else {
				//수정 폼 글자수
				$('#mreply_form .letter-count').text(remain);
			}
		}

	});

	//후기 수정
	//후기 수정 버튼 클릭시 수정폼 노출
	$(document).on('click', '.modify-btn', function() {
		//댓글 번호 
		let reply_num = $(this).attr('data-num');

		//댓글 내용
		let content = $(this).parents('.item').find('p').html().replace(/<br>/g, '\r\n');

		let photos_src = {
			photo1: $(this).parents('.item').find('.photo1').attr('src'),
			photo2: $(this).parents('.item').find('.photo2').attr('src'),
			photo3: $(this).parents('.item').find('.photo3').attr('src')
		}
		$.ajax({
			url: 'UpdateReplyForm.do',
			type: 'get',
			data: { reply_num: reply_num },
			dataType: 'json',
			contentType: false,
			context: this,
			async: false,
			success: function(param) {
				console.log(param);
			
				//후기 수정 폼 UI
				let modifyUI = '<form id="mreply_form" enctype="multipart/form-data">';
				modifyUI += '<input type="hidden" name="reply_num" id="mreply_num" value="' + reply_num + '">';
				modifyUI += '<span class="letter-count mletter-count">300 / 300</span>';
				modifyUI += '<textarea rows="3" cols="50" name="reply_content" id="mreply_content" class="reply-content">' + content + '</textarea>';
				modifyUI += '<div class="reply-photo">';
				modifyUI += '<ul class="image">';
				for (let i = 1; i <= 3; i++) {
					modifyUI += '<li>';
					if (photos_src["photo" + i] != null) {
						modifyUI += '<img src="' + photos_src["photo" + i] + '" class="items-photo' + (i + 3) + '" style="display:inline-block;">';
						modifyUI += '<label for="upload' + (i + 3) + '" class="label1 l' + i + '">';
						modifyUI += '<i class="fa-solid fa-circle-plus"></i><br>';
						modifyUI += '</label>';
						modifyUI += '<i class="fa-solid fa-circle-xmark d' + (i + 3) + '"></i>';
						modifyUI += '<input type="hidden" id ="delete_check'+i+'"name ="delete_check' + i + '" value="' +i+'">';
						
					} else {
						
						modifyUI += '<img class="items-photo' + (i + 3) + '">';
						modifyUI += '<label for="upload' + (i + 3) + '" class="label1 l' + i + '">';
						modifyUI += '<i class="fa-solid fa-circle-plus"></i><br>';
						modifyUI += '</label>';
						modifyUI += '<i class="fa-solid fa-circle-xmark d' + (i + 3) + '"></i>';
						
						
					}
					modifyUI += '<input type="file" name="upload' + (i + 3) + '" id="upload' + (i + 3) + '" style="display:none;" accept="image/jpeg,image/png,image/gif">';
					modifyUI += '</li>';
				}
				modifyUI += '</ul>';
				modifyUI += ' <input type="button" value="취소" class="reply-reset">';
				modifyUI += '<input type="submit" value="수정" class="submit-btn">';
				modifyUI += '</div>';
				modifyUI += '</form>';

				//이전에 이미 수정하는 댓글이 있을 경우 수정버튼을 클릭하면 숨김
				//sub-item을 환원시키고 수정 폼을 초기화함
				initModifyForm();
				//지금 클릭해서 수정하고자 하는 데이터는 감추기
				//수정버튼을 감싸고 있는 div
				$(this).parents('.sub-item').hide();

				//수정폼을 수정하고자 하는 데이터가 있는 div에 노출
				$(this).parents('.item').append(modifyUI);

				//입력한 글자수 셋팅
				let inputLength = $('#mreply_content').val().length;
				let remain = 300 - inputLength;
				remain += ' / 300';


				//미리보기 제어 스크립트
				$('#upload4').on('change', function() {
					readURL4(this);
				});
				$('#upload5').on('change', function() {
					readURL5(this);
				});
				$('#upload6').on('change', function() {
					readURL6(this);
				});


				function readURL4(input) {
					if (input.files && input.files[0]) {
						var reader = new FileReader();
						reader.onload = function(e) {
							$('.items-photo4').attr('src', e.target.result);
						}
						reader.readAsDataURL(input.files[0]);
					}
				}
				function readURL5(input) {
					if (input.files && input.files[0]) {
						var reader = new FileReader();
						reader.onload = function(e) {
							$('.items-photo5').attr('src', e.target.result);
						}
						reader.readAsDataURL(input.files[0]);
					}
				}
				function readURL6(input) {
					if (input.files && input.files[0]) {
						var reader = new FileReader();
						reader.onload = function(e) {
							$('.items-photo6').attr('src', e.target.result);
						}
						reader.readAsDataURL(input.files[0]);
					}
				}


				$('.d4').click(function() {
					$('#delete_check1').val('4');
					$('.items-photo4').removeAttr('src');
				});
				$('.d5').click(function() {
					$('#delete_check2').val('4');
					$('.items-photo5').removeAttr('src');
				});
				$('.d6').click(function() {
					$('#delete_check3').val('4');
					$('.items-photo6').removeAttr('src');
				});

				//문서 객체에 반영
				$('#mreply_form .letter-count').text(remain);


			},
			error: function() {
				Swal.fire({
					icon: 'error',
					title: '네트워크 오류 발생',
					showCancelButton: false,
					confirmButtonText: "확인",
					confirmButtonColor: "#FF4E02"
				});
			}
		});

	});
	


	//수정폼에서 취소 버튼 클릭시 수정폼 초기화
	$(document).on('click', '.reply-reset', function() {
		initModifyForm();
	});




	//댓글 수정 폼 초기화
	function initModifyForm() {
		$('#mreply_form').remove();
		$('.sub-item').show();
	}





	//후기 수정 처리
	$(document).on('submit', '#mreply_form', function(event) {
		//기본 이벤트 제거
		event.preventDefault();

		if ($('#mreply_content').val().trim() == '') {
			Swal.fire({
				icon: 'warning',
				title: '내용을 입력하세요!',
				showCancelButton: false,
				confirmButtonText: "확인",
				confirmButtonColor: "#FF4E02"
			});
			$('#mreply_content').val('').focus();
			return false;
		}

		//폼에 입력한 데이터 반환
		/*let form_data = $(this).serialize();*/

		//서버와 통신
		$.ajax({
			url: 'itemsUpdateReply.do',
			type: 'post',
			data: new FormData($('#mreply_form')[0]),
			dataType: 'json',
			processData: false,
			contentType: false,
			success: function(param) {
				/*
				// FormData의 key 확인
				var formData = new FormData($('#mreply_form')[0]);
				for (var key of formData.keys()) {
					console.log(key);
				}
				// FormData의 value 확인
				for (var value of formData.values()) {
					console.log(value);
				}
				*/

				if (param.result == 'logout') {
					Swal.fire({
						icon: 'warning',
						title: '로그인 후 수정할 수 있습니다',
						showCancelButton: false,
						confirmButtonText: "확인",
						confirmButtonColor: "#FF4E02"
					});
				} else if (param.result == 'success') {
					//수정 폼 초기화
					initModifyForm();
					//목록 새로고침
					selectList(currentPage);
				} else if (param.result == 'wrongAccess') {
					Swal.fire({
						icon: 'warning',
						title: '타인의 후기을 수정할 수 없습니다',
						showCancelButton: false,
						confirmButtonText: "확인",
						confirmButtonColor: "#FF4E02"
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: '후기수정 시 오류 발생!',
						showCancelButton: false,
						confirmButtonText: "확인",
						confirmButtonColor: "#FF4E02"
					});
				}
			},
			error: function() {
				Swal.fire({
					icon: 'error',
					title: '네트워크 오류 발생!',
					showCancelButton: false,
					confirmButtonText: "확인",
					confirmButtonColor: "#FF4E02"
				});
			}
		});

	});

	//후기 삭제
	$(document).on('click', '.delete-btn', function() {
		//댓글 번호
		let reply_num = $(this).attr('data-num');

		//서버와 통신
		$.ajax({
			url: 'replyDelete.do',
			type: 'post',
			data: { reply_num: reply_num },
			dataTpye: 'json',
			success: function(param) {
				if (param.result == 'logout') {
					Swal.fire({
						icon: 'warning',
						title: '로그인 후 삭제할 수 있습니다',
						showCancelButton: false,
						confirmButtonText: "확인",
						confirmButtonColor: "#FF4E02"
					});
				} else if (param.result == 'success') {
					Swal.fire({
						icon: 'success',
						title: '후기 삭제 완료!',
						showCancelButton: false,
						confirmButtonText: "확인",
						confirmButtonColor: "#FF4E02"
					});
					selectList(1);
				} else if (param.result == 'wrongAccess') {
					Swal.fire({
						icon: 'warning',
						title: '타인의 후기을 삭제할 수 없습니다',
						showCancelButton: false,
						confirmButtonText: "확인",
						confirmButtonColor: "#FF4E02"
					});
				} else {
					Swal.fire({
						icon: 'error',
						title: '후기삭제 시 오류 발생!',
						showCancelButton: false,
						confirmButtonText: "확인",
						confirmButtonColor: "#FF4E02"
					});
				}
			},
			error: function() {
				Swal.fire({
					icon: 'error',
					title: '네트워크 오류 발생!',
					showCancelButton: false,
					confirmButtonText: "확인",
					confirmButtonColor: "#FF4E02"
				});
			}
		});
	});




	//페이지 버튼 이벤트 연결
	$(document).on('click', '.paging-btn li', function() {
		//페이지 번호를 읽어들임
		currentPage = $(this).attr('data-page');

		//클릭한 번호 저장(색강조)


		//목록 호출
		selectList(currentPage);
	});

	//좋아요 등록 - 상세페이지
	$(document).on('click', '.r-list-fav', function() {

		let replyFav = $(this);
		$.ajax({
			url: 'replyWriteFav.do',
			type: 'post',
			data: { reply_num: $(this).attr('data-num') },
			dataType: 'json',
			success: function(param) {

				if (param.result == 'logout') {
					Swal.fire({
						icon: 'warning',
						title: '로그인 후 좋아요를 눌러주세요',
						showCancelButton: false,
						confirmButtonText: "확인",
						confirmButtonColor: "#FF4E02"
					});
				} else if (param.result == 'success') {
					if (param.status == 'yesFav') {

						replyFav.html('<i class="fa-regular fa-thumbs-up" style ="color :#FF4E02;"></i>' + param.count);
					} else {

						replyFav.html('<i class="fa-regular fa-thumbs-up" style ="color :#000;"></i>' + param.count);
					}
				} else {
					Swal.fire({
						icon: 'error',
						title: '등록시 오류 발생',
						showCancelButton: false,
						confirmButtonText: "확인",
						confirmButtonColor: "#FF4E02"
					});
				}
			},
			error: function() {
				Swal.fire({
					icon: 'error',
					title: '네트워크 오류',
					showCancelButton: false,
					confirmButtonText: "확인",
					confirmButtonColor: "#FF4E02"
				});
			}
		});

	});





	$('#upload1').on('change', function() {
		readURL1(this);
	});
	$('#upload2').on('change', function() {
		readURL2(this);
	});

	$('#upload3').on('change', function() {
		readURL3(this);
	});


	//사진삭제 
	$('.d1').click(function() {
		$('#upload1').val('');
		$('.items-photo1').removeAttr('src');

	});
	$('.d2').click(function() {
		$('#upload2').val('');
		$('.items-photo2').removeAttr('src');

	});
	$('.d3').click(function() {
		$('#upload3').val('');
		$('.items-photo3').removeAttr('src');

	});

	//추가한 파일 미리보기 (readURL)
	function readURL1(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('.items-photo1').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
	function readURL2(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('.items-photo2').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
	function readURL3(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('.items-photo3').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}









	//초기 데이터(목록) 호출
	selectList(1);

});




