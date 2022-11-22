import supertest, {Response} from "supertest";
import {app} from '../app';

import {describe, it, expect} from '@jest/globals';

describe("Creation routes", () => {
    const requestWithSuperTest = supertest(app);

    it("should return a 200 response", async () => {
        await requestWithSuperTest
            .get("/create")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
            });
    });
});

