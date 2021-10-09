const app = require("../index");
const supertest = require("supertest");

describe("Test the root post path with fail validation", () => {
    test("It should response the POST method with failed validation", async () => {
        await supertest(app).post("/")
            .send({
                "ky": "value" //key is requited in validation...
            })
            .expect(406)
            .then((response) => {
                expect(response.body.status).toBe(false)
            });
    });
});