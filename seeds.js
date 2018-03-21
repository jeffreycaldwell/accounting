    var mongoose = require("mongoose");
    var Company = require("./models/company");
    var Journal = require("./models/journal");
    var Comment   = require("./models/comment");
    
    
     
    var data = [
        {
            name: "DigiDoIt",
        balance: "$384,230.34",
         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta ullamcorper leo et malesuada. Quisque congue fermentum est, ac rutrum orci scelerisque eget. Curabitur luctus vehicula eros, quis iaculis tortor accumsan ut. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean est velit, lobortis at eros nec, luctus pretium nulla. Mauris ultrices quis quam ut porttitor. Praesent non commodo diam, non faucibus augue. Aenean fermentum ligula pharetra elit blandit, ut ultricies ante porta. Integer fermentum est non pulvinar egestas. Ut ligula lacus, bibendum commodo dolor ut, tincidunt faucibus augue. Integer condimentum nisl ut arcu condimentum tincidunt. In lacinia purus sem, ac egestas arcu varius id. Praesent vel lobortis erat, eget fermentum mi. Maecenas nisi ipsum, auctor eu maximus ut, porta vitae nisi."
        },
        {
            name: "Boogie, Inc.",
        balance: "$24,270.14",
         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta ullamcorper leo et malesuada. Quisque congue fermentum est, ac rutrum orci scelerisque eget. Curabitur luctus vehicula eros, quis iaculis tortor accumsan ut. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean est velit, lobortis at eros nec, luctus pretium nulla. Mauris ultrices quis quam ut porttitor. Praesent non commodo diam, non faucibus augue. Aenean fermentum ligula pharetra elit blandit, ut ultricies ante porta. Integer fermentum est non pulvinar egestas. Ut ligula lacus, bibendum commodo dolor ut, tincidunt faucibus augue. Integer condimentum nisl ut arcu condimentum tincidunt. In lacinia purus sem, ac egestas arcu varius id. Praesent vel lobortis erat, eget fermentum mi. Maecenas nisi ipsum, auctor eu maximus ut, porta vitae nisi."
        },
        {
            name: "Floater Bee, LLC",
        balance: "$50.34",
         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta ullamcorper leo et malesuada. Quisque congue fermentum est, ac rutrum orci scelerisque eget. Curabitur luctus vehicula eros, quis iaculis tortor accumsan ut. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean est velit, lobortis at eros nec, luctus pretium nulla. Mauris ultrices quis quam ut porttitor. Praesent non commodo diam, non faucibus augue. Aenean fermentum ligula pharetra elit blandit, ut ultricies ante porta. Integer fermentum est non pulvinar egestas. Ut ligula lacus, bibendum commodo dolor ut, tincidunt faucibus augue. Integer condimentum nisl ut arcu condimentum tincidunt. In lacinia purus sem, ac egestas arcu varius id. Praesent vel lobortis erat, eget fermentum mi. Maecenas nisi ipsum, auctor eu maximus ut, porta vitae nisi."
        
            
        },
        {
        name: "Hazel Potato, LLC",
        balance: "$918,282,232.34",
         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta ullamcorper leo et malesuada. Quisque congue fermentum est, ac rutrum orci scelerisque eget. Curabitur luctus vehicula eros, quis iaculis tortor accumsan ut. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean est velit, lobortis at eros nec, luctus pretium nulla. Mauris ultrices quis quam ut porttitor. Praesent non commodo diam, non faucibus augue. Aenean fermentum ligula pharetra elit blandit, ut ultricies ante porta. Integer fermentum est non pulvinar egestas. Ut ligula lacus, bibendum commodo dolor ut, tincidunt faucibus augue. Integer condimentum nisl ut arcu condimentum tincidunt. In lacinia purus sem, ac egestas arcu varius id. Praesent vel lobortis erat, eget fermentum mi. Maecenas nisi ipsum, auctor eu maximus ut, porta vitae nisi."
        
    },
    {
        name: "Arty Party, INC",
        balance: "$938,250.34",
         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta ullamcorper leo et malesuada. Quisque congue fermentum est, ac rutrum orci scelerisque eget. Curabitur luctus vehicula eros, quis iaculis tortor accumsan ut. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean est velit, lobortis at eros nec, luctus pretium nulla. Mauris ultrices quis quam ut porttitor. Praesent non commodo diam, non faucibus augue. Aenean fermentum ligula pharetra elit blandit, ut ultricies ante porta. Integer fermentum est non pulvinar egestas. Ut ligula lacus, bibendum commodo dolor ut, tincidunt faucibus augue. Integer condimentum nisl ut arcu condimentum tincidunt. In lacinia purus sem, ac egestas arcu varius id. Praesent vel lobortis erat, eget fermentum mi. Maecenas nisi ipsum, auctor eu maximus ut, porta vitae nisi."
        
    }
        
    ]
    
    function seedDB(){
       //Remove all companies
       Company.remove({}, function(err){
            if(err){
                console.log(err);
            }
            console.log("removed companies!");
            Comment.remove({}, function(err) {
                if(err){
                    console.log(err);
                }
                console.log("removed comments!");
                Journal.remove({}, function(err) {
                    if(err){
                        console.log(err);
                    }
                    console.log("removed journals!");
                    //add a few companies
                    data.forEach(function(seed){
                        Company.create(seed, function(err, company){
                            if(err){
                                console.log(err)
                            } else {
                                console.log("added a company");
                                var newJournal = {name: company.name, balance: company.balance};
                                Journal.create(newJournal, function(err, newlyCreatedJournal){
                                    if(err){
                                        console.log("Error creating journal.");
                                    } else {
                                        console.log(newlyCreatedJournal.name);
                                        company.journal = newlyCreatedJournal;
                                        company.save();
                                   }
                               });
                                
                            }
                        });
                    });
                });
            });
        }); 
        //add a few comments
    }
     
    module.exports = seedDB;