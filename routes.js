var express = require("express");
var path = require("path");
var auth = require("./auth.js");
var Entry = require("./models/entry.js");
var UserController = require("./controllers/usercontroller.js");


module.exports = function(app, io){
  //Get Home Page
  app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/views/index.html"));
  });


  app.post("/", auth.isAuthenticated, function(req, res){
    //return user details.
    //if in db, return all relevant posts.
  });


  //Make new User
  //No Auth Needed
  app.post("/user", UserController.postUser);



  //Get Public User Profile
  //No Auth Needed.
  app.get("/user/:userid", function(req, res){

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
