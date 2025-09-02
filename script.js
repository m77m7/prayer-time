function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("المتصفح لا يدعم تحديد الموقع.");
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    // استدعاء API مواقيت الصلاة
    fetch(https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=5)
        .then(response => response.json())
        .then(data => {
            let t = data.data.timings;
            document.getElementById("times").innerHTML = `
                <strong>الفجر:</strong> ${t.Fajr} <br>
                <strong>الظهر:</strong> ${t.Dhuhr} <br>
                <strong>العصر:</strong> ${t.Asr} <br>
                <strong>المغرب:</strong> ${t.Maghrib} <br>
                <strong>العشاء:</strong> ${t.Isha}
            `;
        })
        .catch(err => console.error(err));
}

function showError(error) {
    alert("فشل في الحصول على الموقع: " + error.message);
}