package dao;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Service;

import entity.UserData;
@Service
public class UserDao {
	
	public void savel(UserData user){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		session.save(user);
		transaction.commit();
		session.close();
	}
	public String getLogInfo(String userName){
		SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
		Session session = sessionFactory.openSession();
		Transaction transaction = session.beginTransaction();
		String s = "select e from UserData e where e.userName= '"+userName+"'";
		UserData user = (UserData)session.createQuery(s).list().get(0);
		System.out.println(user.getPassword());
		transaction.commit();
		session.close();
		return user.getPassword();
	}

}
