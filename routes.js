var express = require("express");
var Entry = require("./models/entry.js");
var router = express.Router();


router.get("/", function(req, res){
  res.render("index");
});

router.get("/submit", function(req, res){
  res.render("entryform");
});

router.post("/submit", function(req, res){


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



module.exports = router;
