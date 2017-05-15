var option_list_id=0;//用来保存总题数，在保存试卷时清零
var div_node;//一个临时变量，用来保存在修改或删除的时候需要知道对应的是哪个div
var total_score=0;//用来保存总分数，在保存试卷时清零
total_score=parseInt(total_score);
var temp_exam_name=null;//用来保存当前考卷名

function unload()
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{
		// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else
	{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			window.opener=null;
			window.close();
		}
	}
	xmlhttp.open("POST","/OnlineTest/user/deleteSession",false);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send();
}

function create_test(){
	document.getElementById("create_test_div").style.display="block";
	document.getElementById("set_exam_param").style.display='block';
	document.getElementById("fade").style.display='block';
}

function add_option(){
	document.getElementById("light").style.display='block';
	document.getElementById("fade").style.display='block';
}

function add_blank(){
	document.getElementById("set_blank").style.display='block';
	document.getElementById("fade").style.display='block';
}

function add_option_confirm(){	
	var option_description=document.getElementById("option_description").value;
	var option_A=document.getElementById("A_description").value;
	var option_B=document.getElementById("B_description").value;
	var option_C=document.getElementById("C_description").value;
	var option_D=document.getElementById("D_description").value;
	var option_value=document.getElementById("option_value").value;
	var username=window.location.href.split("=")[1];
	var answer;
	var radio=document.getElementsByName("anwser");
	for(var i=0;i<radio.length;i++){
		if(radio[i].checked==true){
		answer=radio[i].value;
		break;
		}
	}
	if(option_description==""||option_A==""||option_B==""||option_C==""||option_D==""||option_value==""){
		alert("相应字段不能为空");
	}
	else if(temp_exam_name==null){alert("请退出并先生成考卷")}
	else{
		$.ajax({
			url:"/OnlineTest/user/addOption",
			type:"post",
			data:{option_description:option_description, option_A:option_A,option_B:option_B,option_C:option_C,
				option_D:option_D,option_value:option_value,username:username,answer:answer,
				exam_title:temp_exam_name},
			success:function(result){
				if(result=="success"){
					option_list_id++;
					display_new_div("option");
					document.getElementById("light").style.display='none';
					document.getElementById("fade").style.display='none';
					total_score+=parseInt(option_value);
					$("#total_score").html("总分:"+total_score);
				}
				else{alert("该题目已经存在");}
			}
		})
	}
}

function add_blank_confirm(){
	var blank_description=document.getElementById("blank_description").value;
	var blank_answer=document.getElementById("blank_answer").value;
	var blank_value=document.getElementById("blank_value").value;
	var username=window.location.href.split("=")[1];
	if(blank_description==""||blank_answer==""||blank_value==""){
		alert("相应字段不能为空");
	}
	else if(temp_exam_name==null){alert("请退出并先生成考卷")}
	else{
		$.ajax({
			url:"/OnlineTest/user/addBlank",
			type:"post",
			data:{blank_description:blank_description, blank_answer:blank_answer,
				blank_value:blank_value,username:username,exam_title:temp_exam_name},
			success:function(result){
				if(result=="success"){
					option_list_id++;
					display_new_div("blank");
					document.getElementById("set_blank").style.display='none';
					document.getElementById("fade").style.display='none';
					total_score+=parseInt(blank_value);
					$("#total_score").html("总分:"+total_score);
				}
				else{alert("该题目已经存在");}
			}
		})
	}
}

function add_option_cancel(){
	document.getElementById("light").style.display='none';
	document.getElementById("fade").style.display='none';
}

function add_blank_cancel(){
	document.getElementById("set_blank").style.display='none';
	document.getElementById("fade").style.display='none';
}

function display_new_div(choice){
	//生成div
	var dropdowns = document.getElementById("div3");
	var newDiv = document.createElement("div");
	newDiv.setAttribute("class","infoDiv");
	if(choice=="option"){
		display_option(newDiv);
	}
	if(choice=="blank"){
		display_blank(newDiv);
	}
    dropdowns.appendChild(newDiv);
}

