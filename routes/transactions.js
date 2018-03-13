var express = require("express");
var router = express.Router();
var Company = require("../models/company");

router.get("/companies/:id/journal/transactions/new", function(req, res){
    Company.findById(req.params.id, function(err, company){
       if(err) {
           console.log(err);
       } else {
           res.render("transactions/new", {company: company});
       }
    });
});

router.post("/companies/:id/journal/transactions", function(req, res){
    //lookup company using id
    // Company.findById(req.params.id, function(err, company){
    //     if(err) {
    //         console.log(err);
    //         res.redirect("/companies");
    //     } else {
            // Transaction.create(req.body.account, function(err, account){
            //     if(err) {
            //         console.log(err);
            //     } else {
            //         company.accounts.push(account._id);
            //         company.save();
            //         res.redirect("/companies/" + company._id);
            //     }
            // });
            
            console.log(Object.keys(req.body).length);
            console.log(req.body);
            
            res.send("Ok");
        //}
   // });
    // create new comment
    // connect new comment to company
    //redirect company show page
});

module.exports = router;