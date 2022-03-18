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
        return("Based on the Judge Verdicts, you did not commit the crime." + " Game over, YOU WON!" + "play again. curl http://localhost:3000/start");
    } else if(!nameIncludes) {
        return("Sorry, you lost the case and have been sentenced to 12 months in prision" + " THE END" + " play again. curl http://localhost:3000/start");
    }
    
}

const timeOfCrime = function(){
    
    let crimeDate = new Date();
    return crimeDate;
}

const partOfC8 = function(result){

    let myClue = Number(victimGetCorps.clue);
    
    if( result === myClue ){

        return("You know the clue, hence you are part of InceptionU C8");
    } else if( result < myClue ){

        return("Please think, the number is too small it start with 4");
    } else if( result > myClue ){

        return("This value is too big, try again ask Dannielle for the clue");
    } else {

        return("Your math skills is not good enough to start this Classified Crime Scene");
    }
}

module.exports = { commitedCrime, partOfC8, judgeDecision }
