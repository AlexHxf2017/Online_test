<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>Dynarch Calendar -- Single calendar for multiple fields</title>
    <script src="js/jscal2.js"></script>
    <script src="js/en.js"></script>
    <script src="js/script.js"></script>
    <link rel="stylesheet" type="text/css" href="css/jscal2.css" >
    <link rel="stylesheet" type="text/css" href="css/border-radius.css" >
    <link rel="stylesheet" type="text/css" href="css/steel.css" >
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>

    <input size="30" id="f_date1" /><button id="f_btn1">请选择起始日期</button>
    <input size="30" id="f_date2" /><button id="f_btn2">请选择截止</button>
    <button onclick="statistic('f_date1','f_date2')">提交</button>
    
    <script type="text/javascript">

      var cal = Calendar.setup({
          onSelect: function(cal) { cal.hide() },
          showTime: true
      });
      cal.manageFields("f_btn1", "f_date1", "%Y-%m-%d");
      cal.manageFields("f_btn2", "f_date2", "%Y-%m-%d");
      </script>
  </body>
</html>
