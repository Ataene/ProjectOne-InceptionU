const { MongoClient } = require("mongodb");

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
    finally {
        await client.close();
    }
}
    //making a connection to the Database connection to create Document.
async function crimeCollecting(){

    let db = await crimeMongo();
    let crimeCollection = db.collection(crimeName);

    return crimeCollection;
}

async function createCrime(){

    let crimeConnection = await crimeCollecting();
    let crimeResult = await crimeConnection.insertOne({name: "", score: 0})
    return crimeResult;
}