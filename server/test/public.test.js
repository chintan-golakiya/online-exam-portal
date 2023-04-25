const app = require("../app")
const request = require("supertest");
const mongoose = require('mongoose');
const userModel = require('../models/user');

test('Student Register',async () => {
  await userModel.findOneAndRemove({'email':'testemail@ep.com'});
  await request(app).post('/api/v1/public/register').send({
    'username':'testuser',
    'email':'testemail@ep.com',
    'password':'randomvalid'
  }).expect(200)
  .then(res=>(
    expect(res.body).toEqual({
    success : true,
    message : 'Profile created successfully!'
  })))
  
});

test('Already added email in Studnet Register', async ()=> {
  await request(app).post('/api/v1/public/register').send({
    'username':'testuser',
    'email':'testemail@ep.com',
    'password':'randomvalid'
  }).expect(400)
  .then(res=>(
    expect(res.body).toEqual({
    success : false,
    message : 'This email is already exists!'
  })))
  mongoose.connection.close();
})

test('small password in student register', async ()=> {
  await request(app).post('/api/v1/public/register').send({
    'username':'testuser',
    'email':'testemail@ep.com',
    'password':'ran'
  }).expect(400)
  .then(res=>{
    
    expect(res.body).toEqual(expect.objectContaining({
      success : false,
      message : 'Invalid inputs'
    }))
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0]).toEqual(expect.objectContaining({
      param : 'password',
      msg : 'Invalid Password'
    }))
  })
  mongoose.connection.close();
})