"use strict";

// DOM Elements
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus"),
  dateNow = moment(); 
  

// Options
// const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  // const amPm = hour >= 12 ? "PM" : "AM";

  // 12hr Format
  // hour = hour % 24 || 24;

  // Output Time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(
    min
  )}<span>:</span>${addZero(sec)} `;

  setTimeout(showTime, 1000);
}

// ${showAmPm ? amPm : ""}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = "Bonne Matinée, ";
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = "Bon Après-Midi, ";
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = "Good Evening, ";
    document.body.style.color = "white";
  }
}

// Get Name
function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Entrez votre Nom]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

// Set Name
function setName(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Entrez Votre Objectif]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === "keypress") {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("focus", e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem("focus", e.target.innerText);
  }
}

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

// Show Date
function showDayDate () {
  const day = document.getElementById('showDayDate')
  dateNow.locale("fr");
  day.innerHTML = `${dateNow.format("dddd D MMMM YYYY")}`
}

// Display weather 
const button = document.querySelector('.button')
const inputValue = document.querySelector('.inputValue')
const names = document.querySelector('.names')
const desc = document.querySelector('.desc')
const temp = document.querySelector('.temp')

button.addEventListener('click', function(){
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=metric&apikey=bcd0539b765b88e19cd2c91b99b34ddc')
  .then(response => response.json())
  .then(data => {
    const namesValue = data['name'];
    const tempValue = data['main']['temp'];
    const temperature = Math.round(tempValue)
    const descValue = data['weather'][0]['description']
    names.innerHTML = namesValue;
    temp.innerHTML = temperature + ' celsius';
    desc.innerHTML = descValue; 
    })
.catch(err => alert('Wrong city name'))
})


// Run
showTime();
setBgGreet();
getName();
getFocus();
showDayDate();
