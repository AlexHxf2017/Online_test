package json;

import entity.Options;

public class RealOption {
	private int id;
	private int value;//·ÖÖµ
	private String option_description;
	private String option_A;
	private String option_B;
	private String option_C;
	private String option_D;
	private int answer;//1234=abcd
	
	
	public RealOption(){}
	public RealOption(Options option){
		this.id = option.getId();
		this.value=option.getValue();
		this.option_description=option.getOption_description();
		this.option_A=option.getOption_A();
		this.option_B=option.getOption_B();
		this.option_C=option.getOption_C();
		this.option_D=option.getOption_D();
		this.answer=option.getAnswer();
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
	public String getOption_description() {
		return option_description;
	}
	public void setOption_description(String option_description) {
		this.option_description = option_description;
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
	public int getAnswer() {
		return answer;
	}
	public void setAnswer(int answer) {
		this.answer = answer;
	}
	
	
}
