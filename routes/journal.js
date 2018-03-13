var express = require("express");
var router = express.Router();
var Journal = require("../models/journal");
var Company = require("../models/company");

router.get("/companies/:id/journal", function(req, res){
    Company.findById(req.params.id).exec(function(err, foundCompany){
        if(err){
            console.log(err);
        } else {
            // Journal.findById(foundCompany.journal )
            // res.render("/companies/" + req.params.id + "/journal")
            // res.render("companies/show", {company: foundCompany});   
            Journal.findById(foundCompany.journal).exec(function(err, foundJournal){
               if(err) {
                   console.log(err);
               } else {
                    res.render("journal/show", {journal: foundJournal});       
               }
            });
            
        }
    });
    
    //res.render("/companiesjournal/show");
});

module.exports = router;
