const inputContainer = document.querySelector("#input-container"),
  countdownForm = document.querySelector("#countdownForm"),
  dateEl = document.querySelector("#date-picker"),
  coutdownEl = document.querySelector("#countdown"),
  countdownElTitle = document.querySelector("#countdown-title"),
  countdownBtn = document.querySelector("#countdown-button"),
  timeElements = document.querySelectorAll("span"),
  completeElinfo = document.querySelector("#complete-info"),
  completeEl = document.querySelector("#complete"),
  completeElBtn = document.querySelector("#complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let savedCountDown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Populate Countdown /Complete UI
const updateDOM = () => {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour); //Get remaning decimal point form days and divide by hour
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide Inpute Container
    inputContainer.hidden = true;

    //If the has ended populate the complete

    if (distance < 0) {
      coutdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElinfo.textContent = `${countdownTitle} finished at ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // Populate Countdown
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      coutdownEl.hidden = false;
    }
  }, second);
};

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// Takes value from Form Input
const updateCountdown = (e) => {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountDown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountDown));
  //   Check for valid date
  if (countdownDate === "") {
    alert("Please Select a date for the countDown");
  } else {
    // Get Number version of current Date and Update DOM
    countdownValue = new Date(countdownDate).getTime();
    // console.log(countdownValue);
    updateDOM();
  }
};

// Reset All Value
const reset = () => {
  // Hide Countdown
  coutdownEl.hidden = true;
  completeEl.hidden = true;
  // Show Input Conatiner
  inputContainer.hidden = false;
  // Close Countdown Interval
  clearInterval(countdownActive);
  // Reset Valuee
  countdownElTitle = " ";
  countdownDate = " ";
  //Remove all value of local storage
  localStorage.removeItem('countdown')
};

const restoreData = () => {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountDown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountDown.title;
    countdownDate = savedCountDown.date;
    // Get Number version of current Date and Update DOM
    countdownValue = new Date(countdownDate).getTime();
    // console.log(countdownValue);
    updateDOM();
  }
};

// Event Listner
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeElBtn.addEventListener("click", reset);



// onload
restoreData();
