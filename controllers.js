const geo = require("./services/geo");
const weather = require("./services/weather");

const getLocation = ({ ip }) => geo.getLocation(ip);

const getCurrentWeather = async ({ city, ip }) => {
  if (!city) city = (await geo.getLocation(ip)).city;
  return weather.getCurrent(city);
};

const getForecastWeather = async ({ city, ip }) => {
  if (!city) city = (await geo.getLocation(ip)).city;
  return weather.getForecast(city);
};

module.exports = { getLocation, getCurrentWeather, getForecastWeather };
