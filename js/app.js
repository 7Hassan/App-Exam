//create and get elements
let qestionsAll = document.querySelector(".num-qestion").lastChild;
let qestionNum = document.querySelector(".num-qestion").firstChild;
let qestion = document.querySelector("h1");
let inputs = [...document.querySelectorAll("input")];
let answers = [...document.querySelectorAll(".label-answer")];
let buttom = document.querySelector("button");
let divQestion = document.querySelector(".qestion");
let minutesSpan = document.querySelector(".min");
let secoundSpan = document.querySelector(".sec");
let counter = 0;
let correctAnswer = 0;

getData();

// get data and set it in the page
function getData() {
  timer(2, 0);
  setData(data, data.length);
  click(data, data.length);
}
// set function to set data
function setData(objectData, qestionsNumber) {
  qestionsAll.textContent = qestionsNumber;
  qestionNum.textContent = counter + 1;
  qestion.innerHTML = objectData[counter].qestion + " ?";
  for (var i = 0; i < answers.length; i++) {
    answers[i].innerHTML = objectData[counter]["answer0" + (i + 1)];
    inputs[i].dataset.answer = objectData[counter]["answer0" + (i + 1)];
    inputs[i].checked = false;
  }
}
// on click on buttom
function click(objectData, qestionsNumber) {
  buttom.addEventListener("click", function () {
    if (counter === 8) {
      end();
    } else {
      getAnswer(objectData);
      counter++;
      setData(objectData, qestionsNumber);
    }
  });
}

// get final answer
function getAnswer(objectData) {
  for (var i = 0; i < answers.length; i++) {
    if (inputs[i].checked === true) {
      if (inputs[i].dataset.answer === objectData[counter].right_answer) {
        correctAnswer++;
      }
    }
  }
}

// set exam time
function timer(minutes, secounds) {
  let showMen, showSec;
  let countDownTimer = setInterval(() => {
    showMen = minutes < 10 ? `0${minutes}` : minutes;
    showSec = secounds < 10 ? `0${secounds}` : secounds;
    minutesSpan.innerHTML = showMen;
    secoundSpan.innerHTML = showSec;
    secounds--;
    if (secounds < 0 && minutes !== 0) {
      minutes--;
      secounds = 59;
    }
    if ((minutes === 0 && secounds < 0) || counter == 8) {
      clearInterval(countDownTimer);
      return end();
    }
  }, 1000);
}

// end the exam
function end() {
  divQestion.remove();
  let divEnd = document.createElement("div");
  divEnd.className = "end";
  if (correctAnswer >= 6) {
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    h2.textContent = "Congratulations";
    p.innerHTML = `${correctAnswer} <i class="fa-sharp fa-solid fa-circle-check"></i>`;
    divEnd.appendChild(h2);
    divEnd.appendChild(p);
  } else {
    let h3 = document.createElement("h3");
    h3.textContent = "Sorry, try again.";
    divEnd.appendChild(h3);
  }
  document.body.appendChild(divEnd);
}
