

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


function getInfo()
{
	$.ajax({
		url:"/OnlineTest/user/initExamList",
		type:"get",
		dataType:"json",
		success:function(result){
			var length=result.length;
			for(var i=0;i<result.length;i++)
				{
					display_exam_info(result[i].examName,result[i].score,result[i].time,result[i].examId,i);
					var examId=result[i].examId;
					$.ajax({
						url:"/OnlineTest/user/if_exam_completed",
						type:"post",
						data:{examId:examId,username:username},
						async: false,
						success:function(data){
							if(data){
								var info = document.createElement("p");
								info.innerHTML="已做答，你的分数是："+data.split(";")[0]+"&nbsp;&nbsp;"+"耗时："+data.split(";")[1]+"s";
								var id="exam"+(i).toString();
								document.getElementById(id).appendChild(info);
								document.getElementById(id).getElementsByTagName("a")[0].innerText="查看";
								document.getElementById(id).getElementsByTagName("a")[0].setAttribute("onclick", "get_test_info('"+examId+"')");  
								}
						}
					})
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
    connect2.innerText ="参加考试";
    connect2.setAttribute("onclick","participate_test("+examId+")");
    dropdowns.appendChild(newDiv);
}

function participate_test(examId){
	window.open("/OnlineTest/pages/paper.jsp?username="+username+"&examId="+examId+"&type="+"test");
}
function get_test_info(examId){
	window.open("/OnlineTest/pages/paper.jsp?username="+username+"&examId="+examId+"&type="+"check");
}