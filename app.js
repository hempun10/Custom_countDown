const inputContainer = document.querySelector("#input-container"),
  countdownForm = document.querySelector("#countdownForm"),
  dateEl = document.querySelector("#date-picker"),
  coutdownEl = document.querySelector("#countdown"),
  countdownElTitle = document.querySelector("#countdown-title"),
  countdownBtn = document.querySelector("#countdown-button"),
  timeElements = document.querySelectorAll("span");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

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
    // console.log(days,hours,minutes,seconds);

    // Populate Countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide Inpute Container
    inputContainer.hidden = true;

    // Show ccountdown
    coutdownEl.hidden = false;
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
  // Get Number version of current Date and Update DOM
  countdownValue = new Date(countdownDate).getTime();
  // console.log(countdownValue);
  updateDOM();
};


// Reset All Value
const reset =() =>{
    // Hide Countdown
    coutdownEl.hidden = true;
    // Show Input Conatiner
    inputContainer.hidden = false;
    // Close Countdown Interval
    clearInterval(countdownActive);
    // Reset Valuee 
    countdownElTitle =''
    countdownDate = ''
}


// Event Listner
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener('click',reset)
