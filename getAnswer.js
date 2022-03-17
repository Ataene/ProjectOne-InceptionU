const randomQuestion = require("./api");
const victimGetCorps = require("./victim");


const commitedCrime = function(){

    let anyQuestion = Math.floor(Math.random()*randomQuestion.length); //random question
    let quest = randomQuestion[anyQuestion].question; //question
    let answerTF = randomQuestion[anyQuestion].correct_answer; //answer

    if(answerTF === response){
        return (" You did not commit the crime, the crime was commited at " + timeOfCrime());
    } else if(answerTF !== response){
        return (" You committed the crime it's game over! Your court date is on: \n" + timeOfCrime() + " you need to call your lawyer, " + "curl http://localhost:3000/lawyer");
    } else {
        return (" The judge will next to look at the case, try again");
    }
}

const judgeDecision = function(){

    let nameIncludes = victimGetCorps.getLawyer.includes("e");
    if(nameIncludes){
        return("Yes you are on it")
    } else if(!nameIncludes) {
        return("No, you have been sentence to 12months in prision");
    }
    
}

const timeOfCrime = function(){
    
    let crimeDate = new Date();
    return crimeDate;
}

const partOfC8 = function(result){

    let myClue = Number(victimGetCorps.clue);
    // let result = Number(firstNumber + secondNumber);
    if( result === myClue ){

        return("You are part of InceptionU C8");
    } else if( result < myClue ){

        return("Please think, the number is too small");
    } else if( result > myClue ){

        return("This value is too big, try again");
    } else {

        return("Your math skills is not good enough to start this Classified Crime Scene");
    }
}

module.exports = { commitedCrime, partOfC8, judgeDecision }
