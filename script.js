
   /* function updateClock() {
      const now = new Date();
      let h = String(now.getHours()).padStart(2, '0');
      let m = String(now.getMinutes()).padStart(2, '0');
      let s = String(now.getSeconds()).padStart(2, '0');
      document.getElementById('clock').textContent = `${h}:${m}:${s}`;
    }
    setInterval(updateClock, 1000);
    updateClock(); // initial call*/
  
    function updateClock() {
      const now = new Date();
      let h = now.getHours();
      let m = String(now.getMinutes()).padStart(2, '0');
      let s = String(now.getSeconds()).padStart(2, '0');
      let ampm = h >= 12 ? "PM" : "AM";

      h = h % 12; // convert to 12-hour format
      h = h ? h : 12; // replace 0 with 12

      h = String(h).padStart(2, '0');

      document.getElementById('clock').textContent = `${h}:${m}:${s} ${ampm}`;
    }
    setInterval(updateClock, 1000);
    updateClock(); // initial call