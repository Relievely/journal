import supertest, {Response} from "supertest";
import {app} from '../app';

import {describe, it, expect} from '@jest/globals';
import {ProgressItem, ResponseObject} from "../interfaces";
import {RunResult} from "better-sqlite3";

describe("Progress routes", () => {
    const requestWithSuperTest = supertest(app);

    it("should return all progress items", async () => {
        await requestWithSuperTest
            .get("/progress/")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect((response.body as ResponseObject<ProgressItem>).body).toBeDefined();
            });
    });

    describe("should handle item", () => {
        let newID: number | bigint = 0;

        it("should create new note item", async () => {
            await requestWithSuperTest
                .post("/progress")
                .send({creationDate: 33570923, mood: "Bad"})
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response: Response) => {
                    expect((response.body as ResponseObject<RunResult>).data.value.changes).toBe(1);
                    newID = (response.body as ResponseObject<RunResult>).data.value.lastInsertRowid;
                })
        })

        it(`should return progress item with id`, async () => {
            expect(newID).toBeGreaterThan(0);
            await requestWithSuperTest
                .get(`/progress/${newID}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response: Response) => {
                    expect(response).toBeDefined();
                    expect((response.body as ResponseObject<ProgressItem>).data).toBeDefined();
                    expect((response.body as ResponseObject<ProgressItem>).data.value).toBeDefined();
                    expect((response.body as ResponseObject<ProgressItem>).data.value.id).toBe(newID);
                })
        });

        it(`should update mode of item`, async () => {
            await requestWithSuperTest
                .patch(`/progress/${newID}/mood`)
                .send({mood: "Good", id: newID})
                .expect(200)
                .expect('Content-Type', /json/)
                .then(async (response: Response) => {
                    expect((response.body as ResponseObject<RunResult>).data.value.changes).toBe(1);
                    await requestWithSuperTest
                        .get(`/progress/${newID}`)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .then((getResponse: Response) => {
                            expect((getResponse.body as ResponseObject<ProgressItem>).data.value.mood).toBe("Good");
                        })
                })
        })

        it(`should delete item`, async () => {
            await requestWithSuperTest
                .delete(`/progress/${newID}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then(async (response: Response) => {
                    expect((response.body as ResponseObject<RunResult>).data.value.changes).toBe(1);
                    await requestWithSuperTest
                        .get(`/progress/${newID}`)
                        .expect(404)
                        .expect('Content-Type', /json/)
                        .then((afterDelResponse: Response) => {
                            console.log("Resp: ", afterDelResponse.body);
                            console.log("NewID: ", newID);
                        })
                })
        })
    });

    it.skip("should return the project object with the id 1", async () => {
        await requestWithSuperTest
            .get("/progress/1")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect((response.body as ResponseObject<ProgressItem>).data).toBeDefined();
                expect((response.body as ResponseObject<ProgressItem>).data.value.id).toBeDefined();
            });
    });
});