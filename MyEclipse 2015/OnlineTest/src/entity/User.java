package entity;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity

@Table(name="user")


public class User {
	@Id
	@GeneratedValue
	private int id;
	private String userName;
	private String password;
	boolean jurisdiction;//false表示学生，true表示老师
	@OneToMany(fetch=FetchType.LAZY,cascade=CascadeType.ALL,mappedBy ="user")
	List <Papers> paper;
	
	@OneToMany(fetch=FetchType.EAGER,cascade=CascadeType.ALL,mappedBy ="user")
	List <PaperInfo> paper_info;
	
	@OneToMany(fetch=FetchType.LAZY,cascade=CascadeType.ALL,mappedBy ="user")
	List <Exams> exam;
	
	@OneToMany(fetch=FetchType.LAZY,cascade=CascadeType.ALL,mappedBy ="user")
	List <Options> option;
	
	@OneToMany(fetch=FetchType.LAZY,cascade=CascadeType.ALL,mappedBy ="user")
	List <Blanks> blank;
	
	
	public List<Papers> getPaper() {
		return paper;
	}
	public void setPaper(List<Papers> paper) {
		this.paper = paper;
	}
	public List<PaperInfo> getPaper_info() {
		return paper_info;
	}
	public void setPaper_info(List<PaperInfo> paper_info) {
		this.paper_info = paper_info;
	}
	public List<Exams> getExam() {
		return exam;
	}
	public void setExam(List<Exams> exam) {
		this.exam = exam;
	}
	public List<Options> getOption() {
		return option;
	}
	public void setOption(List<Options> option) {
		this.option = option;
	}
	public List<Blanks> getBlank() {
		return blank;
	}
	public void setBlank(List<Blanks> blank) {
		this.blank = blank;
	}
	public boolean isJurisdiction() {
		return jurisdiction;
	}
	public void setJurisdiction(boolean jurisdiction) {
		this.jurisdiction = jurisdiction;
	}	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	

}