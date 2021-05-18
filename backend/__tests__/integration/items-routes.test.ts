import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import { config } from '../../src/database/config';

describe('Point', () => {
    beforeEach(async () => {
        await connection.migrate.latest();
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    afterAll(async (done) => {
        await connection.migrate.rollback({ directory: config.test.migrations?.directory }, true);
        await connection.destroy();
        done();
    });

    it('should be able to list all items', async () => {
        await connection.seed.run();

        const response = await request(app).get(`/items`);

        expect(response.body[2]).toHaveProperty('title', 'Papéis e Papelão');
        expect(response.body[4]).toHaveProperty('title', 'Residuos Orgânicos');
        expect(response.body).toHaveLength(6);
    });
});
