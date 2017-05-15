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

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity

@Table(name="exams")

public class Exams {
	@Id
	@GeneratedValue
	private int id;
	private String name;
	private int time;//øº ‘ ±≥§
	private int score;
	
	@ManyToOne()
	private User user;	
	
	@OneToMany(fetch=FetchType.LAZY,cascade=CascadeType.ALL,mappedBy ="exam")
	List <Papers> papers;
	
	@OneToMany(fetch=FetchType.LAZY,cascade=CascadeType.ALL,mappedBy ="exam")
	List <Options> option;
	
	@OneToMany(fetch=FetchType.LAZY,cascade=CascadeType.ALL,mappedBy ="exam")
	List <Blanks> blank;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public List<Papers> getPapers() {
		return papers;
	}

	public void setPapers(List<Papers> papers) {
		this.papers = papers;
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
	
	
}
