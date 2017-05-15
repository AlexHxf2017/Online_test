package json;

import entity.Blanks;

public class RealBlank {
	private int id;
	private int value;//·ÖÖµ
	private String description;
	private String answer;
	
	public RealBlank(){}
	public RealBlank(Blanks blank){
		this.id = blank.getId();
		this.value=blank.getValue();
		this.description=blank.getDescription();
		this.answer=blank.getAnswer();
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
}
