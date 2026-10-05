function getWeather() {
    let city = document.getElementById("city").value;

    fetch("weather.json")
        .then(res => res.json())
        .then(data => {
            let w = data.find(x => x.city.toLowerCase() == city.toLowerCase());

            document.getElementById("result").innerHTML =
                w ? `${w.city}<br>${w.temperature}°C<br>${w.condition}`
                    : "City not found";
        });
}