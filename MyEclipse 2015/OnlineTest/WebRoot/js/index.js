$(function(){
		$("#login").click(function(){
			document.getElementById("login").disabled=true;
			var login = '<%=request.getSession().getAttribute("user")%>';
			var username = $("#username").val();
			var password = $("#password").val();
			$.ajax({
					url:"/OnlineTest/user/login",
					type:"post",
					data:{username:username, password:password},
					success:function(data){
						if(data == "student"){
							window.open("/OnlineTest/pages/student.jsp?username="+username);
						}
						else if(data == "teacher"){
							window.open("/OnlineTest/pages/teacher.jsp?username="+username);
						}
						else if(data == "logined"){
							alert("该用户已经登录");
						}
						else if(data == "notExit"){
							alert("该用户不存在");
						}
						else{
							alert("用户名或密码错误");
						}
					}
			})
			document.getElementById("login").disabled=false;
		})
		
	$("#register_username").change(function(){
		var username = $("#register_username").val();
		$.ajax({
			url:"/OnlineTest/user/registerWarning",
			type:"post",
			data:{username:username},
			success:function(result){
				if(result==false){
					$("#Warning_name").css('display','block');
				}
				else if(result==true){
					$("#Warning_name").css('display','none');
				}
			}
		})
	})
	
	$("#register_password2").change(function(){
		var password1 = $("#register_password1").val();
		var password2 = $("#register_password2").val();
		if(password1 == password2){
			$("#Warning_password").css('display','none');
		}
		else if(password1 != password2){
			$("#Warning_password").css('display','block');
		}
			
	})
	
	$("#register").click(function(){
		document.getElementById("register").disabled=true;
		var username = $("#register_username").val();
		var password = $("#register_password1").val();
		var radio=document.getElementsByName("registerType");
		for(var i=0;i<radio.length;i++){
			if(radio[i].checked==true){
			value=radio[i].value;
			break;
			}
		}
		if(document.getElementById("Warning_password").style.display=="none"
			&&document.getElementById("Warning_name").style.display=="none"
			&&username!=""&&password !=""){
			$.ajax({
				url:"/OnlineTest/user/register",
				type:"post",
				data:{username:username,password:password,value:value},
				success:function(){
					if(value=="teacher"){
						window.open("/OnlineTest/pages/teacher.jsp?username="+username);
					}
					else if(value=="student"){
						window.open("/OnlineTest/pages/student.jsp?username="+username);
					}
					document.getElementById("register").disabled=false;
					document.getElementById("register_username").value="";
					document.getElementById("register_password1").value="";
					document.getElementById("register_password2").value="";
					document.getElementById("Warning_password").style.display="none";
					document.getElementById("Warning_name").style.display="none";
					$("#light").css('display','none');
					$("#fade").css('display', 'none');
				}
			})
		}
		else{
			alert("请输入正确的用户名和密码");
		}
	})
	
	$("#cancel").click(function(){
		document.getElementById("register_username").value="";
		document.getElementById("register_password1").value="";
		document.getElementById("register_password2").value="";
		document.getElementById("Warning_password").style.display="none";
		document.getElementById("Warning_name").style.display="none";
		$("#light").css('display','none');
		$("#fade").css('display', 'none');
	})
})

window.onload = function() { 
// 获取浏览器窗口 
var windowScreen = document.documentElement; 
// 获取main的div元素 
var main_div = document.getElementById("mainDiv"); 
// 通过窗口宽高和div宽高计算位置 
var main_left = (windowScreen.clientWidth - main_div.clientWidth)/2 + "px"; 
var main_top = (windowScreen.clientHeight - main_div.clientHeight)/4 + "px"; 
// 位置赋值 
main_div.style.left = main_left; 
main_div.style.top = main_top; 

} 