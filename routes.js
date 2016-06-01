"use strict";

var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var auth = require("./auth.js");
var Entry = require("./models/entry.js");
var config = require("./config.js");
var UserController = require("./controllers/usercontroller.js");


module.exports = function(app, io){

  app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/views/index.html"));
  });

  app.post("/", auth.isAuthenticated, function(req, res){

    //consider btoa
    //consider jquery

    console.log(req.body.loginusername);

    var loginusername = req.body.loginusername;

    Entry.find({userId: loginusername}, function(err, data){
      if(err)
        console.error(err);
      console.log(data);
      res.json(data);
    });
  });

  app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
  });

  //Make New User
  app.post("/user", UserController.postUser);

  //Get Public User Profile
  //No Auth Needed.
  app.get("/user/:userid", UserController.getUser);

  app.post("/entry", function(req, res){

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
    });
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
