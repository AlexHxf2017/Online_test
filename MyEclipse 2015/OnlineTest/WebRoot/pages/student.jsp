<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	  <script src="js/jQuery3.2.js" type="text/javascript"></script>
	  <script src="js/student.js" type="text/javascript"></script>
	  <link rel="stylesheet" type="text/css" href="css/student.css" >
	  
	  <script type="text/javascript">
	  var username = "<%=request.getParameter("username")%>";
	  window.onload=function(){
	  
	  document.getElementById("welcome").innerHTML=username+"同学,你好";
	  document.getElementById("username").innerHTML=username;
	  getInfo();
	  }
	  </script>
  </head>
  
  <body onunload="unload();">
  <div id="div1" >
    <font size="5" color="black">在线考试系统</font></br>
   </div>
   <div id="div2">
   <p  id="welcome"></p><br>
   <div id="username" style="display:none;"></div><!-- 用来给js传值 -->
   </div>
   <div id="div3">
   		<div id="exam_list" style:"display:none;">
   		</div>
   </div>
  </body>
</html>
