package entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity

@Table(name="paper_info")

public class PaperInfo {
	@Id
	@GeneratedValue
	private int id;
	private int time;//花费的时长
	private int score;//得到的分数
	
	@ManyToOne
	private User user;
	@ManyToOne
	private Exams exam;
	
	public Exams getExam() {
		return exam;
	}
	public void setExam(Exams exam) {
		this.exam = exam;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	
}
