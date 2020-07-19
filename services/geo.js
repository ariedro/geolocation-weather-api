const rp = require("request-promise");

const IP_API_ROUTE = "http://ip-api.com/json";

const getLocation = (ipAddress) =>
  new Promise((resolve, reject) => {
    if (ipAddress === "::1") ipAddress = ""; // It means we're in localhost, so get the server location
    rp.get(`${IP_API_ROUTE}/${ipAddress}`, { json: true })
      .then(resolve)
      .catch(reject);
  });

module.exports = { getLocation };
