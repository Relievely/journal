import supertest, {Response} from "supertest";
import {app} from '../app';

import {describe, it, expect} from '@jest/globals';
import {ResponseObject} from "../interfaces";

describe("Progress routes", () => {
    const requestWithSuperTest = supertest(app);

    it("should return a 200 response", async () => {
        await requestWithSuperTest
            .get("/progress/")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect((response.body as ResponseObject).body).toBeDefined();
            });
    });
});