window.onload = loadXMLDoc();
window.onload = getInfo();
var jsonData;
var model=0;

function Show_Hidden(trid){
	var dom=trid.parentNode.getElementsByTagName("div")[0];
	if(!dom){
	alert("error");}
    if(dom.style.display=="block"){
        dom.style.display='none';
    }
    else{
        dom.style.display='block';
    }
}

function show_projectList(trid){
	var dom=trid.parentNode.getElementsByClassName("infoDiv");
	for (var i=0;i<dom.length;i++)
		{
		if(dom[i].style.display=="block"){
	        dom[i].style.display='none';
	    }
	    else{
	        dom[i].style.display='block';
	    }
		}
}
function loadXMLDoc()
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
			var json = JSON.parse(xmlhttp.responseText);
			var j=1,ifExist=0;
			var projectArray=new Array();
			projectArray[0]=json[0].projectName;
			for(var i=0;json[i];i++)
				{
				if(i>0){
				for(var k=0;k<projectArray.length;k++)
					{
						if(projectArray[k]==json[i].projectName){ifExist=1;}
					}
				}
				if(ifExist==0){
					if(i>0){
					projectArray[j]=json[i].projectName;
					j++;
					}
					var dropdowns = document.getElementById("dropdownProject");
					var element1 = document.createElement("a");
			        element1.href="javascript:void(0)";
			        element1.innerText = json[i].projectName;
			        var txt="document.getElementById('project').innerHTML='"+json[i].projectName+"'";
			        element1.setAttribute("onclick", txt);
			        dropdowns.appendChild(element1);
					}
				else {ifExist=0;}
				}
			jsonData=json;
		}
	}
	xmlhttp.open("GET","/springmvc/user/getProject",true);
	xmlhttp.send();
}

function postXMLDoc(countTime,start,end)
{
	var xmlhttp;
	var date=getLocalDate();
	var projectName=document.getElementById("project").innerHTML;
	var description=document.getElementById("descriptionTxt").value;
	
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
		document.getElementById("myDiv").innerHTML = description;
		
	}
	xmlhttp.open("POST","/springmvc/user/postProject",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("projectName=" +projectName+"&description="+description+"&countTime="+countTime
			+"&startTime="+start+"&stopTime="+end+"&date="+date);
	loadJsonData(projectName);
}

function loadJsonData(){
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
			var json = JSON.parse(xmlhttp.responseText);
			jsonData=json;
			addInfo();
		}
	}
	xmlhttp.open("GET","/springmvc/user/getProject",true);
	xmlhttp.send();
}

function addInfo(){
	var i=0;
	for(i=0;jsonData[i];i++){;}
	i--;
	var newDiv = document.createElement("div");
	newDiv.setAttribute("class", "infoDiv");
	newDiv.setAttribute("style", "border:0;background-color: #dfe9f2;display:none;");
	//生成文本框并添加到新建的div中
	var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "dropdown");
    input.setAttribute("style", "height:40px;background-color: #dfe9f2;");
    input.setAttribute("value", json[i].description);
    input.style.border=0;
    newDiv.appendChild(input);
    //生成a连接并添加到新建的div的子div中
    var childDiv=document.createElement("div");
    childDiv.setAttribute("class", "dropdown");
    childDiv.setAttribute("style", "height:40px;float:left;");
    var connect = document.createElement("a");
    childDiv.appendChild(connect);
    newDiv.appendChild(childDiv);
    connect.href="javascript:void(0)";
    connect.innerText = json[i].projectName;
    createDiv(connect,childDiv);
    connect.setAttribute("onclick","Show_Hidden(this)");
    connect.setAttribute("class","dropbtn");
    //新建文本框
    var startInput= document.createElement("input");
    startInput.setAttribute("type", "text");
    startInput.setAttribute("class", "dropdown");
    startInput.setAttribute("style", "width:100px;height:40px;background-color: #dfe9f2;");
    startInput.setAttribute("value", json[i].startTime);
    startInput.style.border=0;
    newDiv.appendChild(startInput);
    var stopInput=  document.createElement("input");
    stopInput.setAttribute("type", "text");
    stopInput.setAttribute("class", "dropdown");
    stopInput.setAttribute("style", "width:100px;height:40px;background-color: #dfe9f2;");
    stopInput.setAttribute("value", json[i].stopTime);
    stopInput.style.border=0;
    newDiv.appendChild(stopInput);
    var countInput= document.createElement("input");
    countInput.setAttribute("type", "text");
    countInput.setAttribute("class", "dropdown");
    countInput.setAttribute("style", "width:100px;height:40px;background-color: #dfe9f2;");
    countInput.setAttribute("value", json[i].countTime);
    countInput.style.border=0;
    newDiv.appendChild(countInput);
    //把新div放入div3
    var string="projectList-"+json[i].projectName;
    var dropdowns=document.getElementById(string);
    var dom=dropdowns.getElementsByClassName("infoDiv");
	for (var i=0;i<dom.length;i++)
	{
        dom[i].style.display='none';
	}
    dropdowns.appendChild(newDiv);
}

