const request = require("supertest");
const { BASE_ROUTE, app } = require("../index");
const should = require("should");

global.isTest = true;
const FAKE_IP = "181.1.1.1";
const FAKE_LOCATION = "Buenos Aires";
const FIVE_DAYS = 1000 * 60 * 60 * 24;

describe("Weather API", function() {
  this.timeout(5000);
  describe("GET /current", function() {
    it("responds with json", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/current`)
        .set("X-Forwarded-For", FAKE_IP)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end(done);
    });
    it("responds with success state", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/current`)
        .set("Accept", "application/json")
        .set("X-Forwarded-For", FAKE_IP)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, { body }) => {
          should.not.exist(err);
          should(body.status).equal("success");
          done();
        });
    });
    it("responds with properly formatted data", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/current`)
        .set("Accept", "application/json")
        .set("X-Forwarded-For", FAKE_IP)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, { body }) => {
          should.not.exist(err);
          should(body).have.property("weather");
          should(body.weather).have.property("status");
          should(body.weather).have.property("temperature");
          should(body.weather).have.property("wind");
          should(body).have.property("location");
          done();
        });
    });
  });
  describe("GET /current/:city", function() {
    it("responds with success state", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/current/${FAKE_LOCATION}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, { body }) => {
          should.not.exist(err);
          should(body.status).equal("success");
          done();
        });
    });
    it("responds with data from that city", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/current/${FAKE_LOCATION}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, { body }) => {
          should.not.exist(err);
          should(body.location).equal(FAKE_LOCATION);
          done();
        });
    });
  });
  describe("GET /forecast", function() {
    it("responds with json", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/forecast`)
        .set("Accept", "application/json")
        .set("X-Forwarded-For", FAKE_IP)
        .expect("Content-Type", /json/)
        .end(done);
    });
    it("responds with success state", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/forecast`)
        .set("Accept", "application/json")
        .set("X-Forwarded-For", FAKE_IP)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, { body }) => {
          should.not.exist(err);
          should(body.status).equal("success");
          done();
        });
    });
    it("responds with properly formatted data", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/forecast`)
        .set("Accept", "application/json")
        .set("X-Forwarded-For", FAKE_IP)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, { body }) => {
          should.not.exist(err);
          should(body).have.property("weather");
          should(body.weather[0]).have.property("day");
          should(body.weather[0]).have.property("status");
          should(body.weather[0]).have.property("temperature");
          should(body.weather[0]).have.property("wind");
          should(body).have.property("location");
          done();
        });
    });
    it("responds with forecast until 5 days from now", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/forecast`)
        .set("Accept", "application/json")
        .set("X-Forwarded-For", FAKE_IP)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, { body }) => {
          should.not.exist(err);
          const dateDifference =
            new Date(body.weather[body.weather.length - 1].day).getTime() -
            new Date().getTime();
          should(dateDifference).be.greaterThan(FIVE_DAYS);
          done();
        });
    });
  });
  describe("GET /forecast/:city", function() {
    it("responds with success state", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/forecast/${FAKE_LOCATION}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, { body }) => {
          should.not.exist(err);
          should(body.status).equal("success");
          done();
        });
    });
    it("responds with data from that city", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/forecast/${FAKE_LOCATION}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, { body }) => {
          should.not.exist(err);
          should(body.location).equal(FAKE_LOCATION);
          done();
        });
    });
  });
});
