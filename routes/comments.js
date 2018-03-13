var express = require("express");
var router = express.Router();
var Company = require("../models/company");
var Comment = require("../models/comment");

// Comments routes
router.get("/companies/:id/comments/new", function(req, res){
    Company.findById(req.params.id, function(err, company){
       if(err) {
           console.log(err);
       } else {
           res.render("comments/new", {company: company});
       }
    });
});

router.post("/companies/:id/comments", function(req, res){
    //lookup company using id
    Company.findById(req.params.id, function(err, company){
        if(err) {
            console.log(err);
            res.redirect("/companies");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    company.comments.push(comment._id);
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

module.exports = router;