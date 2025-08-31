function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPrayerTimes, showError);
  } else {
    alert("المتصفح لا يدعم تحديد الموقع الجغرافي.");
  }
}

function showPrayerTimes(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const url = https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const timings = data.data.timings;
      let output = "<h2>مواقيت اليوم:</h2><ul>";
      
      for (let prayer in timings) {
        output += <li><strong>${prayer}</strong>: ${timings[prayer]}</li>;
      }
      output += "</ul>";
      document.getElementById("results").innerHTML = output;

      // الصلاة القادمة
      getNextPrayer(timings);
    })
    .catch(error => {
      document.getElementById("results").innerHTML = "❌ حصل خطأ في جلب البيانات!";
      console.error(error);
    });
}

function getNextPrayer(timings) {
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  let nextPrayer = null;
  let nextTime = null;

  for (let prayer in timings) {
    const timeStr = timings[prayer];
    const prayerTime = new Date(${today} ${timeStr});
    
    if (prayerTime > now) {
      nextPrayer = prayer;
      nextTime = prayerTime;
      break;
    }
  }

  if (nextPrayer) {
    const diffMs = nextTime - now;
    const diffMin = Math.floor(diffMs / 1000 / 60);
    document.getElementById("next-prayer").innerText =
      ⏰ الصلاة القادمة: ${nextPrayer} بعد ${diffMin} دقيقة;
  } else {
    document.getElementById("next-prayer").innerText = "✅ انتهت صلوات اليوم.";
  }
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("❌ تم رفض إذن تحديد الموقع.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("⚠ الموقع غير متاح.");
      break;
    case error.TIMEOUT:
      alert("⏳ انتهت مهلة طلب الموقع.");
      break;
    default:
      alert("❌ خطأ غير معروف.");
  }
}