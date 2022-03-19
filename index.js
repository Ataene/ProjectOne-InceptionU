// const readlineSync = require("readline-sync");
const express = require("express");
const randomArrayNames = require("./randomNames");
const randomQuestion = require("./api");
const victimGetCorps = require("./victim");
const { commitedCrime, partOfC8, judgeDecision  } = require("./getAnswer");
// const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

    let anyQuestion = Math.floor(Math.random()*randomQuestion.length); //random question
    let quest = randomQuestion[anyQuestion].question; //question
    let answerTF = randomQuestion[anyQuestion].correct_answer; //answer

app.get("/start", function(req, res){

    res.send("Yes! you just entered a crime scene, follow link to start: " + "curl http://localhost:3000/name?{name=Emman}");
});
app.get("/name", function(req, res){

    let myName = req.query.name;
    victimGetCorps.nameState = myName;
    res.send(victimGetCorps.nameState + " you are welcome to the game! " + "curl http://localhost:3000/");
});

app.get("/number", function(req, res){

    let firstNumber = Number(req.query.firstNumber);
    let secondNumber = Number(req.query.secondNumber);
    let result = Number(firstNumber + secondNumber);
    console.log(result);
    let partOfInceptionC8 = partOfC8(result);
    res.send(partOfInceptionC8);
});

app.get("/crime", function(req, res){

    res.write("Your Math skill is excellent, enter the " + victimGetCorps.crimeScene + " curl http://localhost:3000/user\n");
    res.send();
});

app.get("/user", function(req, res){

    let vname = req.query.vname;
    victimGetCorps.victName = vname;
    res.write(victimGetCorps.nameState + " you are a witness in the movie theatre crime. \n");
    res.write("The victim of the crime is: " + victimGetCorps.victName + " curl http://localhost:3000/suspect");
    res.send();
});

app.get("/suspect", function(req, res){

    let randomName = Math.floor(Math.random()*randomArrayNames.length);
    let randomSuspect = randomArrayNames[randomName];
    res.write(victimGetCorps.security + '\n');
    res.write(victimGetCorps.police + '\n');
    res.write(randomSuspect + ", is the crime suspect.\n");
    res.write(randomSuspect + ", Answer the next question to continue. curl http://localhost:3000/question\n");
    res.send();
});

app.get("/question", function(req, res){

    res.write("Answer True or False: " + quest + " curl localhost:3000/answer");
    res.send();
});

app.get("/answer", function(req, res){

    response = req.query.response;
    console.log(answerTF);
    let crime = commitedCrime();
    res.send(crime + "http://localhost:3000/laywer");
});

app.get("/lawyer", function(req, res){

    let judgeName = req.query.judgeName;
    
    let randomName = Math.floor(Math.random()*randomArrayNames.length);
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


app.listen(PORT, function(req, res){

    console.log(`Server is running on port: ${PORT}`)
});