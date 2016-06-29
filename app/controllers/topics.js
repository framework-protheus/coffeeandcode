'use strict'
const Topic = require('../models/topics.js');
module.exports = {
    list : function(req, res){
      // get all the users
      Topic.find({}, function(err, topics) {
        if (err) throw err;

        // object of all the users
        res.end(JSON.stringify(topics));
      });
    }
  , new : function(req, res){
    let topic = new Topic({
        title : req.body.title
      , description : req.body.description
      , totalVotes: req.body.votes
      , voters: []
    });
    topic.save((err)=>{
      if (err){
        res.json(err);
      }else{
        res.json(topic);
      }
    })
  }
  , update : function(req, res){
    /*TODO LIST: 
        - mudar a condicao de busca para _ID
        - verificar se eh preciso fazer o push
        - somar ou subtrair o total de votos

    */
    Topic.find({title: req.body.setTitle}, function(err, topics) {
      var condition = {title: req.body.setTitle}
      var update = { $set : {title: req.body.title
                                  , description: req.body.description
                                  , totalVotes: req.body.votes
                                }
                        , $push: { voters: 
                                    {voter: req.body.voter, vote: req.body.vote}
                                  }
                      }
      var options = { multi: true };

      Topic.update(condition, update, options, function(err, numAffected) {
        console.log("Alterado com sucesso.");
      });
    });
  }
};
