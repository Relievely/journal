import supertest, {Response} from "supertest";
import {app} from '../app';

import {describe, it, expect} from '@jest/globals';
import {NoteItem, ResponseObject} from "../interfaces";
import {RunResult} from "better-sqlite3";

describe("Note routes", () => {
    const requestWithSuperTest = supertest(app);

    describe("multiple", () => {
        it("should return all note items", async () => {
            await requestWithSuperTest
                .get("/note/")
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response: Response) => {
                    expect((response.body as ResponseObject<NoteItem>).data.length).toBeGreaterThanOrEqual(0);
                });
        });
    })

    describe("should handle item", () => {
        let newID: number | bigint = 0;

        it("should create new note item", async () => {
            await requestWithSuperTest
                .post("/note")
                .send({content: "Placeholder", progressID: 0})
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response: Response) => {
                    expect((response.body as ResponseObject<RunResult>).data.value.changes).toBe(1);
                    newID = (response.body as ResponseObject<RunResult>).data.value.lastInsertRowid;
                })
        })

        it(`should return note item with id`, async () => {
            expect(newID).toBeGreaterThan(0);
            await requestWithSuperTest
                .get(`/note/${newID}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .then((response: Response) => {
                    expect(response).toBeDefined();
                    expect((response.body as ResponseObject<NoteItem>).data).toBeDefined();
                    expect((response.body as ResponseObject<NoteItem>).data.value).toBeDefined();
                    expect((response.body as ResponseObject<NoteItem>).data.value.id).toBe(newID);
                })
        });

        it(`should update item`, async () => {
            await requestWithSuperTest
                .patch(`/note`)
                .send({content: "NewPlaceholder", id: newID})
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
                        .expect('Content-Type', /json/)
                        .then((afterDelResponse: Response) => {
                            console.log("Resp: ", afterDelResponse.body);
                            console.log("NewID: ", newID);
                        })
                })
        })
    });
});