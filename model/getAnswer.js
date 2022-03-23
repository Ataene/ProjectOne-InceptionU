const randomQuestion = require("./api");
const victimGetCorps = require("./victim");
const randomArrayNames = require("./randomNames")

const getName = function(myName){

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
    return `You know the clue, hence you are part of InceptionU C8`;
  } else if (result < myClue) {
    return `Please think, the number is too small it start with 4`;
  } else if (result > myClue) {
    return `This value is too big, try again ask Dannielle for the clue`;
  } else {
    return `Your math skills is not good enough to start this Classified Crime Scene`;
  }
};

const getCrimePlace = function(getCrime){

  let place = victimGetCorps.crimePlace;
  console.log(getCrime);

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
      `You committed the crime. Your court date is on: \n" 
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
    return `Sorry, you lost the case and sentenced to 12 months in prision. YOU LOSE score : ${victimGetCorps.score}, play again. curl http://localhost:3000/start`;
  }
};

module.exports = { commitedCrime, partOfC8, judgeDecision, getName, getCrimePlace, crimeUser, suspectQuestion };
