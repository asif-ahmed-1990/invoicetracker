'use strict';

var app = require('../..');
import request from 'supertest';

var newOptionsHelper;

describe('OptionsHelper API:', function() {

  describe('GET /api/optionsHelpers', function() {
    var optionsHelpers;

    beforeEach(function(done) {
      request(app)
        .get('/api/optionsHelpers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          optionsHelpers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      optionsHelpers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/optionsHelpers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/optionsHelpers')
        .send({
          name: 'New OptionsHelper',
          info: 'This is the brand new optionsHelper!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newOptionsHelper = res.body;
          done();
        });
    });

    it('should respond with the newly created optionsHelper', function() {
      newOptionsHelper.name.should.equal('New OptionsHelper');
      newOptionsHelper.info.should.equal('This is the brand new optionsHelper!!!');
    });

  });

  describe('GET /api/optionsHelpers/:id', function() {
    var optionsHelper;

    beforeEach(function(done) {
      request(app)
        .get('/api/optionsHelpers/' + newOptionsHelper._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          optionsHelper = res.body;
          done();
        });
    });

    afterEach(function() {
      optionsHelper = {};
    });

    it('should respond with the requested optionsHelper', function() {
      optionsHelper.name.should.equal('New OptionsHelper');
      optionsHelper.info.should.equal('This is the brand new optionsHelper!!!');
    });

  });

  describe('PUT /api/optionsHelpers/:id', function() {
    var updatedOptionsHelper;

    beforeEach(function(done) {
      request(app)
        .put('/api/optionsHelpers/' + newOptionsHelper._id)
        .send({
          name: 'Updated OptionsHelper',
          info: 'This is the updated optionsHelper!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedOptionsHelper = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOptionsHelper = {};
    });

    it('should respond with the updated optionsHelper', function() {
      updatedOptionsHelper.name.should.equal('Updated OptionsHelper');
      updatedOptionsHelper.info.should.equal('This is the updated optionsHelper!!!');
    });

  });

  describe('DELETE /api/optionsHelpers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/optionsHelpers/' + newOptionsHelper._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when optionsHelper does not exist', function(done) {
      request(app)
        .delete('/api/optionsHelpers/' + newOptionsHelper._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
