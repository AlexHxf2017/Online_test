package model;

import java.io.IOException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;






import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import dao.UserDao;
import dao.ProjectDao;
import entity.ProjectData;


@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserDao userDao;
	@Autowired
	ProjectDao projectDao;
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public String register(
		@RequestParam("userName") String username,
		@RequestParam("password") String password,
		ModelMap modelmap
	){
		if(userDao.getLogInfo(username)!= null && password.equals(userDao.getLogInfo(username)))
			{	
				modelmap.addAttribute("userName", username);
				modelmap.addAttribute("password", password);
				return "success";
			}
		else
			return "error";
	}
	
	@RequestMapping(value = "/getProject", method = RequestMethod.GET)
	@ResponseBody
	public List<ProjectData> getProject(){
		List<ProjectData> list=new ArrayList<ProjectData>();
		list=projectDao.getProjectsNumber();
		return list;
	}	
	
	@RequestMapping(value = "/postProject", method = RequestMethod.POST)
	@ResponseBody
	public void postProject(
			@RequestParam(value="projectName",required=false) String projectName,
			@RequestParam("description") String description,
			@RequestParam("countTime") int countTime,
			@RequestParam("startTime") String startTime,
			@RequestParam("stopTime") String stopTime,
			@RequestParam("date") String date
			)throws ServletException, IOException{
		ProjectData user=new ProjectData();
		user.setCountTime(countTime);
		user.setDescription(description);
		user.setProjectName(projectName);
		user.setStartTime(startTime);
		user.setStopTime(stopTime);
		user.setDate(date);
		projectDao.savel(user);
	}
	
	@RequestMapping(value = "/changeProjectValue", method = RequestMethod.POST)
	@ResponseBody
	public void changeProjectValue(
			@RequestParam("identity") String identity,
			@RequestParam(value="projectName",required=false) String projectName,
			@RequestParam(value="description",required=false) String description,
			@RequestParam(value="startTime",required=false) String startTime,
			@RequestParam(value="stopTime",required=false) String stopTime,
			@RequestParam(value="date",required=false) String date
			)throws ServletException, IOException{
		ProjectData user=new ProjectData();
		user=projectDao.getProjectByIndentity(identity);
		projectDao.deleteProjectByIndentity(identity);
		if(description != null){user.setDescription(description);}
		if(projectName != null){user.setProjectName(projectName);}
		if(startTime != null){user.setStartTime(startTime);}
		if(stopTime != null){user.setStopTime(stopTime);}
		if(date != null){user.setDate(date);}
		projectDao.savel(user);
	}
	
	@RequestMapping(value = "/postStatistic", method = RequestMethod.POST)
	@ResponseBody
	public List<ProjectData> postStatistic(
			@RequestParam("date1") String date1,
			@RequestParam("date2") String date2
			)throws ServletException, IOException{
	List<ProjectData> list=new ArrayList<ProjectData>();
	Date date_num1,date_num2;
	date_num1 = stingToDate(date1);
	date_num2 = stingToDate(date2);
	if(date_num1.after(date_num2)){return null;}
	else
	{
		for(int i=0;!date_num2.before(date_num1);i++)
		{
			List<ProjectData> list2=new ArrayList<ProjectData>();
			list2=projectDao.getProjectsByDate(date1);
			list.addAll(list2);
			Calendar cal=Calendar.getInstance();
			 cal.set(Calendar.YEAR, date_num1.getYear()+1900);
			 cal.set(Calendar.MONTH, date_num1.getMonth());
			 cal.set(Calendar.DAY_OF_MONTH, date_num1.getDate());
			 cal.add(Calendar.DATE,1);
			 date_num1=cal.getTime();
			 date1=(date_num1.getYear()+1900) + "-" + (date_num1.getMonth()+1) + "-"+ date_num1.getDate() + " " ;
			 SimpleDateFormat df1=new SimpleDateFormat("yyyy-MM-dd");
			 System.out.println(df1.format(date_num1));
			 System.out.println(df1.format(date_num2));
			 System.out.println(date_num2.before(date_num1));
			 System.out.println(date_num2.after(date_num1));
			 System.out.println(date_num2.equals(date_num1));
		}
		return list;
	}
	}
	
	public Date stingToDate(String str){
		    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-M-d");  
		    Date date = null;
			try {
				date = sdf.parse(str);
			} catch (ParseException e) {
				e.printStackTrace();
			}  		  
		return date;
	}
}
