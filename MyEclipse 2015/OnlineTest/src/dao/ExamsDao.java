package dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Service;

import entity.Blanks;
import entity.Exams;
import entity.Exams;
import entity.Options;

@Service
public class ExamsDao {
	public void savel(Object object){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.save(object);
		transaction.commit();
		session.close();
	}
	
	public Exams getExamFromDescription(String exam_title){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from Exams e where e.name= '"+exam_title+"'";
		Exams exam = (Exams)session.createQuery(s).list().get(0);
		transaction.commit();
		session.close();
		return exam;
	}
	public Exams getExamFromId(int exam_id){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from Exams e where e.id= '"+exam_id+"'";
		Exams exam = (Exams)session.createQuery(s).list().get(0);
		transaction.commit();
		session.close();
		return exam;
	}
	public void revise(Object object){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.update(object);
		transaction.commit();
		session.close();
	}
	public List<Exams> getExamList(){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from Exams e where 1=1";
		List<Exams> list=new ArrayList<Exams>();
		list = session.createQuery(s).list();
		transaction.commit();
		session.close();
		return list;
	}
	
	public List<Exams> getExamListFromUsername(String name){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from Exams e join e.user o where o.userName='"+name+"'";
		List<Exams> list=new ArrayList<Exams>();
		list = session.createQuery(s).list();
		transaction.commit();
		session.close();
		return list;
	}
	
	public List<Options> getOptionListFromId(int examId){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from Exams e join fetch e.option where e.id="+examId;
		Exams exam = (Exams)session.createQuery(s).list().get(0);
		transaction.commit();
		session.close();
		return exam.getOption();
	}
	public List<Blanks> getBlankListFromId(int examId){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from Exams e join fetch e.blank where e.id="+examId;
		Exams exam = (Exams)session.createQuery(s).list().get(0);
		transaction.commit();
		session.close();
		return exam.getBlank();
	}
}
