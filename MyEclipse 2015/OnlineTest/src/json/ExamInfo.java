package json;

import entity.Exams;

public class ExamInfo {
	private int examId;
	private int score;
	private String examName;
	private int time;
	public ExamInfo(){}
	public ExamInfo(Exams exam){
		this.examId = exam.getId();
		this.examName=exam.getName();
		this.score=exam.getScore();
		this.time=exam.getTime();
	}
	
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public int getExamId() {
		return examId;
	}
	public void setExamId(int examId) {
		this.examId = examId;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public String getExamName() {
		return examName;
	}
	public void setExamName(String examName) {
		this.examName = examName;
	}
	
}
