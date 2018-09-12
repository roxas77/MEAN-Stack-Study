var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();

// DB setting
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }); // 1
var db = mongoose.connection; // 2
// 3﻿
db.once("open", function(){
 console.log("DB connected");
});
// 4
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3
app.use(methodOverride("_method"));


// Routes
app.use("/", require("./routes/home"));
app.use("/contacts", require("./routes/contacts"));

// Port setting
var port = 3000;
app.listen(3000, function(){
 console.log("server on! http://localhost:"+port);
});
