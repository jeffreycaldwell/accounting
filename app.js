var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Company = require("./models/company");
var Comment = require("./models/comment");
var Account = require("./models/account");
var seedDB = require("./seeds");


seedDB();
mongoose.connect("mongodb://localhost/accounting");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

// ROUTES

app.get("/", function(req, res){
   res.render("landing"); 
});


app.get("/companies", function(req, res){
    // get all campgrounds from db
    Company.find({}, function(err, allCompanies){
        if(err){
            console.log(err);
        } else {
            res.render("companies/index", {companies: allCompanies});
        }
    });
});

app.post("/companies", function(req, res){
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

app.get("/companies/new", function(req, res){
   res.render("companies/new.ejs"); 
});

// SHOW - show more info about one campground
app.get("/companies/:id", function(req, res){
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

// Comments routes
app.get("/companies/:id/comments/new", function(req, res){
    Company.findById(req.params.id, function(err, company){
       if(err) {
           console.log(err);
       } else {
           res.render("comments/new", {company: company});
       }
    });
});

app.post("/companies/:id/comments", function(req, res){
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

///////////// Account routes

app.get("/companies/:id/accounts/new", function(req, res){
    Company.findById(req.params.id, function(err, company){
       if(err) {
           console.log(err);
       } else {
           res.render("accounts/new", {company: company});
       }
    });
});

app.post("/companies/:id/accounts", function(req, res){
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

// SHOW - show more info about one campground
app.get("/companies/:id/journal", function(req, res){
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

app.get("/companies/:id/journal/transactions/new", function(req, res){
    Company.findById(req.params.id, function(err, company){
       if(err) {
           console.log(err);
       } else {
           res.render("transactions/new", {company: company});
       }
    });
});

// app.post("/companies/:id/accounts", function(req, res){
//     //lookup company using id
//     Company.findById(req.params.id, function(err, company){
//         if(err) {
//             console.log(err);
//             res.redirect("/companies");
//         } else {
//             Account.create(req.body.account, function(err, account){
//                 if(err) {
//                     console.log(err);
//                 } else {
//                     company.accounts.push(account._id);
//                     company.save();
//                     res.redirect("/companies/" + company._id);
//                 }
//             });
//         }
//     });
//     // create new comment
//     // connect new comment to company
//     //redirect company show page
// });



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Account server has started.");
});