package json;

public class Exam_statistic {
	private String name;
	private int id;
	private int score;
	private int time;
	
	public Exam_statistic(){}
	public Exam_statistic(int id,String name,int score,int time){
		this.id = id;
		this.name=name;
		this.score=score;
		this.time=time;
	}
	
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	
	
}
