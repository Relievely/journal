import supertest, {Response} from "supertest";
import {app} from '../app';

import {describe, it, expect} from '@jest/globals';

describe("Creation routes", () => {
    const requestWithSuperTest = supertest(app);

    it("should create all tables", async () => {
        await requestWithSuperTest
            .get("/create")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
            })
            .catch((err: Error) => {
                expect(err).toBeDefined();
            })
    });
});