window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    	var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
           dropdowns[i].style.display="none";
        }
    }
    if (!e.target.matches('.hide')) {
        var dropdowns2 = document.getElementsByClassName("hideDiv");
        for (var i = 0; i < dropdowns2.length; i++) {
           dropdowns2[i].style.display="none";
        }
    }
}

function createProject(dom){
	var projectName;
	projectName = prompt("project name");
	if(projectName)
		{
		var element1 = document.createElement("a");
        element1.href="javascript:void(0)";
        element1.innerText = projectName;
        dom.parentNode.appendChild(element1);
        document.getElementById("project").innerHTML = projectName;
		}
	return projectName;
} 

var count=1;
var t;
var startTime;
var stopTime;

function timedCount() 
{ 
	startTime=getLocalTime();
	var e = document.getElementById("startButton");
	e.innerHTML ="stop";
	e.onclick=function(){stopCount()};
	t=setInterval(function(){
	document.getElementById('timeTxt').value=
		 Math.floor(count/36000)+""+Math.floor((count%36000)/3600)+":"
		+Math.floor((count%3600)/600)+Math.floor((count%600)/60)+":"
		+Math.floor((count%60)/10)+Math.floor(count%10);
	count=count+1;},1000)
	
} 

function stopCount() 
{ 
clearInterval(t);
stopTime=getLocalTime();
document.getElementById('timeTxt').value="00:00:00";
var e = document.getElementById("startButton");
e.innerHTML = "start";
e.onclick=function(){timedCount()};
postXMLDoc(count,startTime,stopTime);
count=0;
startTime=null;
stopTime=null;
var element = document.getElementById("project");
element.innerText ="+Project";
} 

function getLocalTime()
{
	var time = new Date();
	   // 程序计时的月从0开始取值后+1
	var t =time.getHours() + ":"
	     + time.getMinutes() + ":" + time.getSeconds();
	return t;
}

function getLocalDate(){
	var time = new Date();
	   // 程序计时的月从0开始取值后+1
	var month = time.getMonth() + 1;
	var t = time.getFullYear() + "-" + month + "-"
	     + time.getDate() + " " ;
	return t;
}

