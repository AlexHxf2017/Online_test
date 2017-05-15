package entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity

@Table(name="Options")
public class Options {
	@Id
	@GeneratedValue
	private int id;
	private int value;//·ÖÖµ
	private String option_description;
	private String option_A;
	private String option_B;
	private String option_C;
	private String option_D;
	private int answer;//1234=abcd
	
	@OneToMany(fetch=FetchType.LAZY,cascade=CascadeType.ALL,mappedBy ="option")
	List <Papers> paper;
	
	@ManyToOne
	private Exams exam;
	
	@ManyToOne
	private User user;
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getOption_description() {
		return option_description;
	}

	public void setOption_description(String option_description) {
		this.option_description = option_description;
	}

	public int getAnswer() {
		return answer;
	}

	public void setAnswer(int answer) {
		this.answer = answer;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public String getOption_A() {
		return option_A;
	}

	public void setOption_A(String option_A) {
		this.option_A = option_A;
	}

	public String getOption_B() {
		return option_B;
	}

	public void setOption_B(String option_B) {
		this.option_B = option_B;
	}

	public String getOption_C() {
		return option_C;
	}

	public void setOption_C(String option_C) {
		this.option_C = option_C;
	}

	public String getOption_D() {
		return option_D;
	}

	public void setOption_D(String option_D) {
		this.option_D = option_D;
	}

	public List<Papers> getPaper() {
		return paper;
	}

	public void setPaper(List<Papers> paper) {
		this.paper = paper;
	}

	public Exams getExam() {
		return exam;
	}

	public void setExam(Exams exam) {
		this.exam = exam;
	}

	
	
}
