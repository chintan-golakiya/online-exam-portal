const app = require("../app")
const request = require("supertest");
const config = require('config');
const mongoose = require('mongoose');

test('Test server is starts',async ()=> {
  console.log(config.get('mongodb.connectionString'))
  await request(app).get('/')
  .expect(200);
  mongoose.connection.close();
})