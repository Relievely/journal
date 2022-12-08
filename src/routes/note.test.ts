import supertest, {Response} from "supertest";
import {app} from '../app';

import {describe, it, expect, beforeAll} from '@jest/globals';
import {NoteItem, ResponseObject} from "../interfaces";
import {RunResult} from "better-sqlite3";

beforeAll(async () => {
    await supertest(app)
        .put("/create")
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response: Response) => {
            expect((response.body as ResponseObject<NoteItem>).data.length).toBeGreaterThanOrEqual(0);
            expect((response.body as ResponseObject<NoteItem>).data.length).toBeLessThanOrEqual(2);
        });
})

describe("Note routes", () => {
    const requestWithSuperTest = supertest(app);

    describe("should handle item", () => {
        let newID: number | bigint = 0;

        it("should create new progress item", async () => {
            await requestWithSuperTest
                .post("/progress")
                .send({creationDate: 33570923, mood: "Bad"})
                .expect(200)
                .expect('Content-Type', /json/)
                .then(async (response: Response) => {
                    const progressValue = (response.body as ResponseObject<RunResult>).data.value;
                    expect(progressValue.changes).toBe(1);
                    const progressID: number | bigint = progressValue.lastInsertRowid;
                    expect(progressID).toBeGreaterThanOrEqual(0);

                    await requestWithSuperTest
                        .post("/note")
                        .send({content: "Placeholder", progressID})
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .then(async (noteResponse: Response) => {
                            const responseValue = (noteResponse.body as ResponseObject<RunResult>).data.value;
                            expect(responseValue.changes).toBe(1);
                            newID = responseValue.lastInsertRowid;

                            expect(newID).toBeGreaterThan(0);
                            await requestWithSuperTest
                                .get(`/note/${newID}`)
                                .expect(200)
                                .expect('Content-Type', /json/)
                                .then((getResponse: Response) => {
                                    expect((getResponse.body as ResponseObject<NoteItem>).data.value.id).toBe(newID);
                                })
                        })
                })
        })

        it(`should update item`, async () => {
            await requestWithSuperTest
                .patch(`/note/${newID}`)
                .send({content: "NewPlaceholder"})
                .expect(200)
                .expect('Content-Type', /json/)
                .then(async (response: Response) => {
                    expect((response.body as ResponseObject<RunResult>).data.value.changes).toBe(1);
                    await requestWithSuperTest
                        .get(`/note/${newID}`)
                        .expect(200)
                        .expect('Content-Type', /json/)
                        .then((getResponse: Response) => {
                            expect((getResponse.body as ResponseObject<NoteItem>).data.value.content).toBe("NewPlaceholder");
                        })
                })
        })

        it(`should delete item`, async () => {
            await requestWithSuperTest
                .delete(`/note/${newID}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then(async (response: Response) => {
                    expect((response.body as ResponseObject<RunResult>).data.value.changes).toBe(1);
                    await requestWithSuperTest
                        .get(`/note/${newID}`)
                        .expect(500)
                        .expect('Content-Type', /json/);
                })
        })
    });

    it("should return all note items", async () => {
        await requestWithSuperTest
            .get("/note")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect((response.body as ResponseObject<NoteItem>).data.length).toBeGreaterThanOrEqual(0);
            });
    });
});