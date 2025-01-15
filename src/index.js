// fetch query string variables
let cityName = "Glasgow";
const KEY = "6NKFZ3J3JRFQNL6VFGMWD6X8V";

// input
const form = document.querySelector("#weather-form");

// output
const displayCity = document.querySelector("#display-city");
const displayTemperature = document.querySelector("#display-temperature");
const displayFeelsLike = document.querySelector("#display-feels-like");
const displayHumidity = document.querySelector("#display-humidity");
const displayWind = document.querySelector("#display-wind");

/*
 ** Execute logic after the DOM has loaded.
 */
addEventListener("load", () => {
  fetchData();
  form.addEventListener("submit", getFormData);
});

const getFormData = (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  cityName = formData.get("input-city");

  if (cityName === "") cityName = "Glasgow";

  fetchData();
};

async function fetchData() {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=uk&key=${KEY}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }
    const data = await response.json();

    console.log(data.currentConditions);

    displayCity.textContent = cityName;
    displayTemperature.textContent = `Temp: ${data.currentConditions.temp} °C`;
    displayFeelsLike.textContent = `Feels Like: ${data.currentConditions.feelslike} °C`;
    displayHumidity.textContent = `Humidity: ${data.currentConditions.humidity}%`;
    displayWind.textContent = `Wind: ${data.currentConditions.windspeed} MPH`;
  } catch (error) {
    console.log(error);
  }
}
