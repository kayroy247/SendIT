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

describe('GET /api/v1/users/', () => {
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
