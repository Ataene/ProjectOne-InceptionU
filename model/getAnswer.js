const randomQuestion = require("./api");
const victimGetCorps = require("./victim");
const randomArrayNames = require("./randomNames")

const setName = function(myName){

  victimGetCorps.nameState = myName;
  
  return (`${victimGetCorps.nameState}, you are welcome to CLASSIFIED CRIME SCENE!
  Enter two number that the SUM is equal to the clue number given in class. 
  curl http://localhost:3000/api/number?firstNumber={}&secondNumber={}`);
};

const partOfC8 = function (firstNumber, secondNumber) {

  let myClue = Number(victimGetCorps.clue);
  let result = Number(firstNumber + secondNumber);
  console.log(result);

  if (result === myClue) {
    return (`You know the clue, hence you are part of InceptionU C8, enter the biggest City in Alberta, to continue`);

  } else if (result < myClue) {

    return (`The number is too small continue on curl http://localhost:3000/api/smallNumber`);

  } else if (result > myClue) {

    return (`Continue on http://localhost:3000/api/bigNumber`);

  } else {

    return (`Your math skills is not good enough to start this Classified Crime Scene`);
  }
};

const tooBigNumbers = function(bNumber){

  if ( bNumber >  42 ){
    return (`The required value is 42, think of a sum that add to 42`)
  } else{
    return(`You need some Math skills to learn programming.`)
  }

}

const tooSmallNumbers = function(smallNumber){

  if (smallNumber <  42 ){
    return (`The required CLUE value is 42, think of a sum that add to 42`)
  } else{
    return(`You need some Math skills to learn programming.`)
  }

}

const getCrimePlace = function(getCrime){

  let place = victimGetCorps.crimePlace;
  console.log(place);

  if ( getCrime === place ){
    return(`The City is right. Your Math skill is excellent, enter the ${victimGetCorps.crimeScene}. curl http://localhost:3000/api/user\n`)
  } else if( getCrime === "calgary" ){
    return(`This is not the rigth spelling of this city`)
  } else{
    return(`The city is ${place}`)
  }
};

const crimeUser = function(vName){

  victimGetCorps.victName = vName;

  return(`You are a witness in the movie theatre crime. \n
  The victim of the crime is ${victimGetCorps.victName}, curl http://localhost:3000/api/suspect`);
};

const suspectQuestion = function(){

  let randomName = Math.floor(Math.random() * randomArrayNames.length);
  let randomSuspect = randomArrayNames[randomName];

  return (`${victimGetCorps.security} ${victimGetCorps.police} ${randomSuspect}, is the crime suspect.
  ${randomSuspect}. Answer the next question to continue. curl http://localhost:3000/api/question`);
};


//Function that respond base on the Suspect question
const commitedCrime = function (response) {

  let anyQuestion = Math.floor(Math.random() * randomQuestion.length); //random question
  let answerTF = randomQuestion[anyQuestion].correct_answer; //answer

  if (answerTF === response) {
    return (
      `You did not commit the crime, the crime was commited on ${timeOfCrime()}`
    );
  } else if (answerTF !== response) {
    return (
      `The clues shows you committed the crime. Your court date is on: \n 
      ${timeOfCrime()} you need to call your lawyer, curl http://localhost:3000/lawyer`
    );
  } else {
    return `The judge will look at the case, try again`;
  }

};

const timeOfCrime = function () {
  let crimeDate = new Date();
  return crimeDate;
};

//Judge decide the fate of the Suspect either freed or gail time
const judgeDecision = function (judgeName) {

  let randomName = Math.floor(Math.random() * randomArrayNames.length);
  let randomLaywer = randomArrayNames[randomName];
  let LawyerChar = randomLaywer.split("");
  let judgeChar = judgeName.split("");
  const nameMatch = judgeChar.filter(word => LawyerChar.includes(word));
  let nameConcat = nameMatch.concat();
  victimGetCorps.getLawyer = nameConcat;
  console.log(judgeChar);
  console.log(LawyerChar);
  console.log(nameConcat);
  console.log("The result is " + nameConcat);

  let nameIncludes = victimGetCorps.getLawyer.includes("e");
  if (nameIncludes) {
    victimGetCorps.score = victimGetCorps.score + 1;
    return `Based on the Judge Verdicts, you didn't commit the crime. YOU WON! score : ${victimGetCorps.score}, play again. curl http://localhost:3000/start`;
  } else if (!nameIncludes) {
    victimGetCorps.score = victimGetCorps.score - 1;
    return `Sorry, you lost CHOOSE BETWEEN: Service, jail or runaway. YOU LOSE score : ${victimGetCorps.score}, play again. curl http://localhost:3000/api/start`;
  }
};

const freeJail = function(choose){

  let resChoice = victimGetCorps.choice[0];
  let jailChoice = victimGetCorps.choice[1];
  let runAwayChoice = victimGetCorps.choice[2];

  if (choose === resChoice){  
    
  // let choiceMade =  communityService();
    
    return(`You choose a community serverice: Continue to play curl http://localhost:3000/api/community`);

  } else if(choose === jailChoice){

  // let choiceJail = jailTime();
  return(`You choose to server a jail term: Continue to play curl http://localhost:3000/api/jail`);

    // return(`You choose to server in a jail ${choiceJail}`)

  } else if(choose === runAwayChoice){

    // let runNow = runAway();
    return(`You choose to run away: Continue to play curl http://localhost:3000/api/run`);

    // return(`You choose to run away ${runNow}`);

  } else {
    return(`That is not a valid choice to make.`)
  }
}

const communityService = function(volunteer){
    
  let commChoice = victimGetCorps.sent[0];

  if( volunteer === commChoice ){
    
    return(`You will work free, without pay in the Community for 12 months`)
  } else {
    return (`Please reconsiders your part, best is the answer`)
  }
}

const jailTime = function(jailFree){

let jailName = victimGetCorps.sent[1];

if ( jailName === jailFree ){
  
  return (`You are going to Jail for 3 month with a criminal records`)

} else {

  return(`Are you sure you know what you are doing? That choie is dangerous`)
}
}

const runAway = function(recapture){

let runName = victimGetCorps.sent[2];

if( recapture === runName ){

  return (`The Corps will put out a WANTED ads and your Crime punishment will increase.`)
}

}

// const getName = function(){

//   return victimGetCorps.nameState;
// }
  //Geting the response from the user Inputs.
// const getResponse = function(){

//   return victimGetCorps.response;
// }


module.exports = { commitedCrime, partOfC8, judgeDecision, setName, getCrimePlace, crimeUser, suspectQuestion, communityService, jailTime, freeJail, runAway, tooBigNumbers, tooSmallNumbers };
