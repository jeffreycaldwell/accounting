var mongoose = require("mongoose");
var transactionSchema = new mongoose.Schema({
    description: String,
    type: String,
    amount: String
});

var Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = mongoose.model("Transaction", transactionSchema);