function display_blank(div){
	//显示序号、分值和正确答案
	var blank_number = document.createElement("p");
	var blank_value=document.getElementById("blank_value").value;
	blank_number.innerHTML="填空题"+"("+blank_value+"分)";
	blank_number.setAttribute("class", "text");
	div.appendChild(blank_number);
    //生成文本框显示问答题题目
	var input = document.createElement("p");
    input.setAttribute("class", "text");
    input.innerHTML="题目："+document.getElementById("blank_description").value;
    div.appendChild(input);
    div.appendChild(document.createElement("br"));
    //生成文本框显示问答题答案
	var input2 = document.createElement("p");
    input2.setAttribute("class", "text");
    input2.innerHTML="参考答案："+document.getElementById("blank_answer").value;
    div.appendChild(input2);
    div.appendChild(document.createElement("br"));
    //添加修改按钮
    var connect2 = document.createElement("a");
    div.appendChild(connect2);
    connect2.href="javascript:void(0)";
    connect2.innerText ="修改";
    connect2.setAttribute("onclick","revise_blank(this.parentNode,"+blank_value+")");
    //添加删除按钮
    var connect2 = document.createElement("a");
    connect2.href="javascript:void(0)";
    connect2.innerText ="删除";
    connect2.setAttribute("onclick","delete_blank(this.parentNode)");
    div.appendChild(connect2);
    
}


function display_option(div){
	//显示序号、分值和正确答案
	var option_number = document.createElement("p");
	var option_value=document.getElementById("option_value").value;
	var answer;
	var radio=document.getElementsByName("anwser");
	for(var i=0;i<radio.length;i++){
		if(radio[i].checked==true){
		answer=radio[i].value;
		break;
		}
	}
	option_number.innerHTML="选择题"+"("+option_value+"分)"+"(正确答案:"+answer+")"+":";
	option_number.setAttribute("class", "text");
	div.appendChild(option_number);
    //生成文本框
	var input = document.createElement("p");
    input.setAttribute("class", "text");
    input.innerHTML=document.getElementById("option_description").value;
    div.appendChild(input);
    div.appendChild(document.createElement("br"));
    //选项A
    var option_A = document.createElement("p");
    option_A.setAttribute("class", "text");
    option_A.innerHTML="A."+document.getElementById("A_description").value;
    div.appendChild(option_A);
    div.appendChild(document.createElement("br"));
    //选项B
    var option_B = document.createElement("p");
    option_B.setAttribute("class", "text");
    option_B.innerHTML="B."+document.getElementById("B_description").value;
    div.appendChild(option_B);
    div.appendChild(document.createElement("br"));
    //选项C
    var option_C = document.createElement("p");
    option_C.setAttribute("class", "text");
    option_C.innerHTML="C."+document.getElementById("C_description").value;
    div.appendChild(option_C);
    div.appendChild(document.createElement("br"));
    //选项D
    var option_D = document.createElement("p");
    option_D.setAttribute("class", "text");
    option_D.innerHTML="D."+document.getElementById("D_description").value;
    div.appendChild(option_D);
    div.appendChild(document.createElement("br"));	
    //添加修改按钮
    var connect2 = document.createElement("a");
    div.appendChild(connect2);
    connect2.href="javascript:void(0)";
    connect2.innerText ="修改";
    connect2.setAttribute("onclick","revise_option(this.parentNode,"+option_value+")");
    //添加删除按钮
    var connect2 = document.createElement("a");
    connect2.href="javascript:void(0)";
    connect2.innerText ="删除";
    connect2.setAttribute("onclick","delete_option(this.parentNode)");
    div.appendChild(connect2);
}


function revise_option(node,option_value){
	div_node=node;
	total_score-=parseInt(option_value);
	var old_description=document.getElementById("option_description").value;
	document.getElementById("light").style.display='block';
	document.getElementById("fade").style.display='block';
	document.getElementById("confirm_button").setAttribute("onclick", "revise_option_confirm("+old_description+")");
}


function revise_blank(node,blank_value){
	div_node=node;
	total_score-=parseInt(blank_value);
	var old_description=document.getElementById("blank_description").value;
	document.getElementById("set_blank").style.display='block';
	document.getElementById("fade").style.display='block';
	document.getElementById("blank_confirm").setAttribute("onclick", "revise_blank_confirm("+old_description+")");
}


function revise_option_confirm(old_description){
	document.getElementById("light").style.display='none';
	document.getElementById("fade").style.display='none';
	var option_description=document.getElementById("option_description").value;
	var option_A=document.getElementById("A_description").value;
	var option_B=document.getElementById("B_description").value;
	var option_C=document.getElementById("C_description").value;
	var option_D=document.getElementById("D_description").value;
	var option_value=document.getElementById("option_value").value;
	var username=window.location.href.split("=")[1];
	var answer;
	var radio=document.getElementsByName("anwser");
	for(var i=0;i<radio.length;i++){
		if(radio[i].checked==true){
		answer=radio[i].value;
		break;
		}
	}
	$.ajax({
		url:"/OnlineTest/user/reviseOption",
		type:"post",
		data:{old_description:old_description,option_description:option_description, option_A:option_A,
			option_B:option_B,option_C:option_C,option_D:option_D,option_value:option_value,
			username:username,answer:answer},
		success:function(){
		}
	})
	div_node.innerHTML="";
	display_option(div_node);
	total_score+=parseInt(option_value);
	$("#total_score").html("总分:"+total_score);
	div_node=null;
	document.getElementById("confirm_button").setAttribute("onclick", "add_option_confirm()");
}


