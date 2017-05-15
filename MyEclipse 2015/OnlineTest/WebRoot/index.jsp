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
	  <script src="js/index.js" type="text/javascript"></script>
	  <link rel="stylesheet" type="text/css" href="css/index.css" >
	  
  </head>
  
  <body>
  <div id="mainDiv" style="position:absolute;height:300px;width:360px;background-color :#FFFFCC;">
    <h1 style="text-align:center;">Welcome</h1> <br>
    <form>
		<table>
				<tr>
					<td>用户名：</td>
					<td>
						<input type="text" id="username">
				</td>
				<td>(hxf)</td>
				</tr>
				<tr>
					<td>密码：</td>
					<td>
						<input type="password" id="password"></td>
					<td>(1234)</td>
				</tr>
				<tr>
					<td>
						<input type="reset" value="重填"></td>
					<td>
						<button type="button" id = "login" >登录</button></td>
					<td>
						<button type="button"
						onclick="document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block'">注册</button></td>
				</tr>
			</table>	
		</form>
	</div>
		<div id="light" class="white_content"> 
    	<table>
				<tr>
					<td>用户名：</td>
					<td><input type="text" id="register_username"></td>
					<td><p id="Warning_name" style="display:none;">该用户名已存在</p></td>
				</tr>
				<tr>
					<td>密码：</td>
					<td><input type="password" id="register_password1"></td>
				</tr>
				<tr>
					<td>再次输入密码：</td>
					<td><input type="password" id="register_password2"></td>
					<td><p id="Warning_password" style="display:none;">两次输入密码不一致</p></td>
				</tr>
				<tr>
				<label>用户类型:</label>
			    <label>教师</label>
			    <input type="radio" value="teacher" name="registerType" checked="checked">
			    <label>学生</label>
			    <input type="radio" value="student" name="registerType">
				</tr>
				<tr>
					<td><button type="button" id = "register" >注册</button></td>
					<td><button type="button" id = "cancel" >取消</button></td>
				</tr>
			</table>	
		</form>
    	</div>
		<div id="fade" class="black_overlay"> </div>
  </body>
</html>
