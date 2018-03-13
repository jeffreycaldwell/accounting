var express = require("express");
var router = express.Router();
var Company = require("../models/company");

router.get("/companies", function(req, res){
    // get all campgrounds from db
    Company.find({}, function(err, allCompanies){
        if(err){
            console.log(err);
        } else {
            res.render("companies/index", {companies: allCompanies});
        }
    });
});

router.post("/companies", function(req, res){
   // get data from form and add to companies array
   // req.body.name
   // req.body.balance
   // redirect to companies page
   
   var name = req.body.name;
   var balance = req.body.balance;
   var description = req.body.description;
   var newCompany = {name: name, balance: balance, description: description};
   //Create a new campground and save to DB
   Company.create(newCompany, function(err, newlyCreated){
      if(err){
          console.log(err);
      } else {
          res.redirect("/companies");
      }
   });
   
   
});

router.get("/companies/new", function(req, res){
   res.render("companies/new.ejs"); 
});

// SHOW - show more info about one campground
router.get("/companies/:id", function(req, res){
    // find the campground with provided ID
    // 
    Company.findById(req.params.id).populate("comments accounts").exec(function(err, foundCompany){
        if(err){
            console.log(err);
        } else {
            
            res.render("companies/show", {company: foundCompany});    
        }
    });
});

module.exports = router;