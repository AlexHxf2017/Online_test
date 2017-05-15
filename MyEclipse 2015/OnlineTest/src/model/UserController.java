package model;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import json.Blank_statistic;
import json.ExamInfo;
import json.Exam_statistic;
import json.Option_statistic;
import json.RealBlank;
import json.RealOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import dao.BlankDao;
import dao.ExamsDao;
import dao.OptionsDao;
import dao.PaperInfoDao;
import dao.UserDao;
import dao.PaperDao;
import entity.Blanks;
import entity.Exams;
import entity.Options;
import entity.PaperInfo;
import entity.Papers;
import entity.User;

@Controller
@RequestMapping("/user")
public class UserController {
	
	public static Map<HttpSession,String> loginUser= new HashMap<HttpSession, String>();
	
	@Autowired
	UserDao userDao;
	@Autowired
	PaperDao paperDao;
	@Autowired
	OptionsDao optionDao;
	@Autowired
	ExamsDao examDao;
	@Autowired
	BlankDao blankDao;
	@Autowired
	PaperInfoDao paperInfoDao;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	@ResponseBody
	public String login(
		@RequestParam("username") String username,
		@RequestParam("password") String password,
		HttpServletRequest request
	){
		boolean ifExit=false;
		for(Map.Entry<HttpSession,String> entry : loginUser.entrySet()){
			
			if(entry.getValue().equals(request.getSession().getAttribute("user"))){
				ifExit=true;
				return "logined";
			}
		}
		if(ifExit==false){
			request.getSession().setAttribute("user",username);
			loginUser.put(request.getSession(),(String) request.getSession().getAttribute("user"));
			if(!userDao.IfUserExit(username)){
				loginUser.remove(request.getSession());
				return "notExit";
			}
			else if(userDao.IfUserExit(username) && password.equals(userDao.getUserFromName(username).getPassword()))
			{	
				if(userDao.getUserFromName(username).isJurisdiction()==true){
				return "teacher";
				}
				else{return "student";}
			}
			else{
				loginUser.remove(request.getSession());
				return "error";
			}
		}
		return "error";
	}
	
