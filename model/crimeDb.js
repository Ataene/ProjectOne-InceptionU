const mongoose = require("./mongoose");

// const { Schema } = mongoose;

// async function main(){
//     try {
//     } catch (error) {
//         console.log(`There is an error ${error}`)
//     }
// }

const crimeSchema = new mongoose.Schema({
    victName: {
        type: String,
        required: true,
        unique: true
    },
    nameState: {
        type: String,
        required: true,
        unique: true
    },
    getLawyer: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,

        default: new Date(),
    }
});

const Crime = mongoose.model("Crime", crimeSchema);

const crime = new Crime({

    victName: "John Mary",
    nameState: "Mathew Kate",
    getLawyer: "Happy Micheal",
    createdAt: new Date()
});


// const crimeSchema = new mongoose.Schema({
//     victName: String,
//     nameState: String,
//     getLawyer: String,
//     score: Number,
//     createdAt: new Date()
// });

// const Crime = mongoose.model("Crime", crimeSchema);

// const crime = new Crime({

//     victName: "John Mary",
//     nameState: "Mathew Kate",
//     getLawyer: "Happy Micheal",
//     score: Number,
//     createdAt: new Date()
// });


crime.save();
console.log(crime);
