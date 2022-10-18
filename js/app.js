//create and get elements
let qestionsAll = document.querySelector(".num-qestion").lastChild;
let qestionNum = document.querySelector(".num-qestion").firstChild;
let qestion = document.querySelector("h1");
let inputs = [...document.querySelectorAll("input")];
let answers = [...document.querySelectorAll(".label-answer")];
let divQestion = document.querySelector(".qestion");
let minutesSpan = document.querySelector(".min");
let secoundSpan = document.querySelector(".sec");
let counter = 0;
let correctAnswer = 0;

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

// end the exam
function end() {
  document.querySelector(".holder").remove();
  divQestion.remove();
  let divEnd = document.createElement("div");
  divEnd.className = "end";
  if (correctAnswer >= 6) {
    let h2 = document.createElement("h2");
    let span = document.createElement("span");
    span.textContent = "♥";
    span.style.color = "red";
    let p = document.createElement("p");
    h2.innerHTML = "Congratulations ";
    h2.appendChild(span);
    p.innerHTML = `${correctAnswer} <i class="fa-sharp fa-solid fa-circle-check"></i>`;
    divEnd.appendChild(h2);
    divEnd.appendChild(p);
  } else {
    let h3 = document.createElement("h3");
    h3.textContent = "Sorry, you filled.";
    divEnd.appendChild(h3);
  }
  document.body.appendChild(divEnd);
}

// on click on buttom
function clickButtom(objectData, qestionsNumber) {
  counter++;
  if (counter == qestionsNumber) {
    end();
  } else {
    getAnswer(objectData);
    setData(objectData, qestionsNumber);
  }
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
    if ((minutes == 0 && secounds < 0) || counter == data.length) {
      clearInterval(countDownTimer);
      return end();
    }
  }, 1000);
}
// hidden element
function hiddenEle(ele) {
  ele.id = "";
}
function readyButton(ele) {
  timer(2, 0);
  hiddenEle(ele.parentElement);
  divQestion.id = "show";
  setData(data, data.length);
}

function dark(ele) {
  let svg = document.querySelector("svg path");
  console.log(svg.attributes[1].textContent);
  // Dark
  if (!ele.children[0].classList.contains("dark-mood")) {
    ele.children[0].classList.remove("rotate");
    ele.children[0].classList.add("dark-mood");
    ele.children[1].classList.add("rotate");
    ele.children[1].classList.remove("rotate-reverse");
    document.body.classList.add("dark");
    svg.attributes[0].textContent = "#1c1b33";
    svg.attributes[1].textContent = ".5";
  }
  // shine
  else {
    ele.children[0].classList.replace("dark-mood", "rotate");
    ele.children[1].classList.replace("rotate", "rotate-reverse");
    document.body.classList.remove("dark");
    svg.attributes[0].textContent = "#0075ff";
    svg.attributes[1].textContent = "1";
  }
}
