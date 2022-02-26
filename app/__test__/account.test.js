const request = require("supertest");
const server = require("../../utils/server");

const app = server();

describe('Accounts API', () => {
    it("POST /api/account --> created account id", () => {
        return request(app)
        .post("/api/account")
        .send({
            accountname: "my name",
            accountnumber: "1111111111"
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                })
            );
        });
    });

    it("GET /api/account/id --> specific account by id", () => {
        return request(app)
        .get("/api/account/4")
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    status: expect.any(Boolean),
                    message: expect.any(String),
                    data: expect.objectContaining({
                        id: expect.any(Number),
                        accountname: expect.any(String),
                        accountnumber: expect.any(Number),
                        accountbalance: expect.any(Number),
                    })
                })
            )
        })
    }); 

    it("POST /api/account/id/fund --> funded success message", () => {
        return request(app)
        .post("/api/account/4/fund")
        .send({
            amount: 100,
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    status: expect.any(Boolean),
                    message: expect.any(String),
                })
            );
        });
    });

    it("POST /api/account/id/transfer --> transfer success message", () => {
        return request(app)
        .post("/api/account/4/transfer")
        .send({
            amount: 50,
            receiver_account: 14
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    status: expect.any(Boolean),
                    message: expect.any(String),
                })
            );
        });
    });

    it("POST /api/account/id/withdraw --> withdraw success message", () => {
        return request(app)
        .post("/api/account/4/withdraw")
        .send({
            amount: 50,
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    status: expect.any(Boolean),
                    message: expect.any(String),
                })
            );
        });
    });

});