import supertest, {Response} from "supertest";
import {app} from '../app';

import {describe, it, expect} from '@jest/globals';
import {ProgressItem, ResponseObject} from "../interfaces";

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

    it("should return the project object with the id 1", async () => {
        await requestWithSuperTest
            .get("/progress/1")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect((response.body as ResponseObject<ProgressItem>).body).toBeDefined();
                expect((response.body as ResponseObject<ProgressItem>).body.data.id).toBeDefined();
            });
    });
});