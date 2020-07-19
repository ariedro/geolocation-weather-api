const express = require("express");
const dotenv = require("dotenv");
const logger = require("./helpers/logger");
const {
  getLocation,
  getCurrentWeather,
  getForecastWeather,
} = require("./controllers");

// Init configs
dotenv.config();

const BASE_ROUTE = process.env.BASE_ROUTE || "/v1";
const PORT = process.env.PORT || 3000;

const app = express();

app.set("trust proxy", true);

// Routes

app.get(`${BASE_ROUTE}/location`, function({ ip }, res) {
  logger("Sending location");
  sendResponse(getLocation({ ip }), res);
});

app.get(`${BASE_ROUTE}/current/`, function({ ip }, res) {
  logger("Sending current broadcast");
  sendResponse(getCurrentWeather({ ip }), res);
});

app.get(`${BASE_ROUTE}/current/:city`, function({ params: { city } }, res) {
  logger(`Sending current broadcast from ${city}`);
  sendResponse(getCurrentWeather({ city }), res);
});

app.get(`${BASE_ROUTE}/forecast/`, function({ ip }, res) {
  logger(`Sending forecast`);
  sendResponse(getForecastWeather({ ip }), res);
});

app.get(`${BASE_ROUTE}/forecast/:city`, function({ params: { city } }, res) {
  logger(`Sending forecast from ${city}`);
  sendResponse(getForecastWeather({ city }), res);
});

const sendResponse = (getPromise, res) => {
  getPromise
    .then((current) => res.json(current))
    .catch(({ status, body }) => res.status(status).json(body));
};

app.listen(PORT);
console.log(`Weather and Geolocation API started on port ${PORT}`);

module.exports = { BASE_ROUTE, app };
