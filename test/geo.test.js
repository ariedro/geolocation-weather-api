const request = require("supertest");
const { BASE_ROUTE, app } = require("../index");
const should = require("should");

global.isTest = true;
const FAKE_IP = "181.1.1.1";
const FAKE_LOCATION = "Argentina";

describe("Geolocation API", function() {
  describe("GET /location", function() {
    it("responds with json", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/location`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end(done);
    });
    it("responds with success state", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/location`)
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
        .get(`${BASE_ROUTE}/location`)
        .set("Accept", "application/json")
        .set("X-Forwarded-For", FAKE_IP)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, { body }) => {
          should.not.exist(err);
          should(body).have.property("country");
          should(body).have.property("city");
          done();
        });
    });
    it("responds with a location that corresponds to the ip address provided", function(done) {
      request(app)
        .get(`${BASE_ROUTE}/location`)
        .set("Accept", "application/json")
        .set("X-Forwarded-For", FAKE_IP)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, { body }) => {
          should.not.exist(err);
          should(body.country).equal(FAKE_LOCATION);
          done();
        });
    });
  });
});
