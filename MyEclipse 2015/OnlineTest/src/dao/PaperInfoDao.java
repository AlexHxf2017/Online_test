package dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Service;

import entity.PaperInfo;
import entity.Papers;

@Service
public class PaperInfoDao {
	public void savel(Object object){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.save(object);
		transaction.commit();
		session.close();
	}
	public List<PaperInfo> getPaperFromExamId(int id){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from PaperInfo e join e.exam o where o.id= '"+id+"'";
		List<PaperInfo> paper = session.createQuery(s).list();
		transaction.commit();
		session.close();
		return paper;
	}
}
