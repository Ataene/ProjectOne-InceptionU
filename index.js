// const readlineSync = require("readline-sync");
const express = require("express");
const randomArrayNames = require("./randomNames");
const randomQuestion = require("./api");
const victimGetCorps = require("./victim");
const { commitedCrime, partOfC8 } = require("./getAnswer");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

    let anyQuestion = Math.floor(Math.random()*randomQuestion.length); //random question
    let quest = randomQuestion[anyQuestion].question; //question
    let answerTF = randomQuestion[anyQuestion].correct_answer; //answer

    // string.charAt(0).toUpperCase() + string.slice(1);
    // let suspectChar = randomSuspect.split("");


app.get("/start", function(req, res){

    res.send("Yes! you just entered a crime scene, follow link to start: " + "curl http://localhost:3000/name?{name=Emman}");
})
app.get("/name", function(req, res){

    let myName = req.query.name;
    victimGetCorps.nameState = myName;
    res.send(victimGetCorps.nameState + " you are welcome to the game! " + "chrome http://localhost:3000/");
})

app.get("/", function(req, res){

    res.sendFile(__dirname + "./index.html");
});

app.post("/", function(req, res){

    let firstNumber = Number(req.body.firstNumber);
    let secondNumber = Number(req.body.secondNumber);
    let result = Number(firstNumber + secondNumber);

    let partOfInceptionC8 = partOfC8(result);
   res.send(partOfInceptionC8);

});

app.get("/crime", function(req, res){

    res.write("You are Welcome to the: " + victimGetCorps.crimeScene + " curl http://localhost:3000/user\n");
    res.send();
    //Follow http://localhost:3000/user?name={yourname}&victom=name
});

app.get("/user", function(req, res){

    let fname = req.query.fname;
    let vname = req.query.vname;

    res.write(fname + " you are a witness in the movie theatre crime. \n");
    res.write("The victim of the crime is: " + vname + " curl http://localhost:3000/suspect");
    res.send();
});

app.get("/suspect", function(req, res){

    let randomName = Math.floor(Math.random()*randomArrayNames.length);
    let randomSuspect = randomArrayNames[randomName];
    res.write(victimGetCorps.security + '\n');
    res.write(victimGetCorps.police + '\n');
    res.write(randomSuspect + ", is the crime suspect.\n");
    res.write(randomSuspect + ", answer True or False to the question below. curl http://localhost:3000/question\n");
    res.send();
})

app.get("/question", function(req, res){

    res.write("Answer True or False to this question: " + quest + " curl localhost:3000/answer");
    res.send();
});

app.get("/answer", function(req, res){

    response = req.query.response;
    console.log(answerTF);
    let crime = commitedCrime()
    res.send(crime + " you need to call your lawyer, " + "curl http://localhost:3000/lawyer" +" to continue");
});

app.get("/lawyer", function(req, res){

    let randomName = Math.floor(Math.random()*randomArrayNames.length);
    let randomLaywer = randomArrayNames[randomName];

    let judgeName = req.query.judgeName;
    // victimGetCorps.getLawyer = judge;
    // judge.charAt(0).toUpperCase() + judge.slice(1)

    // console.log(judge.charAt(0).toUpperCase() + judge.slice(1));
    let LawyerChar = randomLaywer.split("");
    let judgeChar = judgeName.split("");
    const intersection = judgeChar.filter(element => LawyerChar.includes(element));

    console.log(judgeChar);
    console.log(LawyerChar);
    console.log("The result is " + intersection);
    res.send("Yes");
});


app.listen(PORT, function(req, res){

    console.log(`Server is running on port: ${PORT}`)
});