const app = require("../index")
const supertest = require("supertest")

describe("Test the root path", () => {
    test("It should response the GET method", async () => {
        await supertest(app)
            .get("/")
            .expect(200)
            .then((response) => {
                expect(response.body.status).toBe(true)
            })
    })
})
