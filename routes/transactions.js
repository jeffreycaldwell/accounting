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
            if(key === "general") {
              
            } else {
            
                console.log("key / type success");
                
                var newTransaction = {  description: req.body["general"].description, type : key, postRef: req.body[key].postReference, amount: req.body[key].amount };
                console.log("Testing: " + newTransaction.description);
                console.log("Testing: " + newTransaction.type);
                console.log("Testing: " + newTransaction.postRef);
                console.log("Testing: " + newTransaction.amount);
                
                Transaction.create(newTransaction, function(err, newlyCreatedTransaction){
                    if(err) {
                      console.log(err);
                      res.redirect("/companies/" + req.params.id + "/journal");
                    } else {
                        newlyCreatedTransaction.save();
                        
                        AddToJournal(req.params.id, newlyCreatedTransaction);
                        
                        console.log(newlyCreatedTransaction.postRef);
                        AddToAccount(newlyCreatedTransaction.postRef, newlyCreatedTransaction);
                        
                    }
                });
            }
        }
    }
    
    res.redirect("/companies/" + req.params.id + "/journal");
});

function AddToJournal(companyID, createdTransaction)
{
    Company.findById(companyID, function(err, company) {
                  
                        if(err) {
                            console.log(err);
                            //res.redirect("/companies/" + req.params.id + "/journal");
                        } else {
                            Journal.findById(company.journal, function(err, journal){
                                if(err) {
                                    console.log(err);
                                } else {
                                  journal.transactions.push(createdTransaction);
                                    journal.save();
                                }
                            });
                        }
                   });
}

function AddToAccount(accountReference, createdTransaction)
{
    Account.findById(accountReference, function(err, account) {
                        if(err) {
                            console.log(err);
                            //res.redirect("/companies/" + req.params.id + "/journal");
                        } else {
                            
                          account.transactions.push(createdTransaction);
                          account.save();
                        }
                    });
}

module.exports = router;