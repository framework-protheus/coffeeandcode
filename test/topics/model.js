'use strict';

const utils = require('../utils');
const should = require('should');
const Topic = require('../../app/models/topics');


describe('Topics: models', function () {


  describe('#create()', function () {
    it('should create a new Topic', function (done) {
      var t = {
        title: "titulo",
        description: "description"
      };
      Topic.create(t, function (err, createdTopic) {
        // Confirm that that an error does not exist
        should.not.exist(err);
        // verify that the returned topic is what we expect
        createdTopic.title.should.equal('titulo');
        createdTopic.description.should.equal('description');
        // Call done to tell mocha that we are done with this test
        done();
      });
    });
  });


});
