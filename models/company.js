var mongoose = require("mongoose");
var companySchema = new mongoose.Schema({
    name: String,
    balance: String,
    description: String,
    journal: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Journal"
        }
        ],
    accounts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account"
        }
        ],
        
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
        ]
});

var Company = mongoose.model("Company", companySchema);

module.exports = mongoose.model("Company", companySchema);