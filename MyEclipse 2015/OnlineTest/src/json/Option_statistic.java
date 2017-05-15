package json;

public class Option_statistic {
	private int id;
	private String name;
	private int answer;
	
	public Option_statistic(){}
	public Option_statistic(int id,String name,int answer){
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAnswer() {
		return answer;
	}
	public void setAnswer(int answer) {
		this.answer = answer;
	}
}