function getInfo()
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
			var json = JSON.parse(xmlhttp.responseText);
			var j=1,ifExist=0;
			var projectArray=new Array();
			projectArray[0]=json[0].projectName;
			for(var i=0;json[i];i++)
			{
				if(i>0)
				{
					for(var k=0;k<projectArray.length;k++)
					{
						if(projectArray[k]==json[i].projectName){ifExist=1;}
					}
				}
				if(ifExist==0)
				{
					if(i>0){
						projectArray[j]=json[i].projectName;
						j++;
						}
					var dropdowns = document.getElementById("div3");
					var newDiv = document.createElement("div");
					newDiv.setAttribute("style","border:1px #c0c0c0 solid;");
					newDiv.setAttribute("id", "projectList-"+json[i].projectName);
			        //生成a连接（show detail）
			        var childDiv2=document.createElement("div");
			        childDiv2.setAttribute("class", "detail");
			        childDiv2.setAttribute("style", "height:40px;");
			        var connect2 = document.createElement("a");
			        childDiv2.appendChild(connect2);
			        newDiv.appendChild(childDiv2);
			        connect2.href="javascript:void(0)";
			        connect2.innerText ="detail";
			        connect2.setAttribute("class", "dropbtn");
			        connect2.setAttribute("onclick","show_projectList(this.parentNode)");
			      //生成a连接并添加到新建的div的子div中
					var childDiv=document.createElement("div");
			        childDiv.setAttribute("class", "dropdown");
			        childDiv.setAttribute("style", "height:40px;float:none;");
			        var connect = document.createElement("a");
			        childDiv.appendChild(connect);
			        newDiv.appendChild(childDiv);
			        connect.href="javascript:void(0)";
			        connect.innerText = json[i].projectName;
			        createDiv(connect,childDiv);
			        connect.setAttribute("class","dropbtn");
					dropdowns.appendChild(newDiv);
				}
				else{ifExist=0;}
			}
			for(var i=0;json[i];i++)
				{
				var newDiv = document.createElement("div");
				newDiv.setAttribute("class", "infoDiv");
				newDiv.setAttribute("style", "border:0;background-color: #dfe9f2;display:none;");
				//生成文本框并添加到新建的div中
				var input = document.createElement("input");
		        input.setAttribute("type", "text");
		        input.setAttribute("class", "dropdown");
		        input.setAttribute("style", "height:40px;background-color: #dfe9f2;");
		        input.setAttribute("value", json[i].description);
		        input.style.border=0;
		        newDiv.appendChild(input);
		        //生成a连接并添加到新建的div的子div中
		        var childDiv=document.createElement("div");
		        childDiv.setAttribute("class", "dropdown");
		        childDiv.setAttribute("style", "height:40px;float:left;");
		        var connect = document.createElement("a");
		        childDiv.appendChild(connect);
		        newDiv.appendChild(childDiv);
		        connect.href="javascript:void(0)";
		        connect.innerText = json[i].projectName;
		        createDiv(connect,childDiv);
		        connect.setAttribute("onclick","Show_Hidden(this)");
		        connect.setAttribute("class","dropbtn");
		        //新建文本框
		        var startInput= document.createElement("input");
		        startInput.setAttribute("type", "text");
		        startInput.setAttribute("class", "dropdown");
		        startInput.setAttribute("style", "width:100px;height:40px;background-color: #dfe9f2;");
		        startInput.setAttribute("value", json[i].startTime);
		        startInput.setAttribute("preValue","");
		        startInput.preValue=startInput.value;
		        startInput.onchange=function(){updateStartTime(this.value,this.preValue)};
		        startInput.style.border=0;
		        newDiv.appendChild(startInput);
		        var stopInput=  document.createElement("input");
		        stopInput.setAttribute("type", "text");
		        stopInput.setAttribute("class", "dropdown");
		        stopInput.setAttribute("style", "width:100px;height:40px;background-color: #dfe9f2;");
		        stopInput.setAttribute("value", json[i].stopTime);
		        stopInput.style.border=0;
		        newDiv.appendChild(stopInput);
		        var countInput= document.createElement("input");
		        countInput.setAttribute("type", "text");
		        countInput.setAttribute("class", "dropdown");
		        countInput.setAttribute("style", "width:100px;height:40px;background-color: #dfe9f2;");
		        countInput.setAttribute("value", json[i].countTime);
		        countInput.style.border=0;
		        newDiv.appendChild(countInput);
		        //把新div放入div3
		        var string="projectList-"+json[i].projectName;
		        var dropdowns=document.getElementById(string);
		        dropdowns.appendChild(newDiv);
				}
		}
	}
	xmlhttp.open("GET","/springmvc/user/getProject",true);
	xmlhttp.send();
}

