var express = require("express");
var router = express.Router();
var Company = require("../models/company");
var Account = require("../models/account");

router.get("/companies/:id/accounts/new", function(req, res){
    Company.findById(req.params.id, function(err, company){
       if(err) {
           console.log(err);
       } else {
           res.render("accounts/new", {company: company});
       }
    });
});

router.post("/companies/:id/accounts", function(req, res){
    //lookup company using id
    Company.findById(req.params.id, function(err, company){
        if(err) {
            console.log(err);
            res.redirect("/companies");
        } else {
            Account.create(req.body.account, function(err, account){
                if(err) {
                    console.log(err);
                } else {
                    company.accounts.push(account._id);
                    company.save();
                    res.redirect("/companies/" + company._id);
                }
            });
        }
    });
    // create new comment
    // connect new comment to company
    //redirect company show page
});

router.get("/companies/:companyid/accounts/:accountid", function(req, res){
   Account.findById(req.params.accountid).populate("transactions").exec(function(err, foundAccount){
        if(err){
            console.log(err);
        } else {
            
            res.render("accounts/show", {account: foundAccount});    
        }
    });
});

module.exports = router;