function revise_blank_confirm(old_description){
	var blank_description=document.getElementById("blank_description").value;
	var blank_answer=document.getElementById("blank_answer").value;
	var blank_value=document.getElementById("blank_value").value;
	var username=window.location.href.split("=")[1];
	$.ajax({
		url:"/OnlineTest/user/reviseBlank",
		type:"post",
		data:{old_description:old_description,blank_description:blank_description, blank_answer:blank_answer,
			blank_value:blank_value,username:username},
		success:function(){
		}
	})
	div_node.innerHTML="";
	display_blank(div_node);
	total_score+=parseInt(blank_value);
	$("#total_score").html("总分:"+total_score);
	div_node=null;
	document.getElementById("blank_confirm").setAttribute("onclick", "add_blank_confirm()");
}


function delete_option(node){
	node.parentNode.removeChild(node);
	var description=document.getElementById("option_description").value;
	var option_value=document.getElementById("option_value").value;
	total_score-=parseInt(option_value);
	$("#total_score").html("总分:"+total_score);
	$.ajax({
		url:"/OnlineTest/user/deleteOption",
		type:"post",
		data:{description:description},
		success:function(){
		}
	})
}


function delete_blank(node){
	node.parentNode.removeChild(node);
	var description=document.getElementById("blank_description").value;
	var option_value=document.getElementById("blank_value").value;
	total_score-=parseInt(option_value);
	$("#total_score").html("总分:"+total_score);
	$.ajax({
		url:"/OnlineTest/user/deleteBlank",
		type:"post",
		data:{description:description},
		success:function(){
		}
	})
}



function exam_confirm(){
	var exam_title=document.getElementById("exam_title").value;
	var exam_time=parseInt(document.getElementById("exam_time").value);
	var username=window.location.href.split("=")[1];
	$.ajax({
		url:"/OnlineTest/user/confirmExam",
		type:"post",
		data:{exam_title:exam_title,exam_time:exam_time,username:username},
		success:function(){
			temp_exam_name=exam_title;
			document.getElementById("set_exam_param").style.display='none';
			document.getElementById("fade").style.display='none';
			document.getElementById("create_test").onclick="";
			temp_exam_name=exam_title;
		}
	})
}


function exam_cancel(){
	document.getElementById("set_exam_param").style.display='none';
	document.getElementById("fade").style.display='none';
}

function submit_exam(){
	$.ajax({
		url:"/OnlineTest/user/submitExam",
		type:"post",
		data:{score:total_score,exam_title:temp_exam_name},
		success:function(){
			temp_exam_name=null;
			total_score=0;
			$("#total_score").html("总分:"+total_score);
			document.getElementById("create_test_div").style.display='none';
			document.getElementById("create_test").setAttribute("onclick", "create_test()");
			var node=document.getElementById("div3");
			node.innerHTML="";
		}
	})
}

function getInfo(){
	$.ajax({
		url:"/OnlineTest/user/initExamList_teacher",
		type:"post",
		data:{username:username},
		dataType:"json",
		success:function(result){
			var length=result.length;
			for(var i=0;i<result.length;i++)
				{
					display_exam_info(result[i].examName,result[i].score,result[i].time,result[i].examId,i);
					var examId=result[i].examId;
				}
		}
	})
}

function display_exam_info(name,score,time,examId,number){
	var dropdowns = document.getElementById("div3");
	var newDiv = document.createElement("div");
	newDiv.setAttribute("class","infoDiv");
	newDiv.setAttribute("id","exam"+number);
	//显示序号、分值和正确答案
	var info = document.createElement("p");
	info.innerHTML="试卷："+name+"&nbsp;&nbsp;"+"分值:"+score+"&nbsp;&nbsp;"+"时长："+time+"分钟";
	newDiv.appendChild(info);
    //添加修改按钮
    var connect2 = document.createElement("a");
    newDiv.appendChild(connect2);
    connect2.href="javascript:void(0)";
    connect2.innerText ="查看考试详情";
    connect2.setAttribute("onclick","show_statistic('"+examId+"')");
    dropdowns.appendChild(newDiv);
    //
    document.getElementById("get_exam_info").setAttribute("onclick", "hide_exam_info()");
}

function hide_exam_info(){
	var node=document.getElementById("div3");
	node.innerHTML="";
	document.getElementById("get_exam_info").setAttribute("onclick", "getInfo()");
}

function show_statistic(examId){
	window.open("/OnlineTest/pages/exam_statistic.jsp?username="+username+"&examId="+examId);
}