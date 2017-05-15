package entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity

@Table(name="papers")

public class Papers {
	@Id
	@GeneratedValue
	private int id;
	private int option_choice;//1234对应abcd
	private String blank_answer;//保存填空题答案(不一定有)
	private int score;
	
	@ManyToOne
	private User user;
	
	@ManyToOne
	private Exams exam;
	
	@ManyToOne
	private Options option;
	
	@ManyToOne
	private Blanks blank;
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}

	public Exams getExam() {
		return exam;
	}

	public void setExam(Exams exam) {
		this.exam = exam;
	}

	public Options getOption() {
		return option;
	}

	public void setOption(Options option) {
		this.option = option;
	}

	public Blanks getBlank() {
		return blank;
	}

	public void setBlank(Blanks blank) {
		this.blank = blank;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getOption_choice() {
		return option_choice;
	}

	public void setOption_choice(int option_choice) {
		this.option_choice = option_choice;
	}

	public String getBlank_description() {
		return blank_answer;
	}

	public void setBlank_description(String blank_description) {
		this.blank_answer = blank_description;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}
	
}
