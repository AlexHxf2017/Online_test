var question_number=0;//保存总题数,用来给选择控件的name赋值，便于获取选择题答案,用来给textarea的id赋值，便于获取简答题答案
var total_score=0;

function display_option(description,optionA,optionB,optionC,optionD,score,answer,data){
	question_number++;
	score_array[question_number-1]=score;
	var div1=document.getElementById("div_test");
	var div = document.createElement("div");
	div.setAttribute("class","infoDiv");
	//显示序号、分值和正确答案
	var number = document.createElement("p");
	number.innerHTML="选择题"+question_number+"("+score+"分)";
	number.setAttribute("class", "text");
	div.appendChild(number);
    //生成文本框
	var input = document.createElement("p");
    input.setAttribute("class", "text");
    input.innerHTML=description;
    div.appendChild(input);
    div.appendChild(document.createElement("br"));
    //选项A
    var option_A = document.createElement("p");
    var choice_A = document.createElement("input");
    choice_A.setAttribute("type","radio");
    choice_A.setAttribute("value","A");
    choice_A.setAttribute("name","answer"+question_number);
    option_A.innerHTML="A."+optionA;
    option_A.setAttribute("class", "text");
    div.appendChild(choice_A);
    div.appendChild(option_A);
    div.appendChild(document.createElement("br"));
    //选项B
    var option_B = document.createElement("p");
    var choice_B = document.createElement("input");
    choice_B.setAttribute("type","radio");
    choice_B.setAttribute("value","B");
    choice_B.setAttribute("name","answer"+question_number);
    option_B.innerHTML="B."+optionB;
    option_B.setAttribute("class", "text");
    div.appendChild(choice_B);
    div.appendChild(option_B);
    div.appendChild(document.createElement("br"));
    //选项C
    var option_C = document.createElement("p");
    var choice_C = document.createElement("input");
    choice_C.setAttribute("type","radio");
    choice_C.setAttribute("value","C");
    choice_C.setAttribute("name","answer"+question_number);
    option_C.innerHTML="C."+optionC;
    option_C.setAttribute("class", "text");
    div.appendChild(choice_C);
    div.appendChild(option_C);
    div.appendChild(document.createElement("br"));
    //选项D
    var option_D = document.createElement("p");
    var choice_D = document.createElement("input");
    choice_D.setAttribute("type","radio");
    choice_D.setAttribute("value","D");
    choice_D.setAttribute("name","answer"+question_number);
    option_D.innerHTML="D."+optionD;
    option_D.setAttribute("class", "text");
    div.appendChild(choice_D);
    div.appendChild(option_D);
    div.appendChild(document.createElement("br"));
    //正确答案
    real_answer_array[question_number-1]=answer;
    var input2 = document.createElement("p");
    input2.setAttribute("class", "answer_hide");
    if(answer==1){answer="A";}
    else if (answer==2){answer="B";}
    else if(answer==3){answer="C";}
    else if(answer==4){answer="D";}
    input2.innerHTML="正确答案"+answer;
    div.appendChild(input2);
    div.appendChild(document.createElement("br"));
    //添加提交按钮
    var connect = document.createElement("a");
    div.appendChild(connect);
    connect.href="javascript:void(0)";
    connect.innerText ="提交";
    connect.setAttribute("onclick","submit_option(this,'"+description+"','"+question_number+"','"+score+"')");
    div1.appendChild(div);
    //
    var input3 = document.createElement("p");
    var str="";
    for (var i=0;i<data.length;i++){
    	str+=data[i].name+":"+data[i].answer+"<br>";
    }
    input3.innerHTML="共计"+data.length+"个人回答了,分别是：<br>"+str;
    div.appendChild(input3);
}

function display_Blank(description,score,answer,data){
	question_number++;
	score_array[question_number-1]=score;
	var div1=document.getElementById("div_test");
	var div = document.createElement("div");
	div.setAttribute("class","infoDiv");
	//显示序号、分值和正确答案
	var blank_number = document.createElement("p");
	blank_number.innerHTML="填空题"+question_number+"("+score+"分)";
	blank_number.setAttribute("class", "text");
	div.appendChild(blank_number);
    //生成文本框显示问答题题目
	var input = document.createElement("p");
    input.setAttribute("class", "text");
    input.innerHTML="题目："+description;
    div.appendChild(input);
    div.appendChild(document.createElement("br"));
    //生成文本框显示问答题答案
	var input2 = document.createElement("textarea");
    input2.setAttribute("cols", "50");
    input2.setAttribute("rows", "10");
    input2.setAttribute("id", "blank_answer"+question_number);
    div.appendChild(input2);
    div.appendChild(document.createElement("br"));
    //正确答案
    real_answer_array[question_number-1]=answer;
    var p_answer = document.createElement("p");
    p_answer.innerHTML="正确答案"+answer;
    div.appendChild(p_answer);
    div.appendChild(document.createElement("br"));
    //添加修改按钮
    var connect2 = document.createElement("a");
    div.appendChild(connect2);
    connect2.href="javascript:void(0)";
    connect2.innerText ="提交";
    connect2.setAttribute("onclick","submit_blank(this,'"+description+"','"+question_number+"','"+score+"')");
    div1.appendChild(div);
    //
    var input3 = document.createElement("p");
    var str="";
    for (var i=0;i<data.length;i++){
    	str+=data[i].name+":"+data[i].answer+"<br>";
    }
    input3.innerHTML="共计"+data.length+"个人回答了,分别是：<br>"+str;
    div.appendChild(input3);
}

function show_answer(){
	var list=document.getElementsByClassName('answer_hide');
	for(var i=0;i<list.length;i++){
		list[i].style.display='block';
	}
}
