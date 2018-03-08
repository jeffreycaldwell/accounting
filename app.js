var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var companies = [
            {name: "Boomer LLC", balance: "$234,000.98"},
            {name: "Floatilla Hun, Inc.", balance: "$293,883.03"},
            {name: "DigiDoIt", balance: "$384,230.34" }
        ]


app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/companies", function(req, res){
   res.render("companies", {companies: companies});
});

app.post("/companies", function(req, res){
   // get data from form and add to companies array
   // req.body.name
   // req.body.balance
   // redirect to companies page
   
   var name = req.body.name;
   var balance = req.body.balance;
   var newCompany = {name: name, balance: balance};
   companies.push(newCompany);
   
   res.redirect("/companies");
});

app.get("/companies/new", function(req, res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Account server has started.");
});