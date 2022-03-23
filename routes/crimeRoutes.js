const express = require("express");
const router = express.Router();

const randomArrayNames = require("../model/randomNames");
const randomQuestion = require("../model/api");
const victimGetCorps = require("../model/victim");

const { commitedCrime, partOfC8, judgeDecision, crimePlace } = require("../model/getAnswer");
const { createCrime, findCrimeById, updateCrimeById, findAllCrime, deleteCrimeById } = require("../model/mongoDb");

let anyQuestion = Math.floor(Math.random() * randomQuestion.length); //random question
let quest = randomQuestion[anyQuestion].question; //question
let answerTF = randomQuestion[anyQuestion].correct_answer; //answer

//Start of game
router.get("/start", function (req, res) {

    res.send(`Yes! you just entered a crime scene, follow link to start: curl http://localhost:3000/api/name?{name=Emman}`);
});
//User enter their name
router.get("/name", function (req, res) {
    //Always enter the corresponding name at THE END OF THE QUERY
    let myName = req.query.name;
    victimGetCorps.nameState = myName;

    res.write(`${victimGetCorps.nameState}, you are welcome to CLASSIFIED CRIME SCENE!\n`);
    res.write(`Enter two number that the SUM is equal to the clue number given in class. 
    curl http://localhost:3000/api/number?firstNumber={}&secondNumber={}`);

    res.send();
});

//User enters two number input that the sum is 42.
router.get("/number", function (req, res) {

    let firstNumber = Number(req.query.firstNumber);
    let secondNumber = Number(req.query.secondNumber);
    let result = Number(firstNumber + secondNumber);
    console.log(result);
    let partOfInceptionC8 = partOfC8(result);
    res.send(partOfInceptionC8 + " curl http://localhost:3000/api/crime");
});

//Congratulates user for the knwoledge to enter a CLASSIFIED CRIME SCENE.
router.get("/crime", function (req, res) {

    // let getCrime = req.query.crimePlace;
    // let place = victimGetCorps.crimePlace;
    // if(getCrime === place){
    //     res.send(`The City is not right`)
    // } else if( getCrime === "calgary"){

    //     res.send(`This is not the rigth path of this city`)
    // } else{
    //     res.send(`The city is ${place}`)
    // }
    res.write(`Your Math skill is excellent, enter the ${victimGetCorps.crimeScene}. curl http://localhost:3000/api/user\n`);
    res.send();
});

//Accepts the name of the Victim
router.get("/user", function (req, res) {

    let vname = req.query.vname;

    victimGetCorps.victName = vname;

    res.write(`You are a witness in the movie theatre crime. \n`);
    res.write(`The victim of the crime is ${victimGetCorps.victName}, curl http://localhost:3000/api/suspect`);
    res.send();
});

//Randomly select a Suspect from and arrawy of 30 suspect at the Movie Theather
router.get("/suspect", function (req, res) {

    let randomName = Math.floor(Math.random() * randomArrayNames.length);
    let randomSuspect = randomArrayNames[randomName];
    res.write(victimGetCorps.security + '\n');
    res.write(victimGetCorps.police + '\n');
    res.write(randomSuspect + ", is the crime suspect.\n");
    res.write(randomSuspect + ", Answer the next question to continue. curl http://localhost:3000/api/question\n");
    res.send();
});
//Random Suspect prompted to answer a question to prove innoscene 
router.get("/question", function (req, res) {

    res.write("Answer True or False: " + quest + " curl localhost:3000/api/answer");
    res.send();
});

//Random Suspect answer the question and response is checked against valid argument
router.get("/answer", function (req, res) {

    response = req.query.response;
    console.log("Your answer is: " + response);
    console.log("The correct answer is: " + answerTF);
    let crime = commitedCrime();
    res.send(crime + " http://localhost:3000/api/laywer");
});

//Suspect call his/her lawyer on the court date.
router.get("/lawyer", function (req, res) {

    let judgeName = req.query.judgeName;

    let randomName = Math.floor(Math.random() * randomArrayNames.length);
    let randomLaywer = randomArrayNames[randomName];
    let LawyerChar = randomLaywer.split("");
    let judgeChar = judgeName.split("");
    const nameMatch = judgeChar.filter(word => LawyerChar.includes(word));
    let nameConcat = nameMatch.concat();
    victimGetCorps.getLawyer = nameConcat;
    // console.log(judgeChar);
    // console.log(LawyerChar);
    // console.log(nameConcat);
    console.log("The result is " + nameConcat);
    res.send(judgeDecision());
});

module.exports = router;