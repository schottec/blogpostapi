process.env.NODE_ENV = 'test';

let server = require('./app.js');
let chai = require('chai'),
  should = chai.should(),
  expect = chai.expect;
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('/GET posts', () => {
  it('it should return all the posts', (done) => {
    chai.request('http://localhost:8080')
      .get('/posts')
      .end((err,res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/POST blogpost', () => {
  it('it should successully post', (done) => {
    let blogpost = {
      "title": "Sample title",
      "body": "This is a sample body"
    }
    chai.request('http://localhost:8080')
      .post('/post')
      .send(blogpost)
      .end((err,res) => {
        res.should.have.status(200);
        done();
      });
  });
});
