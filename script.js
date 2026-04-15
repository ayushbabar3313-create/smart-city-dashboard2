const apiKey = "ecb8e736e52d464095bb14771c8fe103";

// Convert AQI level to value
function convertAQI(level) {
  return [0, 50, 100, 150, 200, 300][level];
}

// Mumbai AQI
function getMumbaiAQI() {
  fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=19.0760&lon=72.8777&appid=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    const aqi = convertAQI(data.list[0].main.aqi);
    document.getElementById("mumbai-aqi").innerText = aqi;
  })
  .catch(err => console.log(err));
}

// Oslo AQI
function getOsloAQI() {
  fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=59.9139&lon=10.7522&appid=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    const aqi = convertAQI(data.list[0].main.aqi);
    document.getElementById("oslo-aqi").innerText = aqi;
  })
  .catch(err => console.log(err));
}

// Chart
const ctx = document.getElementById("comparisonChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Transport", "Mobility", "AQI", "Planning", "Sustainability"],
    datasets: [
      {
        label: "Mumbai",
        data: [4, 3, 2, 4, 5]
      },
      {
        label: "Oslo",
        data: [9, 9, 10, 9, 10]
      }
    ]
  }
});

// Time update
function updateTime() {
  const now = new Date();
  document.getElementById("time").innerText = now.toLocaleTimeString();
}

// First call
getMumbaiAQI();
getOsloAQI();
updateTime();

// Auto refresh every 10 sec
setInterval(() => {
  getMumbaiAQI();
  getOsloAQI();
}, 10000);

// Time updates every second
setInterval(updateTime, 1000);
