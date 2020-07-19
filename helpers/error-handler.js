const logger = require("./logger");

const errorsTranslations = {
  default: "Ha ocurrido un error",
  "city not found": "Ciudad no encontrada",
  "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.":
    "La API key de OpenWeather es inválida",
};

const formatError = (reject) => (error) => {
  try {
    const errorMessage = error.error.message;
    logger(errorMessage);
    reject({
      status: 400,
      body: {
        status: "error",
        message: errorsTranslations[errorMessage] || errorsTranslations.default,
      },
    });
  } catch (error) {
    logger(error);
    reject({
      status: 500,
      body: { status: "error", message: errorsTranslations.default },
    });
  }
};

module.exports = { formatError };