	@RequestMapping(value = "/deleteSession", method = RequestMethod.POST)
	@ResponseBody
	public void deleteSession(HttpServletRequest request){
		loginUser.remove(request.getSession());
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	@ResponseBody
	public void register(
			@RequestParam("username") String username,
			@RequestParam("password") String password,
			@RequestParam("value") String type,
			ModelMap modelmap
			){
		User user = new User();
		user.setPassword(password);
		user.setUserName(username);
		if(type.equals("teacher")){user.setJurisdiction(true);}
		else{user.setJurisdiction(false);}
		userDao.savel(user);	
	}
	
	@RequestMapping(value = "/registerWarning", method = RequestMethod.POST)
	@ResponseBody
	public boolean registerWarning(
			@RequestParam("username") String username,
			ModelMap modelmap
			){
		if(userDao.IfUserExit(username)){
			return false;
		}
		return true;
	}
	
	@RequestMapping(value = "/addOption", method = RequestMethod.POST)
	@ResponseBody
	public String addOption(
			@RequestParam("option_description") String option_description,
			@RequestParam("option_A") String option_A,
			@RequestParam("option_B") String option_B,
			@RequestParam("option_C") String option_C,
			@RequestParam("option_D") String option_D,
			@RequestParam("option_value") int option_value,
			@RequestParam("username") String username,
			@RequestParam("answer") String answer,
			@RequestParam("exam_title") String exam_title,
			ModelMap modelmap
			){
		if(!optionDao.IfOptionExit(option_description)){
			Options option=new Options();
			option.setOption_description(option_description);
			option.setOption_A(option_A);
			option.setOption_B(option_B);
			option.setOption_C(option_C);
			option.setOption_D(option_D);
			option.setValue(option_value);
			option.setUser(userDao.getUserFromName(username));
			option.setExam(examDao.getExamFromDescription(exam_title));
			if(answer.equals("A")){option.setAnswer(1);}
			else if(answer.equals("B")){option.setAnswer(2);}
			else if(answer.equals("C")){option.setAnswer(3);}
			else if(answer.equals("D")){option.setAnswer(4);}
			optionDao.savel(option);
			return "success";
		}
		else{return "error";}
	}
	
	@RequestMapping(value = "/addBlank", method = RequestMethod.POST)
	@ResponseBody
	public String addBlank(
			@RequestParam("blank_description") String blank_description,
			@RequestParam("blank_answer") String blank_answer,
			@RequestParam("blank_value") int blank_value,
			@RequestParam("username") String username,
			@RequestParam("exam_title") String exam_title,
			ModelMap modelmap
			){
		if(!blankDao.IfBlankExit(blank_description)){
			Blanks blank=new Blanks();
			blank.setAnswer(blank_answer);
			blank.setDescription(blank_description);
			blank.setValue(blank_value);
			blank.setUser(userDao.getUserFromName(username));
			blank.setExam(examDao.getExamFromDescription(exam_title));
			blankDao.savel(blank);
			return "success";
		}
		else{return "error";}
	}
	
	@RequestMapping(value = "/reviseOption", method = RequestMethod.POST)
	@ResponseBody
	public void reviseOption(
			@RequestParam("old_description") String old_description,
			@RequestParam("option_description") String option_description,
			@RequestParam("option_A") String option_A,
			@RequestParam("option_B") String option_B,
			@RequestParam("option_C") String option_C,
			@RequestParam("option_D") String option_D,
			@RequestParam("option_value") int option_value,
			@RequestParam("username") String username,
			@RequestParam("answer") String answer,
			ModelMap modelmap
			){
		Options option=optionDao.getOptionFromDescription(old_description);
		option.setOption_description(option_description);
		option.setOption_A(option_A);
		option.setOption_B(option_B);
		option.setOption_C(option_C);
		option.setOption_D(option_D);
		option.setValue(option_value);
		option.setUser(userDao.getUserFromName(username));
		if(answer.equals("A")){option.setAnswer(1);}
		else if(answer.equals("B")){option.setAnswer(2);}
		else if(answer.equals("C")){option.setAnswer(3);}
		else if(answer.equals("D")){option.setAnswer(4);}
		optionDao.revise(option);
	}
	
	@RequestMapping(value = "/reviseBlank", method = RequestMethod.POST)
	@ResponseBody
	public void reviseBlank(
			@RequestParam("old_description") String old_description,
			@RequestParam("blank_description") String blank_description,
			@RequestParam("blank_answer") String blank_answer,
			@RequestParam("blank_value") int blank_value,
			@RequestParam("username") String username,
			@RequestParam("exam_title") String exam_title,
			ModelMap modelmap
			){
		Blanks blank=blankDao.getBlankFromDescription(old_description);
		blank.setAnswer(blank_answer);
		blank.setDescription(blank_description);
		blank.setValue(blank_value);
		blank.setUser(userDao.getUserFromName(username));
		blankDao.revise(blank);
	}
	
	@RequestMapping(value = "/deleteOption", method = RequestMethod.POST)
	@ResponseBody
	public void deleteOption(
			@RequestParam("description") String description){
		Options option=optionDao.getOptionFromDescription(description);
		optionDao.delete(option);
	}
	
	@RequestMapping(value = "/deleteBlank", method = RequestMethod.POST)
	@ResponseBody
	public void deleteBlank(
			@RequestParam("description") String description){
		Blanks blank=blankDao.getBlankFromDescription(description);
		optionDao.delete(blank);
	}
	
	@RequestMapping(value = "/confirmExam", method = RequestMethod.POST)
	@ResponseBody
	public void submitExam(
			@RequestParam("exam_title") String exam_title,
			@RequestParam("exam_time") int exam_time,
			@RequestParam("username") String username,
			ModelMap modelmap
			){
		Exams exam=new Exams();
		exam.setTime(exam_time);
		exam.setName(exam_title);
		exam.setUser(userDao.getUserFromName(username));
		examDao.savel(exam);
	}
	
	@RequestMapping(value = "/submitExam", method = RequestMethod.POST)
	@ResponseBody
	public void confirmExam(
			@RequestParam("exam_title") String exam_title,
			@RequestParam("score") int score,
			ModelMap modelmap
			){
		Exams exam=examDao.getExamFromDescription(exam_title);
		exam.setScore(score);
		examDao.revise(exam);
	}
	
	@RequestMapping(value = "/initExamList", method = RequestMethod.GET)
	@ResponseBody
	public List<ExamInfo> initExamList(){
		List<Exams> list=new ArrayList<Exams>();
		list=examDao.getExamList();
		List<ExamInfo> result=new ArrayList<ExamInfo>();
		for (Exams exam:list){
			ExamInfo temp = new ExamInfo(exam);
			result.add(temp);
		}
		return result;
	}	
	
	@RequestMapping(value = "/initExamList_teacher", method = RequestMethod.POST)
	@ResponseBody
	public List<ExamInfo> initExamList_teacher(
			@RequestParam("username") String username
			){
		List<Exams> list=new ArrayList<Exams>();
		list=examDao.getExamListFromUsername(username);
		List<ExamInfo> result=new ArrayList<ExamInfo>();
		for (Exams exam:list){
			ExamInfo temp = new ExamInfo(exam);
			result.add(temp);
		}
		return result;
	}
	
	@RequestMapping(value = "/initOptionInfo", method = RequestMethod.GET)
	@ResponseBody
	public List<RealOption> initOptionInfo(
			@RequestParam("examId") int id
			){
		List<Options> list=new ArrayList<Options>();
		list=examDao.getOptionListFromId(id);
		List<RealOption> result = new ArrayList<RealOption>();
		for(Options option:list){
			RealOption temp = new RealOption(option);
			result.add(temp);
		}
		return result;
	}	
	
	@RequestMapping(value = "/initOptionInfo_check", method = RequestMethod.GET)
	@ResponseBody
	public List<RealOption> initOptionInfo_check(
			@RequestParam("examId") int id,
			@RequestParam("username") String username
			){
		List<Options> list=new ArrayList<Options>();
		list=examDao.getOptionListFromId(id);
		List<RealOption> result = new ArrayList<RealOption>();
		for(Options option:list){
			RealOption temp = new RealOption(option);
			int option_id=option.getId();
			List<Papers> list2 = paperDao.getPaperFromUserId(userDao.getUserFromName(username).getId());
			for(Papers paper:list2){
				if(paper.getOption()!=null){
					if(paper.getExam().getId()==id && paper.getUser().getUserName().equals(username) &&
							paper.getOption().getId()==option_id){
						temp.setAnswer(paper.getOption_choice());
						System.out.println(paper.getOption_choice()+paper.getOption().getOption_description());
					}
				}
			}
			result.add(temp);
		}
		return result;
	}	
	
	@RequestMapping(value = "/OptionStatistic", method = RequestMethod.GET)
	@ResponseBody
	public List<Option_statistic> OptionStatistic(
			@RequestParam("examId") int id,
			@RequestParam("username") String username,
			@RequestParam("description") String description
			){
		List<Option_statistic> result = new ArrayList<Option_statistic>();
		List<Papers> list2 = paperDao.getPaperFromOptionDescription(description);
		for(Papers paper:list2){
				if(paper.getOption().getOption_description().equals(description)){
					Option_statistic temp=new Option_statistic(paper.getOption().getId(),
							paper.getUser().getUserName(), paper.getOption_choice());
					result.add(temp);
				}
		}
		return result;
	}	
	
	@RequestMapping(value = "/BlankStatistic", method = RequestMethod.GET)
	@ResponseBody
	public List<Blank_statistic> BlankStatistic(
			@RequestParam("examId") int id,
			@RequestParam("username") String username,
			@RequestParam("description") String description
			){
		List<Blank_statistic> result = new ArrayList<Blank_statistic>();
		List<Papers> list2 = paperDao.getPaperFromBlankDescription(description);
		for(Papers paper:list2){
				if(paper.getBlank().getDescription().equals(description)){
					Blank_statistic temp=new Blank_statistic(paper.getBlank().getId(),
							paper.getUser().getUserName(), paper.getBlank_description());
					result.add(temp);
				}
		}
		return result;
	}	
	
	@RequestMapping(value = "/exam_statistic", method = RequestMethod.GET)
	@ResponseBody
	public List<Exam_statistic> exam_statistic(
			@RequestParam("examId") int id
			){
		List<Exam_statistic> result = new ArrayList<Exam_statistic>();
		List<PaperInfo> list2 = paperInfoDao.getPaperFromExamId(id);
		for(PaperInfo paper:list2){
			Exam_statistic temp=new Exam_statistic(paper.getId(),
			paper.getUser().getUserName(), paper.getScore(),paper.getTime());
			result.add(temp);	
		}
		return result;
	}
	
	@RequestMapping(value = "/initBlankInfo", method = RequestMethod.GET)
	@ResponseBody
	public List<RealBlank> initBlankInfo(
			@RequestParam("examId") int id
			){
		List<Blanks> list=new ArrayList<Blanks>();
		list=examDao.getBlankListFromId(id);
		List<RealBlank> result = new ArrayList<RealBlank>();
		for(Blanks blank:list){
			RealBlank temp = new RealBlank(blank);
			result.add(temp);
		}
		return result;
	}	
	
	@RequestMapping(value = "/initBlankInfo_check", method = RequestMethod.GET)
	@ResponseBody
	public List<RealBlank> initBlankInfo_check(
			@RequestParam("examId") int id,
			@RequestParam("username") String username
			){
		List<Blanks> list=new ArrayList<Blanks>();
		list=examDao.getBlankListFromId(id);
		List<RealBlank> result = new ArrayList<RealBlank>();
		for(Blanks blank:list){
			RealBlank temp = new RealBlank(blank);
			int blank_id=blank.getId();
			List<Papers> list2 = paperDao.getPaperFromUserId(userDao.getUserFromName(username).getId());
			for(Papers paper:list2){
				if(paper.getBlank()!=null){
					if(paper.getExam().getId()==id && paper.getUser().getUserName().equals(username) &&
							paper.getBlank().getId()==blank_id){
						temp.setAnswer(paper.getBlank().getAnswer());
						System.out.println(paper.getBlank().getAnswer());
					}
				}
			}
			result.add(temp);
		}
		return result;
	}	
	
	@RequestMapping(value = "/initexamInfo", method = RequestMethod.GET)
	@ResponseBody
	public String initexamInfo(
			@RequestParam("examId") int id
			){
		
		return examDao.getExamFromId(id).getName()+";"+examDao.getExamFromId(id).getScore()
				+";"+examDao.getExamFromId(id).getTime();
	}
	
	@RequestMapping(value = "/submit_paper_option", method = RequestMethod.POST)
	@ResponseBody
	public int submit_paper_option(
			@RequestParam("username") String username,
			@RequestParam("examId") int examId,
			@RequestParam("description") String description,
			@RequestParam("answer") String answer,
			ModelMap modelmap
			){
		Papers paper=new Papers();
		paper.setExam(examDao.getExamFromId(examId));
		paper.setUser(userDao.getUserFromName(username));
		paper.setOption(optionDao.getOptionFromDescription(description));
		if(answer.equals("A")){paper.setOption_choice(1);}
		else if(answer.equals("B")){paper.setOption_choice(2);}
		else if(answer.equals("C")){paper.setOption_choice(3);}
		else if(answer.equals("D")){paper.setOption_choice(4);}
		paperDao.savel(paper);
		return paper.getId();
	}
	
	@RequestMapping(value = "/submit_paper_blank", method = RequestMethod.POST)
	@ResponseBody
	public int submit_paper_blank(
			@RequestParam("username") String username,
			@RequestParam("examId") int examId,
			@RequestParam("description") String description,
			@RequestParam("answer") String answer,
			ModelMap modelmap
			){
		Papers paper=new Papers();
		paper.setExam(examDao.getExamFromId(examId));
		paper.setUser(userDao.getUserFromName(username));
		paper.setBlank(blankDao.getBlankFromDescription(description));
		paper.setBlank_description(answer);
		paperDao.savel(paper);
		return paper.getId();
	}
	
	@RequestMapping(value = "/update_paper_option", method = RequestMethod.POST)
	@ResponseBody
	public void update_paper_option(
			@RequestParam("paper_id") int paper_id,
			@RequestParam("answer") String answer,
			ModelMap modelmap
			){
		paperDao.reviseOption(paper_id, answer);
	}
	
	@RequestMapping(value = "/update_paper_blank", method = RequestMethod.POST)
	@ResponseBody
	public void update_paper_blank(
			@RequestParam("paper_id") int paper_id,
			@RequestParam("answer") String answer,
			ModelMap modelmap
			){
		paperDao.reviseBlank(paper_id, answer);
	}
	
	@RequestMapping(value = "/finish_exam", method = RequestMethod.POST)
	@ResponseBody
	public void finish_exam(
			@RequestParam("username") String username,
			@RequestParam("examId") int examId,
			@RequestParam("score") int score,
			@RequestParam("time") int time,
			ModelMap modelmap
			){
		PaperInfo paper=new PaperInfo();
		paper.setExam(examDao.getExamFromId(examId));;
		paper.setScore(score);
		paper.setTime(time);
		paper.setUser(userDao.getUserFromName(username));
		paperInfoDao.savel(paper);
	}
	
	@RequestMapping(value = "/if_exam_completed", method = RequestMethod.POST)
	@ResponseBody
	public String if_exam_completed(
			@RequestParam("username") String username,
			@RequestParam("examId") int examId,
			ModelMap modelmap
			){
		User user =userDao.getUserFromName(username);
		System.out.println(user.getPaper_info().size());
		for(int i=0;i<user.getPaper_info().size();i++){
			if(examId==user.getPaper_info().get(i).getExam().getId()){
				PaperInfo paper=user.getPaper_info().get(i);
				return paper.getScore()+";"+paper.getTime();
			}
		}
		return null; 
	}
}
