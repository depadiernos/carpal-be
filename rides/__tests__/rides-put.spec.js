const supertest = require("supertest");
const server = require("../../index");
const db = require("../../database/db-config");

beforeEach(async () => {
    await db.seed.run();
});

const token = global.token

describe("Rides-PUT-Router", () => {
    it("returns 200 OK", async () => {
        const res = await supertest(server)
            .put("/users/rides/1")
            .send({
                start_location_id: 1,
                end_location_id: 2,
                status: "pending"
            })
            .set({ authorization: token });

        expect(res.status).toBe(200);
        expect(res.type).toEqual("application/json");
    });
});
