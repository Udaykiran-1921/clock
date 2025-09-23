
   /* function updateClock() {
      const now = new Date();
      let h = String(now.getHours()).padStart(2, '0');
      let m = String(now.getMinutes()).padStart(2, '0');
      let s = String(now.getSeconds()).padStart(2, '0');
      document.getElementById('clock').textContent = `${h}:${m}:${s}`;
    }
    setInterval(updateClock, 1000);
    updateClock(); // initial call*/
  
let alarms = [];  // store multiple alarms
let alarmActive = false;

function updateClock() {
  const now = new Date();
  let h = now.getHours();
  let m = String(now.getMinutes()).padStart(2, '0');
  let s = String(now.getSeconds()).padStart(2, '0');
  let ampm = h >= 12 ? "PM" : "AM";

  h = h % 12;
  h = h ? h : 12;
  h = String(h).padStart(2, '0');

  const currentTime = `${h}:${m}:${s} ${ampm}`;
  document.getElementById('clock').textContent = currentTime;

   // India (Asia/Kolkata)
  document.getElementById("indiaTime").textContent =
    now.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" });

  // USA (New York)
  document.getElementById("usaTime").textContent =
    now.toLocaleTimeString("en-US", { timeZone: "America/New_York" });

  // Oman (Asia/Muscat)
  document.getElementById("omanTime").textContent =
    now.toLocaleTimeString("en-US", { timeZone: "Asia/Muscat" });

  // Dubai (Asia/Dubai)
  document.getElementById("dubaiTime").textContent =
    now.toLocaleTimeString("en-US", { timeZone: "Asia/Dubai" });

  // Check all alarms
  alarms.forEach(alarm => {
    if (`${h}:${m} ${ampm}` === alarm.time && s === "00" && !alarmActive) {
      startAlarm(alarm);
    }
  });
}

function setAlarm() {
  const timeInput = document.getElementById("alarmTime").value;
  const ampm = document.getElementById("ampm").value;
  const nameInput = document.getElementById("alarmName").value || "Unnamed Alarm";

  if (!timeInput) {
    alert("Please select a valid time!");
    return;
  }

  let [hours, minutes] = timeInput.split(":");
  hours = String((hours % 12) || 12).padStart(2, '0');
  const alarmTime = `${hours}:${minutes} ${ampm}`;

  // Add to alarms array
  alarms.push({ time: alarmTime, name: nameInput });

  // Update UI
  renderAlarms();
  document.getElementById("alarmStatus").textContent = `✅ Alarm added: ${nameInput} (${alarmTime})`;
}

function renderAlarms() {
  const list = document.getElementById("alarmList");
  list.innerHTML = "";
  alarms.forEach((alarm, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${alarm.name}</strong> - ${alarm.time} `;
    const btn = document.createElement("button");
    btn.textContent = "Remove";
    btn.onclick = () => removeAlarm(index);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function removeAlarm(index) {
  alarms.splice(index, 1);
  renderAlarms();
}

function startAlarm(alarm) {
  alarmActive = true;
  const sound = document.getElementById("alarmSound");
  sound.play();
  document.getElementById("alarmStatus").textContent = `🔔 Alarm ringing: ${alarm.name} (${alarm.time})`;
}

function stopAlarm() {
  alarmActive = false;
  const sound = document.getElementById("alarmSound");
  sound.pause();
  sound.currentTime = 0;
  document.getElementById("alarmStatus").textContent = "✅ Alarm stopped";
  window.alert("alarm stopped");
}

setInterval(updateClock, 1000);
updateClock();


/*stop watch js start*/
// Stopwatch Variables
let stopwatchInterval;
let elapsedTime = 0; // in ms
let isRunning = false;

function updateStopwatch() {
  let hours = Math.floor(elapsedTime / 3600000);
  let minutes = Math.floor((elapsedTime % 3600000) / 60000);
  let seconds = Math.floor((elapsedTime % 60000) / 1000);

  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  document.getElementById("stopwatchDisplay").textContent = `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    const startTime = Date.now() - elapsedTime;

    stopwatchInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateStopwatch();
    }, 1000);
  }
}

function stopStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(stopwatchInterval);
  }
}

function resetStopwatch() {
  isRunning = false;
  clearInterval(stopwatchInterval);
  elapsedTime = 0;
  updateStopwatch();
}
/*stop watch js end*/

/*timer js  start*/
// Timer Variables
let timerInterval;
let timerTime = 0; // in ms
let isTimerRunning = false;

function updateTimerDisplay() {
  let hours = Math.floor(timerTime / 3600);
  let minutes = Math.floor((timerTime % 3600) / 60);
  let seconds = timerTime % 60;

  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  document.getElementById("timerDisplay").textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
  if (!isTimerRunning) {
    let h = parseInt(document.getElementById("timerHours").value) || 0;
    let m = parseInt(document.getElementById("timerMinutes").value) || 0;
    let s = parseInt(document.getElementById("timerSeconds").value) || 0;

    if (h === 0 && m === 0 && s === 0 && timerTime === 0) {
      alert("Please set a valid timer.");
      return;
    }

    if (timerTime === 0) {
      timerTime = h * 3600 + m * 60 + s;
    }

    isTimerRunning = true;

    timerInterval = setInterval(() => {
      if (timerTime > 0) {
        timerTime--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        isTimerRunning = false;
        alert("⏰ Timer Finished!");
      }
    }, 1000);
  }
}

function stopTimer() {
  if (isTimerRunning) {
    clearInterval(timerInterval);
    isTimerRunning = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  timerTime = 0;
  updateTimerDisplay();
  document.getElementById("timerHours").value = "";
  document.getElementById("timerMinutes").value = "";
  document.getElementById("timerSeconds").value = "";
}
/*timer ja end*/

// Tab Switching
const footerItems = document.querySelectorAll('.footer-item');
const tabs = document.querySelectorAll('.tab-content');

footerItems.forEach(item => {
  item.addEventListener('click', () => {
    // remove active from all
    footerItems.forEach(f => f.classList.remove('active'));
    tabs.forEach(t => t.classList.remove('active'));

    // add active to clicked one
    item.classList.add('active');
    document.getElementById(item.dataset.target).classList.add('active');
  });
});