'use strict';
const httpMocks = require('node-mocks-http');
const utils = require('../utils');
const should = require('should');
const TopicCtrl = require('../../app/controllers/topics');


describe('Topics: controller', function () {

  describe('structure', function(){
    it('should have basic functions', function(done){
      TopicCtrl.should.have.property('list');
      TopicCtrl.should.have.property('new');
      done();
    });
  });
  describe('#list()',function(){
    it('should return empty topic list', function(done){
      let req  = httpMocks.createRequest({
          method: 'GET',
          url: ''
      });

      var res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
      res.on('end', function() {
        let data = JSON.parse( res._getData() );
        data.should.have.length(0);
        done();
      });

      TopicCtrl.list(req,res);
    });
  });
  describe('#new()',function(){
    it('new Topic votes should be 0', function(done){
      let req  = httpMocks.createRequest({
          method: 'POST',
          url: '',
          body:{
            title : "Titulo",
            description: "Descricao",
            votes: 10
          }
      });

      var res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter});
      res.on('end', function() {
        let data = JSON.parse( res._getData() );
        data.should.have.property('totalVotes').which.is.a.Number().and.is.equal(0);
        console.log(data);
        done();
      });

      TopicCtrl.new(req,res);
    });
  });

});
