var express = require("express");
var router = express.Router();
var Journal = require("../models/journal");

router.get("/companies/:id/journal", function(req, res){
    // find the campground with provided ID
    // 
    // Company.findById(req.params.id).populate("comments accounts").exec(function(err, foundCompany){
    //     if(err){
    //         console.log(err);
    //     } else {
            
    //         res.render("companies/show", {company: foundCompany});    
    //     }
    // });
    
    res.render("journal/show");
});

module.exports = router;
