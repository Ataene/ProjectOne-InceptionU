const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/crimeNowDb");

module.exports = mongoose;