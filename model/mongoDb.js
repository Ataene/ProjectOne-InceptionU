const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";

let dbName = "crimeDb";

    //Name of collection in Database
crimeName = "crimeName";

    //Connected to the Database
async function crimeMongo(){

    try {
        let crimeConnect = await MongoClient.connect(url,{ useNewUrlParser: true });
        let db = crimeConnect.db(dbName);
        console.log(`MongoDb is connected to ${dbName} using collection ${crimeName}`);
        return db;
    } catch (error) {
        
        console.log(`There is an error in the connection ${error}`)
    }
    // finally {
    //     await client.close();
    // }
}
    //making a connection to the Database connection to create Document.
async function crimeCollecting(){

    let db = await crimeMongo();
    let crimeCollection = db.collection(crimeName);

    return crimeCollection;
}
    //Creating and storing the crime Game
async function createCrime(){

    let crimeConnection = await crimeCollecting();
    let crimeInserted = await crimeConnection.insertOne({name: "Emmanuel", score: 0});
    console.log(crimeInserted);
    return crimeInserted;
}
    //Finding the crime Game in the collection/Documents
async function findCrimeById(){

    let crimeConnection = await crimeCollecting();
    let crimeFound = await crimeConnection.findOne({_id: Object(id) });
    console.log(crimeFound);
    return crimeFound;
}
    //Updating crimeGame
async function updateCrimeById(id, newGateData){

    let crimeConnection = await crimeCollecting();
    let crimeUpdated = await crimeConnection.updateOne(
        { _id: Object(id) }, { $set: newGateData });
    console.log(crimeUpdated);
    return crimeUpdated;
}
    //FindAll returns and object cursor hence must be converted to and array.
async function findAllCrime(){

    let crimeConnection = await crimeCollecting();
    let crimeCursor = await crimeConnection.find({});
    let crimeArray = await crimeCursor.toArray();
    console.log(crimeArray);
    return crimeArray;
}

async function deleteCrimeById(){

    let crimeConnection = await crimeCollecting("crime");
    let crimeCollection = await crimeConnection.deleteOne({ _id: ObjectId(id)});
    console.log(crimeCollection);
    return crimeCollection;
}

module.exports = { createCrime, findCrimeById, updateCrimeById, findAllCrime, deleteCrimeById };