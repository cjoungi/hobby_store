package kr.spring.cart.vo;

public class CourseCartVO {
	private int cart_num;
	private int quantity;
	private int mem_num;
	private int course_num;
	
	private int cate_parent;
	private String cate_name;
	private String course_photo1;
	private String course_name;
	private String course_onoff;
	private int course_price;
//	private int[] c_chkArr;
	
	private int course_total;
	private int item_total;
	private int all_total;
	
	public int getCate_parent() {
		return cate_parent;
	}
	public void setCate_parent(int cate_parent) {
		this.cate_parent = cate_parent;
	}
	public String getCate_name() {
		return cate_name;
	}
	public void setCate_name(String cate_name) {
		this.cate_name = cate_name;
	}
	public String getCourse_photo1() {
		return course_photo1;
	}
	public void setCourse_photo1(String course_photo1) {
		this.course_photo1 = course_photo1;
	}
	public String getCourse_name() {
		return course_name;
	}
	public void setCourse_name(String course_name) {
		this.course_name = course_name;
	}
	public String getCourse_onoff() {
		return course_onoff;
	}
	public void setCourse_onoff(String course_onoff) {
		this.course_onoff = course_onoff;
	}
	public int getCart_num() {
		return cart_num;
	}
	public void setCart_num(int cart_num) {
		this.cart_num = cart_num;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public int getMem_num() {
		return mem_num;
	}
	public void setMem_num(int mem_num) {
		this.mem_num = mem_num;
	}
	public int getCourse_num() {
		return course_num;
	}
	public void setCourse_num(int course_num) {
		this.course_num = course_num;
	}
	public int getCourse_price() {
		return course_price;
	}
	public void setCourse_price(int course_price) {
		this.course_price = course_price;
	}

	@Override
	public String toString() {
		return "CourseCartVO [cart_num=" + cart_num + ", quantity=" + quantity + ", mem_num=" + mem_num
				+ ", course_num=" + course_num + ", cate_parent=" + cate_parent + ", cate_name=" + cate_name
				+ ", course_photo1=" + course_photo1 + ", course_name=" + course_name + ", course_onoff=" + course_onoff + ", course_price="
				+ course_price + "]";
	}
	/*
	 * public String[] getC_chkArr() { return c_chkArr; } public void
	 * setC_chkArr(String[] c_chkArr) { this.c_chkArr = c_chkArr; }
	 */
	public int getCourse_total() {
		return course_total;
	}
	public void setCourse_total(int course_total) {
		this.course_total = course_total;
	}
	public int getItem_total() {
		return item_total;
	}
	public void setItem_total(int item_total) {
		this.item_total = item_total;
	}
	public int getAll_total() {
		return all_total;
	}
	public void setAll_total(int all_total) {
		this.all_total = all_total;
	}
}
