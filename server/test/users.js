import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

use(chaiHttp);
const httpRequest = request(app).keepOpen();

describe('GET /api/v1/users', () => {
  it('Should fetch all users', (done) => {
    httpRequest
      .get('/api/v1/users')
      .set({ Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGJFbWFpbCI6eyJpZCI6MSwiZmlyc3RuYW1lIjoiS2F5b2RlIiwibGFzdG5hbWUiOiJva3VubGFkZSIsImVtYWlsIjoib2t1bmxhZGVrYXlvZGVAZ21haWwuY29tIiwidXNlcm5hbWUiOiJrYXlrYXkiLCJwYXNzd29yZCI6IiQyYiQxMCRwbFQvbklubW1CcVMuNkZ1VjA0Q29lbi9uVUI4d3BWLkhIT2JBb2MyVi5oei5WaWNaZXMxNiIsInJlZ2lzdGVyZWQiOiIyMDE4LTExLTIyVDEyOjI4OjQzLjQyNVoiLCJpc2FkbWluIjp0cnVlfSwiaXNhZG1pbiI6dHJ1ZSwiaWF0IjoxNTQyOTA2NjkyLCJleHAiOjE1NDI5OTMwOTJ9.wb4Xg1XyzZzJ0YNjwF3JyD-6_09WRki61gvG40WnTvw' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .to.be.equal('All Users');
        expect(res.body).to.be.have.property('data');
      });
    done();
  });
});

describe('GET /api/v1/users/1', () => {
  it('Should fetch all users', (done) => {
    httpRequest
      .get('/api/v1/users/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .to.be.equal('User by ID');
        expect(res.body).to.be.have.property('data')
          .to.have.property('email')
          .to.be.equal('okunladekayode@gmail.com');
      });
    done();
  });
});

describe('GET /api/v1/users/1/parcels', () => {
  it('Should fetch all users', (done) => {
    httpRequest
      .get('/api/v1/users/1/parcels')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .to.be.equal('Parcel Order delivery by user');
        expect(res.body).to.be.have.property('data');
      });
    done();
  });
});

describe('POST /api/v1/users/', () => {
  it('Should fetch all users', (done) => {
    const data = {
      name: 'yusuf manda',
      email: 'yougo@yahoo.com',
      address: '1, cole st, Lagos'
    };
    httpRequest
      .post('/api/v1/users/')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message')
          .to.be.equal('User Account Successfully Created');
        expect(res.body).to.be.have.property('data');
      });
    done();
  });
});

describe('Delete /api/v1/users/2', () => {
  it('Should delete a user by id', (done) => {
    httpRequest
      .delete('/api/v1/users/2')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .to.be.equal('User Successfully Deleted');
        expect(res.body).to.be.have.property('data');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});

describe('DELETE /api/v1/users/4', () => {
  it('Should delete a user by id', (done) => {
    httpRequest
      .delete('/api/v1/users/4')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error')
          .to.be.equal('The User with the given id was not found.');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});

describe('PUT /api/v1/users/4', () => {
  it('Should return user not found for an unexisting id', (done) => {
    const data = {
      name: 'yusuf manda',
      email: 'yougo@yahoo.com',
      address: '32, ana str, Abuja'
    };
    httpRequest
      .put('/api/v1/users/4')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error')
          .to.be.equal('The User with the given id was not found.');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});
