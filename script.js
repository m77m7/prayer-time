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
    console.log("استخدمت موقعي:", lat, lon);
    getPrayerTimes(lat, lon);
}

function useDefaultLocation() {
    let lat = 30.0444;  
    let lon = 31.2357;
    console.log("استخدمت الموقع الافتراضي (القاهرة):", lat, lon);
    getPrayerTimes(lat, lon);
}

function getPrayerTimes(lat, lon) {
    const url = https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=5;
    console.log("جاري جلب:", url);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("البيانات الراجعة:", data);

            let t = data.data.timings;
            document.getElementById("times").innerHTML = `
                <strong>الفجر:</strong> ${t.Fajr} <br>
                <strong>الظهر:</strong> ${t.Dhuhr} <br>
                <strong>العصر:</strong> ${t.Asr} <br>
                <strong>المغرب:</strong> ${t.Maghrib} <br>
                <strong>العشاء:</strong> ${t.Isha} <br>
            `;
        })
        .catch(err => {
            console.error("خطأ أثناء الجلب:", err);
            document.getElementById("times").innerText = "❌ حصل خطأ في جلب البيانات!";
        });
}
