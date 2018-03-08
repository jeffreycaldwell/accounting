var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/companies", function(req, res){
    
    var companies = [
        {name: "Boomer LLC", balance: "$234,000.98"},
        {name: "Floatilla Hun, Inc.", balance: "$293,883.03"},
        {name: "DigiDoIt", balance: "$384,230.34" }
        ]
        
   res.render("companies", {companies: companies});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Account server has started.");
});