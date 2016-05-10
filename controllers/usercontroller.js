var User = require("../models/user.js");
var mongoose = require("mongoose");
var config = require("../config.js");

exports.postUser = function(req, res){
  mongoose.connect(config.db, function(err){

  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

    user.save(function(err, data){
      if(err)
        res.send(err);
      res.json({message: "A new user has been added.", username: data.username, email: data.email, pw_hash: data.password});
      mongoose.disconnect();
    });
  });
};

exports.getUser = function(req, res){
  User.find({}, function(err, user){
    if(err)
      res.send(err);
    res.send("Success");
  });
};

exports.getUsers = function(req, res){
  User.find(function(err, users){
    if(err)
      res.send(err);
    res.json(users);
  });
};
