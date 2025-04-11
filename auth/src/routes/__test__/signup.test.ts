import request from "supertest";
import {app} from '../../app';

it('returns a 201 on successful signup', async()=>{
    return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'hkjhjkhjkh',
        password: 'password'
      })
      .expect(400);
  });

  it('returns a 400 with an invalid password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'hkjhjkhjkh',
        password: 'p'
      })
      .expect(400);
  });


  it('returns a 400 with missing email and password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({})
      .expect(400);
  });

  it('it disallows duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201); //creating an user

      await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(400); // creating the same user again, so 400

  });

  it('sets a cookie after a successful signup', async () => {
    const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201); //creating an user

    expect(response.get('Set-Cookie')).toBeDefined();
  });