const inputContainer = document.querySelector('#input-container'),
      countdownForm = document.querySelector('#countdownForm'),
      dateEl = document.querySelector('#date-picker');


let countdownTitle =  '';
let countdownDate = '';
// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today)

// Takes value from Form Input
const updateCountdown =(e) =>{
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value
    
}
// Event Listner
countdownForm.addEventListener('submit',updateCountdown)