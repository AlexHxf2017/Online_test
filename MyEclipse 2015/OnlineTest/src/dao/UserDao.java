package dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Service;

import entity.User;

@Service
public class UserDao {
	public void savel(Object object){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.save(object);
		transaction.commit();
		session.close();
	}
	public User getUserFromName(String userName){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from User e where e.userName= '"+userName+"'";
		User user = (User)session.createQuery(s).list().get(0);
		transaction.commit();
		session.close();
		return user;
	}
	
	public boolean IfUserExit(String userName){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from User e where e.userName= '"+userName+"'";
		boolean Ifexit=true;
		if(session.createQuery(s).list().size()==0){Ifexit=false;}
		transaction.commit();
		session.close();
		return Ifexit;
	}
	
}
