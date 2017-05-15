package json;

public class Blank_statistic {
	private int id;
	private String answer;
	private String name;
	
	public Blank_statistic(){}
	public Blank_statistic(int id,String name,String answer){
		this.id = id;
		this.name=name;
		this.answer=answer;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
}
