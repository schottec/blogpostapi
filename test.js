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
        res.body.should.be.a('array');
        done();
      });
  });
});

describe('/POST blogpost', () => {
  it('it should not post without title field', (done) => {
    let blogpost = {
      body: "This is the body of the blogpost"
    }
    chai.request('http://localhost:8080')
      .post('/post')
      .send(blogpost)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid request');
        done();
      })
  })

  it('it should not post without body field', (done) => {
    let blogpost = {
      title: "This is a sample title"
    }
    chai.request('http://localhost:8080')
      .post('/post')
      .send(blogpost)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid request');
        done();
      })
  })

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
        res.body.should.be.a('object');
        res.body.should.have.property('stmt').which.has.property('changes')
          .which.equals(1);
        done();
      });
  });
});
