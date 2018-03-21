var mongoose = require("mongoose");
var transactionSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    accountTitle: String,
    description: String,
    type: String,
    postRef: String,
    amount: String
});

var Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = mongoose.model("Transaction", transactionSchema);