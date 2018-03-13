var mongoose = require("mongoose");
var journalSchema = new mongoose.Schema({
    name: String,
    balance: String,
    description: String,
      
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction"
        }
        ]
});

var Journal = mongoose.model("Journal", journalSchema);

module.exports = mongoose.model("Journal", journalSchema);