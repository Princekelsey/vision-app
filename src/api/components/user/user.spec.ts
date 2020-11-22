import { assert } from "chai";
import { User } from "../../../entity/User";
import { TestManager } from "../../../test/testManager";

describe("Test user component", () => {
  const newSuite: TestManager = new TestManager();
  const testUser: User = User.mockUser();

  before(async () => {
    await newSuite.init();
  });

  after(async () => {
    await newSuite.close();
  });

  describe("POST /users/register", () => {
    it("it should not create a new user with an empty request body", (done) => {
      newSuite.app
        .post("/api/v1/users/register")
        .send()
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400, done);
    });

    it("it should validate user email", (done) => {
      newSuite.app
        .post("/api/v1/users/register")
        .send({
          firstName: "test",
          lastName: "testLastName",
          email: "tttt",
          password: "1234567",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400, done);
    });

    it("it should validate user password length", (done) => {
      newSuite.app
        .post("/api/v1/users/register")
        .send({
          firstName: "test",
          lastName: "testLastName",
          email: "test@gmail.com",
          password: "1234",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400, done);
    });

    it("it should create a new user", (done) => {
      newSuite.app
        .post("/api/v1/users/register")
        .send(testUser)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;

            const { status } = res.body;
            const user: User = res.body.data;

            // Assert status
            assert(status === res.status, "status does not match");

            // Assert user
            assert.isObject(user, "user should be an object");

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });

  describe("POST /users/login", () => {
    it("it should not login user with wrong crendentials", (done) => {
      newSuite.app
        .post("/api/v1/users/login")
        .send({ email: "br@gmail.com", password: "12345" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(401, done);
    });

    it("it should login user", (done) => {
      newSuite.app
        .post("/api/v1/users/login")
        .send({ email: testUser.email, password: testUser.password })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throw err;

            const { status } = res.body;
            const user: User = res.body.data;

            // Assert status
            assert(status === res.status, "status does not match");

            // Assert user
            assert.isObject(user, "user should be an object");

            return done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });
});
