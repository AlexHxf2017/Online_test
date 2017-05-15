var question_number=0;//保存总题数,用来给选择控件的name赋值，便于获取选择题答案,用来给textarea的id赋值，便于获取简答题答案
var total_score=0;

function display_option(description,optionA,optionB,optionC,optionD,score,answer,user_answer){
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
    if(jsp_type=="test"){ input2.setAttribute("style", "display:none;");}
    if(answer==1){answer="A";}
    else if (answer==2){answer="B";}
    else if(answer==3){answer="C";}
    else if(answer==4){answer="D";}
    if(jsp_type=="test"){input2.innerHTML="正确答案"+answer;}
    else{input2.innerHTML="正确答案"+answer+"你的答案："+user_answer;}
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
}

function display_Blank(description,score,answer,user_answer){
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
    p_answer.setAttribute("class", "answer_hide");
    if(jsp_type=="test"){p_answer.setAttribute("style", "display:none;");}
    if(jsp_type=="test"){p_answer.innerHTML="正确答案"+answer;}
    else{p_answer.innerHTML="正确答案"+answer+"你的答案："+user_answer;}
    div.appendChild(p_answer);
    div.appendChild(document.createElement("br"));
    //添加修改按钮
    var connect2 = document.createElement("a");
    div.appendChild(connect2);
    connect2.href="javascript:void(0)";
    connect2.innerText ="提交";
    connect2.setAttribute("onclick","submit_blank(this,'"+description+"','"+question_number+"','"+score+"')");
    div1.appendChild(div);
}

function show_answer(){
	var list=document.getElementsByClassName('answer_hide');
	for(var i=0;i<list.length;i++){
		list[i].style.display='block';
	}
}
function submit_option(node,description,number,score){
	var radio=document.getElementsByName("answer"+number);
	if_answered[number-1]=1;
	var answer;
	for(var i=0;i<radio.length;i++){
		if(radio[i].checked==true){
		answer=radio[i].value;
		break;
		}
	}
	if(answer){
		$.ajax({
			url:"/OnlineTest/user/submit_paper_option",
			type:"post",
			data:{username:username,examId:examId,description:description,answer:answer},
			success:function(id){
				if(answer=="A"){answer=1;}
			    else if (answer=="B"){answer=2;}
			    else if(answer=="C"){answer=3;}
			    else if(answer=="D"){answer=4;}
				if(answer==real_answer_array[number-1]){answer_array[number-1]=1;}
				node.setAttribute("onclick", "update_option('"+number+"','"+id+"')");
				node.innerText="修改";
				alert("提交成功");
			}
		})
	}
	else{alert("请先答题");}
}

function submit_blank(node,description,number){
	var answer=document.getElementById("blank_answer"+number).value;
	if_answered[number-1]=1;
	if(answer !=""){
		$.ajax({
			url:"/OnlineTest/user/submit_paper_blank",
			type:"post",
			data:{username:username,examId:examId,description:description,answer:answer},
			success:function(id){
				if(answer==real_answer_array[number-1]){answer_array[number-1]=1;}
				node.setAttribute("onclick", "update_blank('"+number+"','"+id+"')");
				node.innerText="修改";
				alert("提交成功");
			}
		})
	}
	else{alert("请先答题");}
}

function update_option(number,paper_id){
	var answer;
	var radio=document.getElementsByName("answer"+number);
	for(var i=0;i<radio.length;i++){
		if(radio[i].checked==true){
		answer=radio[i].value;
		break;
		}
	}
	if(answer=="A"){answer=1;}
    else if (answer=="B"){answer=2;}
    else if(answer=="C"){answer=3;}
    else if(answer=="D"){answer=4;}
	if(answer==real_answer_array[number-1]){answer_array[number-1]=1;}
	else{answer_array[number-1]=0;}
	$.ajax({
		url:"/OnlineTest/user/update_paper_option",
		type:"post",
		data:{paper_id:paper_id,answer:answer},
		success:function(id){
			alert("修改成功");
		}
	})
}

function update_blank(number,paper_id){
	var answer=document.getElementById("blank_answer"+number).value;
	if(answer==real_answer_array[number-1]){answer_array[number-1]=1;}
	else{answer_array[number-1]=0;}
	$.ajax({
		url:"/OnlineTest/user/update_paper_blank",
		type:"post",
		data:{paper_id:paper_id,answer:answer},
		success:function(id){
			alert("修改成功");
		}
	})
}

var t;//计时器的句柄
var cost_time=0;
function timecount(){
	t=setInterval(function() { 
		document.getElementById("exam_time").innerText="时长："+Math.floor((remain_time%36000)/3600)+":"
			+Math.floor((remain_time%3600)/600)+Math.floor((remain_time%600)/60)+":"
			+Math.floor((remain_time%60)/10)+Math.floor(remain_time%10);;
		remain_time--;
		cost_time++;
		if(remain_time<0){stop_exam();}
		}, 1000); 
}

function stop_exam(){
	var warning="";
	for (var i=0;i<if_answered.length;i++){
		if(if_answered[i]==0){warning=warning+(i+1).toString()+"、"}
	}
	if(warning !=""){
		if(confirm("第"+warning+"题尚未作答,确认要交卷吗？")){
			clearInterval(t);
			show_answer();
			for(var i=0;i<score_array.length;i++){
				total_score=score_array[i]*answer_array[i]+total_score;
			}
			document.getElementById("show_score").innerText="你的总分是："+total_score;
			var list=document.getElementsByTagName("a");
			for(var j=0;j<list.length;j++){list[j].setAttribute("onclick", "alert('无效');");}
			$.ajax({
				url:"/OnlineTest/user/finish_exam",
				type:"post",
				data:{time:cost_time,score:total_score,examId:examId,username:username},
				success:function(){
				}
			})
		}
	}
	else{
		if(confirm("确认要交卷吗？")){
			clearInterval(t);
			show_answer();
			for(var i=0;i<score_array.length;i++){
				total_score=score_array[i]*answer_array[i]+total_score;
			}
			document.getElementById("show_score").innerText="你的总分是："+total_score;
			var list=document.getElementsByTagName("a");
			for(var j=0;j<list.length;j++){list[j].setAttribute("onclick", "alert('无效');");}
			$.ajax({
				url:"/OnlineTest/user/finish_exam",
				type:"post",
				data:{time:cost_time,score:total_score,examId:examId,username:username},
				success:function(){
				}
			})
		}
	}
	
}

function unload(){
	clearInterval(t);
	for(var i=0;i<score_array.length;i++){
		total_score=score_array[i]*answer_array[i]+total_score;
	}
	$.ajax({
		url:"/OnlineTest/user/finish_exam",
		type:"post",
		data:{time:cost_time,score:total_score,examId:examId,username:username},
		success:function(){
		}
	})
}