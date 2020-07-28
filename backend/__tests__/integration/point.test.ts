import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import { config } from '../../src/database/config';
import path from 'path';

describe('Point', () => {
    beforeEach(async () => {
        await connection.migrate.latest();
    });

    afterEach(async () => {
        await connection.migrate.rollback();
    });

    afterAll(async (done) => {
        await connection.migrate.rollback({ directory: config.test.migrations.directory }, true);
        await connection.destroy();
        done();
    });

    const appURL = process.env.APP_URL || 'http://127.0.0.1:3333';

    const imagePath = path.resolve(__dirname, '..', 'assets', 'roman-kraft-unsplash.jpg');

    const denoPointInfo = {
        name: 'Deno Supermarket',
        email: 'contact@deno.com.br',
        whatsapp: '+5562999999799',
        latitude: -46.81273213,
        longitude: -35.39238112,
        city: 'Natal',
        uf: 'RN',
        items: '1,2,6',
    };

    const alouPointInfo = {
        name: 'Alou Supermarket',
        email: 'contact@alou.com.br',
        whatsapp: '+5562999999999',
        latitude: -46.81273213,
        longitude: -35.39238112,
        city: 'Altamira',
        uf: 'PR',
        items: '1,2,6',
    };

    it('should be able to list all registered points', async () => {
        await connection.seed.run();
        await request(app).post('/points').field(alouPointInfo).attach('image', imagePath);

        await request(app).post('/points').field(denoPointInfo).attach('image', imagePath);

        const cityParam = 'Natal';
        const ufParam = 'RN';
        const itemsParam = '1,2';

        const response = await request(app).get(`/points?city=${cityParam}&uf=${ufParam}&items=${itemsParam}`);

        expect(response.body[0]).toHaveProperty('id', 2);
        expect(response.body[0]).toHaveProperty('name', 'Deno Supermarket');
        expect(response.body[0]).toHaveProperty('email', 'contact@deno.com.br');
        expect(response.body[0]).toHaveProperty('uf', 'RN');
        expect(response.body).toHaveLength(1);
    });

    it('should be able to register a new point', async () => {
        await connection.seed.run();

        const response = await request(app).post('/points').field(denoPointInfo).attach('image', imagePath);

        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('name', 'Deno Supermarket');
        expect(response.body).toHaveProperty('whatsapp', '+5562999999799');
        expect(response.body).toHaveProperty('uf', 'RN');
    });

    it('should be able to return only a specific point', async () => {
        await connection.seed.run();
        await request(app).post('/points').field(denoPointInfo).attach('image', imagePath);

        const response = await request(app).get(`/points/1`);

        const expectedImageURL = `${appURL}/uploads/cb7bfa9e7fae-roman-kraft-unsplash.jpg`;
        const expectedImageName = `cb7bfa9e7fae-roman-kraft-unsplash.jpg`;

        expect(response.body.point).toHaveProperty('id', 1);
        expect(response.body.point).toHaveProperty('name', 'Deno Supermarket');
        expect(response.body.point).not.toHaveProperty('image', expectedImageName);
        expect(response.body.point).not.toHaveProperty('image_url', expectedImageURL);
        expect(response.body.point).toHaveProperty('uf', 'RN');
        expect(response.body.items[0]).toHaveProperty('title', 'Lâmpadas');
        expect(response.body.items).toHaveLength(3);
    });
});