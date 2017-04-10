<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'success.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<script src="js/jscal2.js"></script>
    <script src="js/en.js"></script>
    <script src="js/script.js"></script>
    <link rel="stylesheet" type="text/css" href="css/jscal2.css" >
    <link rel="stylesheet" type="text/css" href="css/border-radius.css" >
    <link rel="stylesheet" type="text/css" href="css/steel.css" >
	<link rel="stylesheet" href="css/style.css" >

  </head>
  
  <body>
    <div id="div1" >
    <font size="8" color="white">toggl</font></br>
    <a href="Statistic.jsp">统计</a>
    </div>
    
    <div id="div2">
    <font size=2px>${userName},你好</font><br>
    
    <input type="text" id="descriptionTxt" name="key" value="what are you working on" 
    onFocus="if(value==defaultValue){value='';this.style.color='#000'}" 
    onBlur="if(!value){value=defaultValue;this.style.color='#999'}" 
    style="color:#999999; width:202px;height:40px;border:1px red solid;
    background-color:#80ff80;float:left;">
    		
    <div class="dropdown">
    <a  id="project" href="javascript:void(0)" class="dropbtn" onclick="Show_Hidden(this)">+Project</a>
    <div class="dropdown-Content" id="dropdownProject" style="display:none;z-index:999;">
    	<a href="javascript:void(0)" onclick="createProject(this)" >create new project </a>
    </div>
    </div>
    
    <div style="width:300px;float:left;">
    <input type="text" id="timeTxt" value="00:00:00" class="hide"
    		onclick="Show_Hidden(this);setTxtTime(this)" 
    		style="color:#999999;width:202px;height:40px;border:1px red solid;
    		background-color:#80ff80;position:relative;left:50px;"> 
    <div class="hideDiv" style="display:none;height:111px;position:relative;z-index:999;
    border:solid 1px #999999;background-color:white;">
    <div style="width:50%;height:70px;float:left;">
    <p class="hide" style="text-align:center;font-size:15px;color:#808080;">start</p>
    <input class="hide" id="startTimeTxt" type="text" value="" onchange="changeModel()" 
    style="width:120px;color:#999999;border:none;text-align:center;"> 
    </div>
    <div style="width:50%;height:70px;float:left;">
    <p class="hide" style="text-align:center;font-size:15px;color:#808080;">stop</p>
    <input class="hide" id="stopTimeTxt" type="text" value="" onchange="changeModel()" 
    style="width:120px;color:#999999;border:none;text-align:center;">
    </div>
    <!-- <div class="hide" style="border-top:solid 1px #999999;background-color:white;overflow-y:auto;
    	 width:298px;height:129px;">
    wqerr<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>
    wqeqwe<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>wqerr<br>
    </div> -->
    <div class="hide" style="border-top:solid 1px #999999;background-color:white;
    	 width:298px;height:129px;">
    	 <button id="f_btn1" style="width:100%;height:20px;">点击选择时间</button><br />
    	 <input size="30" id="f_date1" class="hide" style="width:100%;height:20px;
    	 text-align:center;" onchange="changeModel()">
    </div>
    </div>
    </div>
    
    <div style="border:1px red solid;float:left;margin:0px 5px 0px 5px;text-align: center;height:40px;">
    <a id="startButton" href="javascript:void(0)" onClick="timedCount()" 
    	style="text-decoration:none;font-size:20px;color:black;" >start</a>
    </div>
    </div>
    <div id="div3" >
    </div>

    <script type="text/javascript">

      var cal = Calendar.setup({
          onSelect: function(cal) { cal.hide() },
          showTime: true
      });
      cal.manageFields("f_btn1", "f_date1", "%Y-%m-%d");//%I:%M %p

    </script>
  </body>
</html>
