var mongoose = require("mongoose");
var transactionSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    description: String,
    type: String,
    postRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account"
        },
    amount: String
});

var Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = mongoose.model("Transaction", transactionSchema);