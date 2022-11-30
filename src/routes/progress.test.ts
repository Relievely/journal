import supertest, {Response} from "supertest";
import {app} from '../app';

import {describe, it, expect, beforeAll} from '@jest/globals';
import {NoteItem, ProgressItem, ResponseObject} from "../interfaces";
import {RunResult} from "better-sqlite3";

beforeAll(async () => {
    await supertest(app)
        .get("/create")
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response: Response) => {
            expect((response.body as ResponseObject<NoteItem>).data.length).toBeGreaterThanOrEqual(0);
            expect((response.body as ResponseObject<NoteItem>).data.length).toBeLessThanOrEqual(2);
        });
})

describe("Progress routes", () => {
    const requestWithSuperTest = supertest(app);

    it("should return all progress items", async () => {
        await requestWithSuperTest
            .get("/progress")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect((response.body as ResponseObject<ProgressItem>).body).toBeDefined();
            });
    });

    it("should return Graph progress items", async () => {
        await requestWithSuperTest
            .post("/progress/graph")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect((response.body as ResponseObject<ProgressItem>).body).toBeDefined();
            });
    });
});

describe("should handle item", () => {
    const requestWithSuperTest = supertest(app);

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

    it(`should return Graph progress item with newLIMIT`, async () => {
        await requestWithSuperTest
            .post(`/progress/graph`)
            .send({limit : 3})
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect((response.body as ResponseObject<ProgressItem>).data).toBeDefined();
                expect((response.body as ResponseObject<ProgressItem>).data.value).toBeDefined();
                expect((response.body as ResponseObject<ProgressItem>).data.length).toBe(3);
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
                    .expect('Content-Type', /json/);
            })
    })
});
