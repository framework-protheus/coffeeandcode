'use strict'
// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// topic schema
var topicSchema = new Schema({
    title: { type: String, required: true }
  , description: { type: String, required: true }
  , totalVotes: {type: Number}
  , voters: [{user_id: Number
              , vote: Number}] 
});

// topic model
var Topic = mongoose.model('Topic', topicSchema);

// make this available to our users in our Node applications
module.exports = Topic;
