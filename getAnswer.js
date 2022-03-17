const randomQuestion = require("./api");

const commitedCrime = function(){

    let anyQuestion = Math.floor(Math.random()*randomQuestion.length); //random question
    let quest = randomQuestion[anyQuestion].question; //question
    let answerTF = randomQuestion[anyQuestion].correct_answer; //answer

    if(answerTF === response){
        return (" You did not commit the crime, the crime was commited at " + timeOfCrime());
    } else if(answerTF !== response){
        return (" You committed the crime it's game over! Your court date is on: \n" + timeOfCrime());
    }
}


const timeOfCrime = function(){
    
    let crimeDate = new Date();
    return crimeDate;
}

module.exports = {
    commitedCrime, 
    timeOfCrime
}
