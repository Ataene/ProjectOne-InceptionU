// const readlineSync = require("readline-sync");
const express = require("express");
const randomArrayNames = require("./randomNames");
const randomQuestion = require("./api");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

    let anyQuestion = Math.floor(Math.random()*randomQuestion.length); //random question
    let quest = randomQuestion[anyQuestion].question; //question
    let answerTF = randomQuestion[anyQuestion].correct_answer; //answer

    let victimGetCorps = {
        crimeScene: "movie theatre",
        clue: 42,
        security: "Security calls 911",
        police: "Corps, who stole the iPhone?",
        getPolice: function(){
            let findMoney = "Who stole the $100";
            return findMoney;
        }
    }

app.get("/", function(req, res){

    res.sendFile(__dirname + "./index.html");
});

app.post("/", function(req, res){

    let firstNumber = Number(req.body.firstNumber);
    let secondNumber = Number(req.body.secondNumber);
    let result = Number(firstNumber + secondNumber);

    let myClue = Number(victimGetCorps.clue)

    if( result === myClue ){

        res.send("You are part of InceptionU C8");
    } else if( result < myClue ){

        res.send("Please think, the number is too small");
    } else if( result > myClue ){

        res.send("This value is too big, try again");
    } else {

        res.send("Your math skills is not good enough to start this Classified Crime Scene");
    }

});

app.get("/crime", function(req, res){

    res.write("You are Welcome to the: " + victimGetCorps.crimeScene + "!\n");
    res.write("Enter your name and crime victim to start the game.");
    res.send();
    //Follow http://localhost:3000/user?name={yourname}&victom=name
});

app.get("/user", function(req, res){

    let fname = req.query.fname;
    let vname = req.query.vname;

    res.write(fname + " you are a witness in the movie theatre crime. \n");
    res.write("The victim of the crime is: " + vname);
    res.send();
    //Follow http://localhost:3000/suspect
});

app.get("/suspect", function(req, res){

    let randomName = Math.floor(Math.random()*randomArrayNames.length);
    let randomSuspect = randomArrayNames[randomName];
    res.write(victimGetCorps.security + '\n');
    res.write(victimGetCorps.police + '\n');
    res.write(randomSuspect + ", is the crime suspect.\n");
    res.write(randomSuspect + ", answer True or False to the question below.\n");
    res.send();
    //Follow http://localhost:3000/answer

})

app.get("/question", function(req, res){

    res.write("Answer True or False to this question: " + quest);
    res.send();
});

app.get("/answer", function(req, res){

    response = req.query.response;
    // string.charAt(0).toUpperCase() + string.slice(1);
        console.log(answerTF);
        if(answerTF === response){
            res.write(" You did not commit the crime\n");
        } else if(answerTF !== response){
            res.write(" You committed the crime it's game over, jail time\n");
        }
    res.send()
})
    // let suspectChar = randomSuspect.split("");

    app.listen(PORT, function(req, res){

    console.log(`Server is running on port: ${PORT}`)
});