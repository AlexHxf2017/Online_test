package dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Service;

import entity.Options;

@Service
public class OptionsDao {
	public void savel(Object object){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.save(object);
		transaction.commit();
		session.close();
	}
	public void revise(Object object){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.update(object);
		transaction.commit();
		session.close();
	}
	public void delete(Object object){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.delete(object);
		transaction.commit();
		session.close();
	}
	public boolean IfOptionExit(String description){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from Options e where e.option_description= '"+description+"'";
		boolean Ifexit=true;
		if(session.createQuery(s).list().size()==0){Ifexit=false;}
		transaction.commit();
		session.close();
		return Ifexit;
	}
	
	public Options getOptionFromDescription(String description){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from Options e where e.option_description= '"+description+"'";
		Options option = (Options)session.createQuery(s).list().get(0);
		transaction.commit();
		session.close();
		return option;
	}
}
