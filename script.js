document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchBtn").addEventListener("click", function () {
        const city = document.getElementById("cityInput").value.trim();
        const apiKey = "6a72c99467794c5b907122435250402";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        if (city === "") {
            alert("Please enter a city name.");
            return;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("API Response:", data); // Debugging log

                if (data.cod === 200) {
                    document.getElementById("cityName").textContent = data.name;
                    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
                    document.getElementById("description").textContent = data.weather[0].description;
                    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                } else {
                    alert("City not found. Please enter a valid city name.");
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                alert("Something went wrong. Check the console for details.");
            });
    });
});
