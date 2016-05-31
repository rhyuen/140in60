"use strict";

var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var auth = require("./auth.js");
var Entry = require("./models/entry.js");
var config = require("./config.js");
var UserController = require("./controllers/usercontroller.js");


module.exports = function(app, io){

  app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });
  //Get Home Page
  app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/views/index.html"));
  });

  //Authenticaiton for a person with login credentials already
  app.post("/", auth.isAuthenticated, function(req, res){
    //return user details.
    //if in db, return all relevant posts.
    console.log(req.body.username);
    mongoose.connect(config.db, function(err){
      var userEmail =  req.body.loginusername;
      //var userPw = req.body.loginpassword;
      Entry.find({userId: username}, function(err, data){
        if(err)
          console.error(err);
        console.log(data);
        res.json({posttitle: data.title,
          postdate: data.date,
          postcontent: data.content,
          postuserid: data.userId
        });
        //mongoose.disconnect();
      });
    });
  });

  //Make new User
  //No Auth Needed
  app.post("/user", UserController.postUser);


  //Get Public User Profile
  //No Auth Needed.
  app.get("/user/:userid", UserController.getUser);



  app.post("/entry", function(req, res){
      mongoose.connect(config.db, function(err, result){
        var latestEntry = new Entry({
          title: req.body.formentrytitle,
          date: req.body.formentrydate,
          content: req.body.formentrycontent,
          userId: req.body.formentryuserid
        });

        latestEntry.save(function(err, cbResponse){
          if(err)
            console.error(err);
          console.log(cbResponse);
          res.send(cbResponse);
          mongoose.disconnect();
        });
      })
  });
  /*
    app.get("/submit", function(req, res){
      res.sendFile(path.join(__dirname, "public/views/index.html"));
      io.emit("TimeStamp", new Date());
    });

    app.post("/submit", function(req, res){
      io.emit("TimeStamp", new Date(), function(){
        console.log("Time Stamp away.");
      });

      console.log(data);
      var latestEntry = new Entry();
      latestEntry.title= req.body.entryTitle;
      latestEntry.date = req.body.entryDate;
      latestEntry.content = req.body.entryContent;


      latestEntry.save(function(err, data){
        if(err)
          console.log(err);
        console.log("Written to DB: %s", data);
      });
      res.redirect("/submit");
    });
  */
};
