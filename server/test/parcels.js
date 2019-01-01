import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

use(chaiHttp);
const httpRequest = request(app).keepOpen();

describe('GET /', () => {
  it('Should return the message of the base url', (done) => {
    httpRequest
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .to.be.equal('Welcome to SendIT courier service');
        expect(res.body).not.to.be.have.property('data');
      });
    done();
  });
});
/*
describe('GET /api/v1', () => {
  it('Should return version 1 welcome message', (done) => {
    httpRequest
      .get('/api/v1/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .to.be.equal('Welcome to SendIT API VERSION 1');
        expect(res.body).not.to.be.have.property('data');
      });
    done();
  });
});

describe('GET /api/v1/parcels', () => {
  it('Should return all parcel delivery orders', (done) => {
    httpRequest
      .get('/api/v1/parcels')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});

describe('GET /api/v1/parcels/1', () => {
  it('Should fetch One parcel delivery order by ID', (done) => {
    httpRequest
      .get('/api/v1/parcels/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});

describe('PUT /api/v1/parcels/1/cancel', () => {
  it('Should return error message is empty', (done) => {
    httpRequest
      .put('/api/v1/parcels/1/cancel')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});

describe('PUT /api/v1/parcels/1/cancel', () => {
  it('Should return 404 when user is not registered', (done) => {
    const data = {
      email: 'okunlade@gmail.com',
      description: 'documents',
      weight: '20kg',
      destination: 'London'
    };
    httpRequest
      .put('/api/v1/parcels/1/cancel')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
      });
    done();
  });
});

describe('PUT /api/v1/parcels/1/cancel', () => {
  it('Should cancel the specific parcel delivery order by ID when user is verified', (done) => {
    const data = {
      email: 'okunladekayode@gmail.com',
      description: 'documents',
      weight: '20kg',
      destination: 'London'
    };
    httpRequest
      .put('/api/v1/parcels/1/cancel')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .to.be.equal('Parcel Delivery Order Successfully Cancelled');
        expect(res.body).to.have.property('data')
          .to.have.property('status')
          .to.be.equal('cancelled');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});

describe('PUT /api/v1/parcels/1/cancel', () => {
  it('Should return Unauthorized when the user is not the owner of the parcel', (done) => {
    const data = {
      email: 'johnmoses@gmail.com',
      description: 'documents',
      weight: '20kg',
      destination: 'London'
    };
    httpRequest
      .put('/api/v1/parcels/1/cancel')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error')
          .to.be.equal('Unauthorized Action, Not Completed');
        expect(res.body).to.be.an('object');
      });
    done();
  });
});


describe('POST /api/v1/parcels', () => {
  it('Should create a new parcel delivery order', (done) => {
    const data = {
      email: 'okunladekayode@gmail.com',
      description: 'House documents',
      weight: '11kg',
      destination: '34, brook st, London'
    };
    httpRequest
      .post('/api/v1/parcels')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message')
          .to.be.equal('Parcel delivery order successfully created');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data')
          .to.have.property('status')
          .to.be.equal('new');
      });
    done();
  });
});

describe('PUT /api/v1/parcels/1', () => {
  it('Should change the destination of a parcel delivery order', (done) => {
    const data = {
      email: 'johnmoses@gmail.com',
      description: 'House documents',
      weight: '11kg',
      destination: '34, brook st, London'
    };
    httpRequest
      .put('/api/v1/parcels/1')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .to.be.equal('Parcel Delivery Order Successfully Updated');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data')
          .to.have.property('destination').to.be.equal('34, brook st, London');
      });
    done();
  });
});

describe('DELETE /api/v1/parcels/1', () => {
  it('Should delete the specific parcel delivery order by ID', (done) => {
    const data = {
      email: 'okunladekayode@gmail.com',
      description: 'House documents',
      weight: '11kg',
      destination: '34, brook st, London'
    };
    httpRequest
      .delete('/api/v1/parcels/1')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .to.be.equal('Parcel Delivery Order Successfully Deleted');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data')
          .to.have.property('status');
      });
    done();
  });
});
*/
