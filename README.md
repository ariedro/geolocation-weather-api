# Weather and Geolocation API

This is an example of a weather and geolocation API software done in NodeJS

## Endpoints

### Geolocation

- Get information about the IP address :  `GET /v1/location`

### Weather

- Get the current broadcast : `GET /v1/current[/city]`

- Get the next 5 days forecast : `GET /v1/forecast[/city]`

## Install


1. Install [NodeJS v12](https://nodejs.org/en/download/) with `npm`
2. Install the dependencies
   ```
   npm install
   ```

3. Set the `.env` file for the OpenWeather API key, as it follows:
   ```
   OPENWEATHER_APIKEY=[YOUR_API_KEY_HERE]
   ```

   As this is an example, you can use the one    included in `.env.example`, running:
   ```
   $ cp .env.example .env
   ```

## Run in development mode

```
npm run dev
```

## Run tests

```
npm run test
```

## Deploy

This program can be deployed on any server that meets the technical requirements, to run on a normal process:

```
npm run start
```

## Author

[Ariel Leandro Aguirre](mailto:ariedro@gmail.com)