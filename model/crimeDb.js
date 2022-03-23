const mongoose = require("./mongoose");


const crimeSchema = new mongoose.Schema({
    crimeScene: {
        type: String,
        default: "movie theatre"
    },
    clue: {
        type: Number,
        default: 42,
    },
    score: {
        type: Number,
        default: 0,
    },
    victName: {
        type: String,
      default: "",
    },
    nameState: {
        type: String,
       default: "",
    },
    getLawyer: {
        type: String,
        default: "",
    },
    crimePlace: {
        type: String,
        default: "Calgary"
    },
    security: {
        type: String,
        default: "Security calls 911",
    },
    police: {
        type: String,
        default: "Corps, who stole the iPhone",
    },
    createdAt: {
        type: Date,

        default: new Date(),
    }
});

crimeSchema.static("getPolice", function(){

    let findMoney = "Who stole the $100";
    console.log(findMoney);
    return findMoney;
});

const Crime = mongoose.model("Crime", crimeSchema);
Crime.getPolice();


async function createCrime(){

    let crimeInserted = await Crime.create({});
    console.log(crimeInserted);
    return crimeInserted;
}
// createCrime();
    //Finding the crime Game in the collection/Documents
async function findCrimeById(id){

    let crimeFound = await Crime.findById(id);
    console.log(crimeFound);
    return crimeFound;
}
findCrimeById('623b9e3e261ca7a526713223');
    //Updating crimeGame
async function updateCrimeById(id, newGateData){

    let crimeUpdated = await Crime.updateOne(
        { _id: Object(id) }, { $set: newGateData });
    console.log(crimeUpdated);
    return crimeUpdated;
}
    //FindAll returns and object cursor hence must be converted to and array.
async function findAllCrime(){

    let crimeCursor = await Crime.find({});
    let crimeArray = await crimeCursor.toArray();
    console.log(crimeArray);
    return crimeArray;
}

async function deleteCrimeById(){

    let crimeCollection = await Crime.deleteOne({ _id: ObjectId(id)});
    console.log(crimeCollection);
    return crimeCollection;
}

module.exports = { createCrime, findCrimeById, updateCrimeById, findAllCrime, deleteCrimeById };








// const crime = new Crime({

//     victName: "John Mary",
//     nameState: "Mathew Kate",
//     getLawyer: "Happy Micheal",
//     createdAt: new Date()
// });







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


// crime.save();
// console.log(crime);
