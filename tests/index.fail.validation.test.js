const app = require("../index");
const supertest = require("supertest");

describe("Test the root post path", () => {
    test("It should response the POST method", async () => {
        await supertest(app).post("/")
            .send({
                "ky": "value"
            })
            .expect(406)
            .then((response) => {
                expect(response.body.status).toBe(false)
            });
    });
});