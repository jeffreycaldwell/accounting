var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Company = require("./models/company");
var Comment = require("./models/comment");
var Account = require("./models/account");

var seedDB = require("./seeds");

var companyRoutes = require("./routes/companies");
var journalRoutes = require("./routes/journal");
var accountRoutes = require("./routes/accounts");
var transactionRoutes = require("./routes/transactions");
var userRoutes = require("./routes/users");
var commentRoutes = require("./routes/comments");
var authRoutes = require("./routes/index");

seedDB();
mongoose.connect("mongodb://localhost/accounting");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(companyRoutes);
app.use(journalRoutes);
app.use(accountRoutes);
app.use(transactionRoutes);
app.use(userRoutes);
app.use(commentRoutes);
app.use(authRoutes);

app.set("view engine", "ejs");

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Account server has started.");
});