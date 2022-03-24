const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const randomQuestion = require("../model/api");
const { commitedCrime, partOfC8, judgeDecision, setName, getCrimePlace, crimeUser, suspectQuestion, communityService, jailTime, freeJail, runAway, tooSmallNumbers, tooBigNumbers } = require("../model/getAnswer");
const victimGetCorps = require("../model/victim");

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
    let nameReturned = setName(myName);
    res.send(nameReturned);
});

//User enters two number input that the sum is 42.
router.get("/number", function (req, res) {

    let firstNumber = Number(req.query.firstNumber);
    let secondNumber = Number(req.query.secondNumber);
    let partOfInceptionC8 = partOfC8(firstNumber, secondNumber);
    res.send(partOfInceptionC8 + " curl http://localhost:3000/api/crime");
});

    // ALTERNATE ROUTE
    router.get("/bigNumber", function(req, res){

        let bNumber = req.query.bNumber;

        let tBig = tooBigNumbers(bNumber)
        res.send(tBig);
    })

    router.get("/smallNumber", function(req, res){

        let smallNumber = req.query.smallNumber;

        let tSmall = tooSmallNumbers(smallNumber);
        res.send(tSmall);
    })

//Congratulates user for the knwoledge to enter a CLASSIFIED CRIME SCENE.
router.get("/crime", function (req, res) {

    let getCrime = req.query.crimePlace;
    // console.log
    let rightPlace = getCrimePlace(getCrime);
    res.send(rightPlace);
});

//Accepts the name of the Victim
router.get("/user", function (req, res) {

    let vName = req.query.vName;

    let getCrimeUser = crimeUser(vName);

    res.send(getCrimeUser);
});

//Randomly select a Suspect from and arrawy of 30 suspect at the Movie Theather
router.get("/suspect", function (req, res) {

    let suspectQuest = suspectQuestion();
    // console.log(suspectQuest);
    res.send(suspectQuest);
});
//Random Suspect prompted to answer a question to prove innoscene 
router.get("/question", function (req, res) {

    res.send(`Answer True or False: " + ${quest} + " curl localhost:3000/api/answer`);
});

//Random Suspect answer the question and response is checked against valid argument
router.get("/answer", function (req, res) {

    let response = req.query.response;
    victimGetCorps.response = response;
    console.log("Your answer is: " + response);
    console.log("The correct answer is: " + answerTF);

    let crime = commitedCrime(response);
    res.send(crime + " http://localhost:3000/api/laywer");
});

//Suspect call his/her lawyer on the court date.
router.get("/lawyer", function (req, res) {

    let judgeName = req.query.judgeName;

    let giveJudge = judgeDecision(judgeName)
    
    res.send(`${giveJudge} choice between community "Service" or "Jail"`);
});

router.get("/choice", function(req, res){

  let choose = req.query.choose;
  
  let getFreed = freeJail(choose);

  res.send(getFreed);

});

router.get("/community", function(req, res){

    let volunteer = req.query.volunteer;

    let voluteServices = communityService(volunteer);

    res.send(voluteServices);

});

router.get("/jail", function(req, res){

    let jailFree = req.query.jailFree;

    let goingJail = jailTime(jailFree);
    
    res.send(goingJail);
});

router.get("/run", function(){

    let recapture = req.query.recapture;

    let runCaptured = runAway(recapture);
    res.send(runCaptured)

});

module.exports = router;