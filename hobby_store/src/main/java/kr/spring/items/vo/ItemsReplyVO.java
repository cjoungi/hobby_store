package kr.spring.items.vo;

import java.io.IOException;
import java.sql.Date;
import java.util.Arrays;

import org.springframework.web.multipart.MultipartFile;

public class ItemsReplyVO {
	private int reply_num;
	private int items_num;
	private int mem_num;
	private String reply_content;
	private Date reply_date;
	private Date reply_mdate;
	private byte[] reply_photo1;
	private byte[] reply_photo2;
	private byte[] reply_photo3;
	private String reply_photo_name1;
	private String reply_photo_name2;
	private String reply_photo_name3;

	private int delete_check1;
	private int delete_check2;
	private int delete_check3;
	
	// 별점 구분
	private int star_auth;
	//////////////////////////////////////////////////////
	private String mem_id;
	private String mem_nickname;
	private int mem_photo;
	private float starcount;
	private float star5_per;
	private int star5;
	private int starall;
	private int favcount;

	/////////////////
	private int fav_num;

	public int getStar5() {
		return star5;
	}

	public void setStar5(int star5) {
		this.star5 = star5;
	}

	public int getStarall() {
		return starall;
	}

	public void setStarall(int starall) {
		this.starall = starall;
	}

	public int getReply_num() {
		return reply_num;
	}

	public void setReply_num(int reply_num) {
		this.reply_num = reply_num;
	}

	public int getItems_num() {
		return items_num;
	}

	public void setItems_num(int items_num) {
		this.items_num = items_num;
	}

	public int getMem_num() {
		return mem_num;
	}

	public void setMem_num(int mem_num) {
		this.mem_num = mem_num;
	}

	public String getReply_content() {
		return reply_content;
	}

	public void setReply_content(String reply_content) {
		this.reply_content = reply_content;
	}

	public Date getReply_date() {
		return reply_date;
	}

	public void setReply_date(Date reply_date) {
		this.reply_date = reply_date;
	}

	public Date getReply_mdate() {
		return reply_mdate;
	}

	public void setReply_mdate(Date reply_mdate) {
		this.reply_mdate = reply_mdate;
	}

	public byte[] getReply_photo1() {
		return reply_photo1;
	}

	public void setReply_photo1(byte[] reply_photo1) {
		this.reply_photo1 = reply_photo1;
	}

	public byte[] getReply_photo2() {
		return reply_photo2;
	}

	public void setReply_photo2(byte[] reply_photo2) {
		this.reply_photo2 = reply_photo2;
	}

	public byte[] getReply_photo3() {
		return reply_photo3;
	}

	public void setReply_photo3(byte[] reply_photo3) {
		this.reply_photo3 = reply_photo3;
	}

	public String getReply_photo_name1() {
		return reply_photo_name1;
	}

	public void setReply_photo_name1(String reply_photo_name1) {
		this.reply_photo_name1 = reply_photo_name1;
	}

	public String getReply_photo_name2() {
		return reply_photo_name2;
	}

	public void setReply_photo_name2(String reply_photo_name2) {
		this.reply_photo_name2 = reply_photo_name2;
	}

	public String getReply_photo_name3() {
		return reply_photo_name3;
	}

	public void setReply_photo_name3(String reply_photo_name3) {
		this.reply_photo_name3 = reply_photo_name3;
	}

	public int getStar_auth() {
		return star_auth;
	}

	public void setStar_auth(int star_auth) {
		this.star_auth = star_auth;
	}

	public String getMem_id() {
		return mem_id;
	}

	public void setMem_id(String mem_id) {
		this.mem_id = mem_id;
	}

	public String getMem_nickname() {
		return mem_nickname;
	}

	public void setMem_nickname(String mem_nickname) {
		this.mem_nickname = mem_nickname;
	}

	public int getMem_photo() {
		return mem_photo;
	}

	public void setMem_photo(int mem_photo) {
		this.mem_photo = mem_photo;
	}

	public float getStar5_per() {
		return star5_per;
	}

	public void setStar5_per(float star5_per) {
		this.star5_per = star5_per;
	}

	public float getStarcount() {
		return starcount;
	}

	public void setStarcount(float starcount) {
		this.starcount = starcount;
	}

	public int getFavcount() {
		return favcount;
	}

	public void setFavcount(int favcount) {
		this.favcount = favcount;
	}

	public int getFav_num() {
		return fav_num;
	}

	public void setFav_num(int fav_num) {
		this.fav_num = fav_num;
	}

	

	public int getDelete_check1() {
		return delete_check1;
	}

	public void setDelete_check1(int delete_check1) {
		this.delete_check1 = delete_check1;
	}

	public int getDelete_check2() {
		return delete_check2;
	}

	public void setDelete_check2(int delete_check2) {
		this.delete_check2 = delete_check2;
	}

	public int getDelete_check3() {
		return delete_check3;
	}

	public void setDelete_check3(int delete_check3) {
		this.delete_check3 = delete_check3;
	}

	// 업로드 파일 처리
	public void setUpload1(MultipartFile upload1) throws IOException {
		// MultipartFile -> byte[] 변환
		setReply_photo1(upload1.getBytes());
		// 파일 이름
		setReply_photo_name1(upload1.getOriginalFilename());
	}

	public void setUpload2(MultipartFile upload2) throws IOException {
		// MultipartFile -> byte[] 변환
		setReply_photo2(upload2.getBytes());
		setReply_photo_name2(upload2.getOriginalFilename());
	}

	public void setUpload3(MultipartFile upload3) throws IOException {
		// MultipartFile -> byte[] 변환
		setReply_photo3(upload3.getBytes());
		setReply_photo_name3(upload3.getOriginalFilename());
	}

	public void setUpload4(MultipartFile upload4) throws IOException {
		// MultipartFile -> byte[] 변환
		setReply_photo1(upload4.getBytes());
		setReply_photo_name1(upload4.getOriginalFilename());
	}

	public void setUpload5(MultipartFile upload5) throws IOException {
		// MultipartFile -> byte[] 변환
		setReply_photo2(upload5.getBytes());
		setReply_photo_name2(upload5.getOriginalFilename());
	}

	public void setUpload6(MultipartFile upload6) throws IOException {
		// MultipartFile -> byte[] 변환
		setReply_photo3(upload6.getBytes());
		setReply_photo_name3(upload6.getOriginalFilename());
	}

	@Override
	public String toString() {
		return "ItemsReplyVO [reply_num=" + reply_num + ", items_num=" + items_num + ", mem_num=" + mem_num
				+ ", reply_content=" + reply_content + ", reply_date=" + reply_date + ", reply_mdate=" + reply_mdate
				+ ", reply_photo_name1=" + reply_photo_name1 + ", reply_photo_name2=" + reply_photo_name2
				+ ", reply_photo_name3=" + reply_photo_name3 + ", delete_check1=" + delete_check1 + ", delete_check2="
				+ delete_check2 + ", delete_check3=" + delete_check3 + ", star_auth=" + star_auth + ", mem_id=" + mem_id
				+ ", mem_nickname=" + mem_nickname + ", mem_photo=" + mem_photo + ", starcount=" + starcount
				+ ", star5_per=" + star5_per + ", star5=" + star5 + ", starall=" + starall + ", favcount=" + favcount
				+ ", fav_num=" + fav_num + "]";
	}

	



}
