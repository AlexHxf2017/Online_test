<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>My JSP 'paper.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	  <script src="js/jQuery3.2.js" type="text/javascript"></script>
	  <script src="js/exam_statistic.js" type="text/javascript"></script>
	  <link rel="stylesheet" type="text/css" href="css/paper.css" >
	  
	  <script type="text/javascript">
	  var username;
	  var examId;
	  var remain_time;//剩余时间
	  var if_answered=new Array();//用于标记每道题是否作答了
	  var answer_array=new Array();//用于保存考生每道题答案是否正确
	  var real_answer_array=new Array();//用来保存正确答案
	  var score_array=new Array();//用来保存分值数组
	  
	  window.onload=function(){
	  username = "<%=request.getParameter("username")%>";
	  examId = "<%=request.getParameter("examId")%>";
	  $.ajax({
		url:"/OnlineTest/user/initOptionInfo",
		type:"get",
		data:{examId:examId},
		dataType:"json",
		success:function(result){
			var length=result.length;
			for(var i=0;i<result.length;i++)
				{
				$.ajax({
				url:"/OnlineTest/user/OptionStatistic",
				type:"get",
				data:{examId:examId,username:username,description:result[i].option_description},
				dataType:"json",
				async: false,
				success:function(data){
						display_option(result[i].option_description,result[i].option_A,result[i].option_B,
							result[i].option_C,result[i].option_D,result[i].value,result[i].answer,data);
					}
				})	
				}
				var list=document.getElementsByTagName("a");
				for(var j=0;j<list.length;j++){list[j].setAttribute("onclick", "alert('无效');");}
			}
		})
		$.ajax({
		url:"/OnlineTest/user/initBlankInfo",
		type:"get",
		data:{examId:examId},
		dataType:"json",
		async: false,
		success:function(result){
			var length=result.length;
			for(var i=0;i<result.length;i++)
				{
					$.ajax({
					url:"/OnlineTest/user/BlankStatistic",
					type:"get",
					data:{examId:examId,username:username,description:result[i].description},
					dataType:"json",
					async: false,
					success:function(data){
						display_Blank(result[i].description,result[i].value,result[i].answer,data);
					}
				})
				}
				var list=document.getElementsByTagName("a");
				for(var j=0;j<list.length;j++){list[j].setAttribute("onclick", "alert('无效');");}
			}
		})
		$.ajax({
		url:"/OnlineTest/user/initexamInfo",
		type:"get",
		data:{examId:examId},
		success:function(result){
			document.getElementById("exam_name").innerText="考卷："+result.split(";")[0];
			document.getElementById("exam_score").innerText="总分："+result.split(";")[1];
			document.getElementById("exam_time").innerText="时长(分钟)："+result.split(";")[2];
			var list=document.getElementsByTagName("a");
			for(var j=0;j<list.length;j++){list[j].setAttribute("onclick", "alert('无效');");}
			}
		})
		$.ajax({
		url:"/OnlineTest/user/exam_statistic",
		type:"get",
		data:{examId:examId},
		success:function(data){
			var div=document.getElementById("show_info");
			 var input3 = document.createElement("p");
    		var str="";
    		for (var i=0;i<data.length;i++){
   		 	str+=data[i].name+":"+data[i].score+"分，耗时："+data[i].time+"s"+"<br>";
   			 }
   		 	input3.innerHTML="共计"+data.length+"个人回答了,分别是：<br>"+str;
   		 	div.appendChild(document.createElement("br"));
   		 	div.appendChild(document.createElement("br"));
   			div.appendChild(input3);
   			var list=document.getElementsByTagName("a");
			for(var j=0;j<list.length;j++){list[j].setAttribute("onclick", "alert('无效');");}
			}
		})
}
	  </script>
	  
  </head>
  
  <body>
  <div style="height:10%;overflow-y:scroll;" id="show_info">
  <p id="exam_name" style="float:left;"></p>
  <p id="exam_score" style="float:left;margin:1em 0px 1em 250px ;"></p>
  <p id="exam_time" style="float:left;margin:1em 0px 1em 250px ;"></p>
  <a href="javascript:void(0)" onclick="stop_exam()" style="float:left;margin:0px 0px 0px 250px ;">结束考试</a>
  </div>
  <div id="div_test" style="height:80%;overflow-y:scroll;"></div>
  <div style="height:10%;">
  <p  id="show_score"></p>
  </div>
  </body>
</html>
