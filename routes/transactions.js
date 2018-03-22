var express = require("express");
var router = express.Router();
var Company = require("../models/company");
var Transaction = require("../models/transaction");
var Account = require("../models/account");
var Journal = require("../models/journal");

router.get("/companies/:id/journal/transactions/new", function(req, res){
    //Company.findById(req.params.id, function(err, company){
    Company.findById(req.params.id).populate("accounts").exec(function(err, foundCompany){
       if(err) {
           console.log(err);
       } else {
           res.render("transactions/new", {company: foundCompany});
       }
    });
});

router.post("/companies/:id/journal/transactions", function(req, res){
    for(var key in req.body) 
    {
        if(req.body.hasOwnProperty(key))
        {
            var type;
            
            if(key === "debit") {
              type = "debit";  
            } else {
                type = "credit";
            }
            
            var newTransaction = {  
                                    description: req.body[key].description, 
                                    type : type, 
                                    postRef: req.body[key].postReference, 
                                    amount: req.body[key].amount
            }
                    
            Transaction.create(newTransaction, function(err, newlyCreatedTransaction){
                if(err) {
                  console.log(err);
                  console.log("Transaction not successful.");
                  res.redirect("/companies/" + req.params.id + "/journal");
                } else {
                  newlyCreatedTransaction.save();
                   
                   Company.findById(req.params.id, function(err, company) {
                  
                        if(err) {
                            console.log(err);
                            //res.redirect("/companies/" + req.params.id + "/journal");
                        } else {
                            Journal.findById(company.journal, function(err, journal){
                                if(err) {
                                    console.log(err);
                                } else {
                                  journal.transactions.push(newlyCreatedTransaction._id);
                                    journal.save();
                                }
                            });
                        }
                   });
                   
                    Account.findById(req.body[key].postReference, function(err, account) {
                        if(err) {
                            console.log(err);
                            //res.redirect("/companies/" + req.params.id + "/journal");
                        } else {
                          account.transactions.push(newlyCreatedTransaction._id);
                          account.save();
                        }
                    });
                }
            });
        }
    }
    
    res.redirect("/companies/" + req.params.id + "/journal");
});

module.exports = router;