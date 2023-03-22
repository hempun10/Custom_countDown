const inputContainer = document.querySelector('#input-container'),
      countdownForm = document.querySelector('#countdownForm'),
      dateEl = document.querySelector('#date-picker');


// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today)