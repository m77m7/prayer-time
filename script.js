
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, useDefaultLocation);
    } else {
        useDefaultLocation(); 
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getPrayerTimes(lat, lon);
}

// لو المستخدم رفض إذن الموقع → نستخدم مكان افتراضي
function useDefaultLocation() {
    // احداثيات القاهرة (غيرها لمكة لو عايز)
    let lat = 30.0444;  
    let lon = 31.2357;
    getPrayerTimes(lat, lon);
}

// دالة تجيب المواقيت من API
function getPrayerTimes(lat, lon) {
    fetch(https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=5)
        .then(response => response.json())
        .then(data => {
            let t = data.data.timings;
            document.getElementById("times").innerHTML = `
                <strong>الفجر:</strong> ${t.Fajr} <br>
                <strong>الظهر:</strong> ${t.Dhuhr} <br>
                <strong>العصر:</strong> ${t.Asr} <br>
                <strong>المغرب:</strong> ${t.Maghrib} <br>
                <strong>العشاء:</strong> ${t.Isha} <br>
            `;
        })
        .catch(err => console.error(err));
}
