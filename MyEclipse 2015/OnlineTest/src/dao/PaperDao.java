package dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Service;

import entity.Blanks;
import entity.Options;
import entity.Papers;

@Service
public class PaperDao {
	public void savel(Object object){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.save(object);
		transaction.commit();
		session.close();
	}
	public List<Papers> getPaperFromUserId(int id){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from Papers e join e.user o where o.id= '"+id+"'";
		List<Papers> paper = session.createQuery(s).list();
		transaction.commit();
		session.close();
		return paper;
	}
	public List<Papers> getPaperFromOptionDescription(String description){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from Papers e join e.option o where o.option_description= '"+description+"'";
		List<Papers> paper = session.createQuery(s).list();
		transaction.commit();
		session.close();
		return paper;
	}
	public List<Papers> getPaperFromBlankDescription(String description){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from Papers e join e.blank o where o.description= '"+description+"'";
		List<Papers> paper = session.createQuery(s).list();
		transaction.commit();
		session.close();
		return paper;
	}
	public void reviseOption(int paper_id,String answer){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from Papers e where e.id= '"+paper_id+"'";
		Papers paper = (Papers)session.createQuery(s).list().get(0);
		if(answer.equals("A")){paper.setOption_choice(1);}
		else if(answer.equals("B")){paper.setOption_choice(2);}
		else if(answer.equals("C")){paper.setOption_choice(3);}
		else if(answer.equals("D")){paper.setOption_choice(4);}
		session.update(paper);
		transaction.commit();
		session.close();
	}
	public void reviseBlank(int paper_id,String answer){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from Papers e where e.id= '"+paper_id+"'";
		Papers paper = (Papers)session.createQuery(s).list().get(0);
		paper.setBlank_description(answer);
		session.update(paper);
		transaction.commit();
		session.close();
	}
}
