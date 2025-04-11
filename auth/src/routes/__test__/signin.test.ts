import request from "supertest";
import {app} from '../../app';

it('it fails when an email that does not exist is supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});


it('it fails when an incorrect password is provided', async () => {
   await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201); //creating an user
  
     await request(app)
      .post('/api/users/signip')
      .send({
        email: 'test@test.com',
        password: 'pword' //incorrect password
      })
      .expect(404); 
    
});

it('it responds with a cookie when given valid credentials', async () => {
  
   await request(app)
        .post('/api/users/signup')
        .send({
          email: 'test@test.com',
          password: 'password'
        })
        .expect(201); //creating an user
  
  
  const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201); 
  
      expect(response.get('Set-Cookie')).toBeDefined();
});
