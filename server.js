var fs = require("fs");
var express = require("express");
var favicon = require("serve-favicon");
var http = require("http");
var https = require("https");
var bodyParser = require("body-parser");
var path = require("path");
var morgan = require("morgan");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var router = require("./routes.js");
var config = require("./config.js");
var app = express();


mongoose.connect(config.db, function(err){
  if(err)
    console.log("DB CONN FAILED: %s", err);
  console.log("Connected to DB.");
});


app.set("port", process.env.PORT || 1198);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public/images/favicon.ico")));
app.set("views", path.join(__dirname, "public/views"));
app.engine(".hbs", exphbs({extname: ".hbs"}));
app.set("view engine", ".hbs");

var httpServer = http.createServer(app);
app.use(router);
var io = require("socket.io")(httpServer);






io.on("connection", function(socket){
  console.log("Unsecure Connection: New User.");

  socket.on("ClientNotification", function(data){
    console.log(data);
  });
  socket.on("disconnect", function(){
    console.log("User disconnect.");
  });
});




httpServer.listen(app.get("port"), function(){
  console.log("Unsecure Port: %s", app.get("port"));
});
