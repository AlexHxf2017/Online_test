package dao;


import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Service;

import entity.ProjectData;
@Service
public class ProjectDao {
	
	public void savel(ProjectData user){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.save(user);
		transaction.commit();
		session.close();
	}
	public  ProjectData getProjectByIndentity(String identity){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from ProjectData e where e.startTime= '"+identity+"'";
		ProjectData project = (ProjectData)session.createQuery(s).list().get(0);
		System.out.println(project.getProjectName());
		transaction.commit();
		session.close();
		return project;
	}
	
	public void deleteProjectByIndentity(String identity){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from ProjectData e where e.startTime= '"+identity+"'";
		ProjectData project = (ProjectData)session.createQuery(s).list().get(0);
		session.delete(project); 
		System.out.println(project.getProjectName());
		transaction.commit();
		session.close();
	}
	
	public List<ProjectData> getProjectsNumber(){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from ProjectData e where 1=1";
		List<ProjectData> list=new ArrayList<ProjectData>();
		list = session.createQuery(s).list();
		transaction.commit();
		session.close();
		return list;
	}
	
	public List<ProjectData> getProjectsByDate(String date){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from ProjectData e where date= '"+date+"'";
		List<ProjectData> list=new ArrayList<ProjectData>();
		list = session.createQuery(s).list();
		transaction.commit();
		session.close();
		return list;
	}
}