function createDiv(dom,parentDom){
	var div=document.createElement("div");
	div.setAttribute("class", "dropdown-Content");
	div.setAttribute("style", "display:none;z-index:999;");
	parentDom.appendChild(div);
	var j=1,ifExist=0;
	var projectArray=new Array();
	projectArray[0]=jsonData[0].projectName;
	for(var i=0;jsonData[i];i++)
	{
		if(i>0){
			for(var k=0;k<projectArray.length;k++)
				{
					if(projectArray[k]==jsonData[i].projectName){ifExist=1;}
				}
			}
			if(ifExist==0){
				if(i>0){
				projectArray[j]=jsonData[i].projectName;
				j++;
				}
				var element1 = document.createElement("a");
			    element1.href="javascript:void(0)";
			    element1.innerText = jsonData[i].projectName;
			    element1.onclick=function(){
			    	dom.innerHTML=this.innerText;
			    	var string="projectList-" + this.innerText;
			        var dropdowns=document.getElementById(string);
			        var dom2=dropdowns.getElementsByClassName("infoDiv");
			    	for (var m=0;m<dom2.length;m++)
			    	{
			            dom2[m].style.display='none';
			    	}
			        dropdowns.appendChild(parentDom.parentNode);
			        parentDom.parentNode.style.display='none';
			        updateProjectName(dom.innerHTML,parentDom.parentNode.getElementsByTagName("input")[1].value);
			    };
			    div.appendChild(element1);
			    }
			else {ifExist=0;}
	}
	var element2 = document.createElement("a");
    element2.href="javascript:void(0)";
    element2.innerText = "create new project";
    element2.setAttribute("onclick", "createProject(this)");
    div.appendChild(element2);
}

function updateProjectName(projectName,identity)
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
			
		}
	}
	xmlhttp.open("POST","/springmvc/user/changeProjectValue",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("projectName=" +projectName+"&identity="+identity);
	loadJsonData();
}

function updateStartTime(start,identity)
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
			
		}
	}
	xmlhttp.open("POST","/springmvc/user/changeProjectValue",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("startTime=" +start+"&identity="+identity);
	loadJsonData();
}


function setTxtTime(dom){
	var txt1=dom.parentNode.getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("input")[0];
	txt1.value=getLocalTime();
	var txt1=dom.parentNode.getElementsByTagName("div")[0].getElementsByTagName("div")[1].getElementsByTagName("input")[0];
	txt1.value=getLocalTime();
}

function changeModel(){
	model=1;
	var e = document.getElementById("startButton");
	e.innerHTML ="confirm";
	e.onclick=function(){confirmChange()};
}

function confirmChange(){
	var start = document.getElementById("startTimeTxt").value;
	var end = document.getElementById("stopTimeTxt").value;
	var countTime=stringToNumber(end)-stringToNumber(start);
	if(countTime>0){
	postXMLDoc(countTime,start,end);
	model=0;
	var e = document.getElementById("startButton");
	e.innerHTML ="start";
	e.onclick=function(){timedCount()};
	}
	else{
		alert("请不要穿越！");
		var e = document.getElementById("startButton");
		e.innerHTML ="start";
		e.onclick=function(){timedCount()};
	}
}

function stringToNumber(string){
    var str=string;
    var array= string.split(":");
    for(var i=0;i<2;i++)
    {
        if(i>0){array[i]=array[i-1]+string.indexOf(":");}
        else if(i==0){array[i]=string.indexOf(":");}
        string=string.substring(array[i]+1);
    }
    var hour=parseInt(str.substring(0,array[0]));
    var minute=parseInt(str.substring(array[0]+1,array[1]+1));
    var second=parseInt(str.substring(array[1]+2,str.length));
    return (hour*3600+minute*60+second);
}

function statistic(id1,id2){
	var date1=document.getElementById(id1).value;
	var date2=document.getElementById(id2).value;
	date1=date1.substring(0, 4)+"-"+(parseInt(date1.substring(5, 7))+"")
		  +"-"+(parseInt(date1.substring(8, 10))+"");
	date2=date2.substring(0, 4)+"-"+(parseInt(date2.substring(5, 7))+"")
	  +"-"+(parseInt(date2.substring(8, 10))+"");
	postStatistic(date1,date2);
}
function postStatistic(date1,date2)
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
			var json = JSON.parse(xmlhttp.responseText);
			var sum=0;
			var j=1,k=0,ifExist=0;
			var projectArray=new Array();
			projectArray[0]=json[0].projectName;
			for(var i=0;json[i];i++)
				{
				if(i>0){
				for(k=0;k<projectArray.length;k++)
					{
						if(projectArray[k]==json[i].projectName){ifExist=1;}
					}
				}
				if(ifExist==0){
					if(i>0){
					projectArray[j]=json[i].projectName;
					j++;
					}
					}
				else {ifExist=0;}
				sum+=json[i].countTime;
				}
			alert("k="+k+"countTime="+sum);
		}
	}
	xmlhttp.open("POST","/springmvc/user/postStatistic",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("date1=" +date1+"&date2="+date2);
}