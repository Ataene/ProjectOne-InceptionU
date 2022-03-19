const randomQuestion = require("./api");
const victimGetCorps = require("./victim");

//Function that respond base on the Suspect question
const commitedCrime = function(){

    let anyQuestion = Math.floor(Math.random()*randomQuestion.length); //random question
    let quest = randomQuestion[anyQuestion].question; //question
    let answerTF = randomQuestion[anyQuestion].correct_answer; //answer

    if(answerTF === response){
        return (" You did not commit the crime, the crime was commited on " + timeOfCrime());
    } else if(answerTF !== response){
        return (" You committed the crime. Your court date is on: \n" + timeOfCrime() + " you need to call your lawyer, " + "curl http://localhost:3000/lawyer");
    } else {
        return (" The judge will look at the case, try again");
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

    //Judge decide the fate of the Suspect either freed or gail time
const judgeDecision = function(){

    let nameIncludes = victimGetCorps.getLawyer.includes("e");
    if( nameIncludes ){
        victimGetCorps.score = victimGetCorps.score + 1;
        return(`Based on the Judge Verdicts, you didn't commit the crime. YOU WON! score : ${victimGetCorps.score}, play again. curl http://localhost:3000/start`);
    } else if( !nameIncludes ) {
        victimGetCorps.score = victimGetCorps.score - 1;
        return(`Sorry, you lost the case and sentenced to 12 months in prision. YOU LOSE score : ${victimGetCorps.score}, play again. curl http://localhost:3000/start`);
    }
}

module.exports = { commitedCrime, partOfC8, judgeDecision };
