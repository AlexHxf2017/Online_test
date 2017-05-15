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
	  <script src="js/teacher.js" type="text/javascript"></script>
	  <link rel="stylesheet" type="text/css" href="css/teacher.css" >
	  
	  
	  <script type="text/javascript">
	  var username = "<%=request.getParameter("username")%>";
	  window.onload=function(){
	  document.getElementById("welcome").innerHTML=username+"老师,你好";
	  }
	  </script>
  </head>
  
  <body onunload="unload();">
  <div id="div1" >
  	<font size="5" color="black">在线考试系统</font><br>
    <a id="create_test" href="javascript:void(0)" onclick="create_test()">创建考试</a><br>
    <div class="hide" id="create_test_div" style="display:none;">
    <a  id="add_option" href="javascript:void(0)" onclick="add_option()">添加选择题</a><br>
    <a  id="add_question" href="javascript:void(0)" onclick="add_blank()">添加填空题</a><br>
    <a  id="submit_exam" href="javascript:void(0)" onclick="submit_exam()">确认并上传试卷</a><br>
    </div>
    <a  href="javascript:void(0)" id="get_exam_info" onclick="getInfo()">查看考试情况</a><br>
   </div>
   <div id="div2">
   <p  id="welcome"></p><br>
   <p  id="total_score" >总分值：0分</p><br>
   </div>
   <div id="div3">
   </div>
   <div id="light" class="white_content"> 
    	<table>
				<tr>
					<td>题目描述：</td>
					<td><textarea cols="50" rows="10" id="option_description"></textarea><br></td>
				</tr>
				<tr>
					<td>选项A</td>
					<td><input type="text" id="A_description"></td>
				</tr>
				<tr>
					<td>选项B</td>
					<td><input type="text" id="B_description"></td>
				</tr>
				<tr>
					<td>选项C</td>
					<td><input type="text" id="C_description"></td>
				</tr>
				<tr>
					<td>选项D</td>
					<td><input type="text" id="D_description"></td>
				</tr>
				<tr><td>
					<label>正确答案:</label>
					</td>
					<td>
			    	<label>A</label>
			    	<input type="radio" value="A" name="anwser" checked="checked">
			    	<label>B</label>
			    	<input type="radio" value="B" name="anwser">
			    	<label>C</label>
			    	<input type="radio" value="C" name="anwser">
			    	<label>D</label>
			    	<input type="radio" value="D" name="anwser"></td>
				</tr>
				<tr>
					<td>分值</td>
					<td><input type="text" id="option_value"></td>
				</tr>
				<tr>
					<td><button type="button" id="confirm_button" onclick="add_option_confirm()">确定</button></td>
					<td><button type="button" onclick="add_option_cancel()" >取消</button></td>
				</tr>
			</table>	
    	</div>
    	
    	<div id="set_exam_param" class="white_content"> 
    	<table>
				<tr>
					<td>试卷题目：</td>
					<td><textarea cols="50" rows="10" id="exam_title"></textarea><br></td>
				</tr>
				<tr>
					<td>试卷时长(分钟)：</td>
					<td><input type="text" id="exam_time"></td>
				</tr>
				<tr>
					<td><button type="button" id="exam_confirm" onclick="exam_confirm()">确定</button></td>
					<td><button type="button" onclick="exam_cancel()" >取消</button></td>
				</tr>
			</table>	
    	</div>
    	
    	<div id="set_blank" class="white_content"> 
    	<table>
				<tr>
					<td>题目：</td>
					<td><textarea cols="50" rows="10" id="blank_description"></textarea><br></td>
				</tr>
				<tr>
					<td>参考答案：</td>
					<td><textarea cols="50" rows="10" id="blank_answer"></textarea><br></td>
				</tr>
				<tr>
					<td>分值：</td>
					<td><input type="text" id="blank_value"></td>
				</tr>
				<tr>
					<td><button type="button" id="blank_confirm" onclick="add_blank_confirm()">确定</button></td>
					<td><button type="button" onclick="add_blank_cancel()" >取消</button></td>
				</tr>
			</table>	
    	</div>
    	
		<div id="fade" class="black_overlay"> </div>
		
  </body>
</html>
