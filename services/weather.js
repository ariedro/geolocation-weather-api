const rp = require("request-promise");
const { formatError } = require("../helpers/error-handler");

const OPENWEATHER_API_ROUTE = "https://api.openweathermap.org/data/2.5";

const getOpenWeatherData = (endpointType, location) =>
  rp.get(`${OPENWEATHER_API_ROUTE}/${endpointType}`, {
    qs: {
      q: location,
      units: "metric",
      lang: "sp",
      appid: process.env.OPENWEATHER_APIKEY,
    },
    json: true,
  });

const formatWeather = (openWeatherResBody) => ({
  status: "success",
  weather: {
    status: openWeatherResBody.weather[0].description,
    temperature: openWeatherResBody.main.temp,
    wind: openWeatherResBody.wind,
  },
  location: openWeatherResBody.name,
});

const formatForecast = (openWeatherResBody) => ({
  status: "success",
  weather: openWeatherResBody.list.map((forecast) => ({
    day: forecast.dt_txt,
    status: forecast.weather[0].description,
    temperature: forecast.main.temp,
    wind: forecast.wind,
  })),
  location: openWeatherResBody.city.name,
});

const getCurrent = (location) =>
  new Promise((resolve, reject) => {
    if (!location)
      return formatError(reject)({ error: { message: "Invalid location" } });

    getOpenWeatherData("weather", location)
      .then((openWeatherRes) => resolve(formatWeather(openWeatherRes)))
      .catch(formatError(reject));
  });

const getForecast = (location) =>
  new Promise((resolve, reject) => {
    if (!location)
      return formatError(reject)({ error: { message: "Invalid location" } });

    getOpenWeatherData("forecast", location)
      .then((openWeatherRes) => resolve(formatForecast(openWeatherRes)))
      .catch(formatError(reject));
  });

module.exports = { getCurrent, getForecast };
