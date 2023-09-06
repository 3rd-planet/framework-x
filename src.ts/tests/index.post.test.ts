import app from "../index"
import supertest from "supertest"

describe("Test the root post path", () => {
    test("It should response the POST method", async () => {
        await supertest(app)
            .post("/")
            .send({
                key: "value"
            })
            .expect(200)
            .then((response) => {
                expect(response.body.status).toBe(true)
            })
    })
})
