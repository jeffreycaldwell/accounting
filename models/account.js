var mongoose = require("mongoose");
var accountSchema = new mongoose.Schema({
    name: String,
    reference: String,
    balance: String,
    description: String,
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        }
        ]
});

var Account = mongoose.model("Account", accountSchema);

module.exports = mongoose.model("Account", accountSchema);