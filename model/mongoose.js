const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/crimeNowDb", { userNewUrlParser: true });

module.exports = mongoose;