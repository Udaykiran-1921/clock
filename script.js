
   /* function updateClock() {
      const now = new Date();
      let h = String(now.getHours()).padStart(2, '0');
      let m = String(now.getMinutes()).padStart(2, '0');
      let s = String(now.getSeconds()).padStart(2, '0');
      document.getElementById('clock').textContent = `${h}:${m}:${s}`;
    }
    setInterval(updateClock, 1000);
    updateClock(); // initial call*/
  
  let alarmTime = null;
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

  // Check alarm
  if (alarmTime === `${h}:${m} ${ampm}` && s === "00" && !alarmActive) {
    startAlarm();
  }
}

function setAlarm() {
  const timeInput = document.getElementById("alarmTime").value;
  const ampm = document.getElementById("ampm").value;

  if (!timeInput) {
    alert("Please select a valid time!");
    return;
  }

  let [hours, minutes] = timeInput.split(":");
  hours = String((hours % 12) || 12).padStart(2, '0');
  alarmTime = `${hours}:${minutes} ${ampm}`;

  document.getElementById("alarmStatus").textContent = `⏰ Alarm set for ${alarmTime}`;
}

function startAlarm() {
  alarmActive = true;
  const sound = document.getElementById("alarmSound");
  sound.play();
  document.getElementById("alarmStatus").textContent = "🔔 Alarm ringing!";
}

function stopAlarm() {
  alarmActive = false;
  const sound = document.getElementById("alarmSound");
  sound.pause();
  sound.currentTime = 0;
  document.getElementById("alarmStatus").textContent = "✅ Alarm stopped";
}

setInterval(updateClock, 1000);
updateClock();
