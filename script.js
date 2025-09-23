
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
}

setInterval(updateClock, 1000);
updateClock();
