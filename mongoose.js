const mongoose = require("mongoose");

const { Schema } = mongoose;

async function main(){

    try {

    await mongoose.connect("mongodb://127.0.0.1:crimeDb");
        
    } catch (error) {
        console.log(`There is an error ${error}`)
    }
}

const crimeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true.valueOf,
    },
    score: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,

        default: new Date(),
    }
})