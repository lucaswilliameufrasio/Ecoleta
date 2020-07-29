import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import { config } from '../../src/database/config';
import { mockPoints } from '../mocks';
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

    it('should be able to list all registered points', async () => {
        await connection.seed.run();

        const point = mockPoints;

        await request(app).post('/points').field(point).attach('image', imagePath);

        const cityParam = encodeURI(point.city);
        const ufParam = point.uf;
        const itemsParam = point.items;

        const response = await request(app).get(`/points?city=${cityParam}&uf=${ufParam}&items=${itemsParam}`);

        expect(response.body[0]).toHaveProperty('name', point.name);
        expect(response.body[0]).toHaveProperty('whatsapp', point.whatsapp);
        expect(response.body[0]).toHaveProperty('uf', point.uf);
    });

    it('should be able to register a new point', async () => {
        await connection.seed.run();

        const point = mockPoints;

        const response = await request(app).post('/points').field(point).attach('image', imagePath);

        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('name', point.name);
        expect(response.body).toHaveProperty('whatsapp', point.whatsapp);
        expect(response.body).toHaveProperty('uf', point.uf);
    });

    it('should be able to return only a specific point', async () => {
        await connection.seed.run();

        const point = mockPoints;

        await request(app).post('/points').field(point).attach('image', imagePath);

        const response = await request(app).get(`/points/1`);

        const expectedImageURL = `${appURL}/uploads/cb7bfa9e7fae-roman-kraft-unsplash.jpg`;
        const expectedImageName = `cb7bfa9e7fae-roman-kraft-unsplash.jpg`;

        expect(response.body.point).toHaveProperty('id', 1);
        expect(response.body.point).toHaveProperty('name', point.name);
        expect(response.body.point).not.toHaveProperty('image', expectedImageName);
        expect(response.body.point).not.toHaveProperty('image_url', expectedImageURL);
        expect(response.body.point).toHaveProperty('uf', point.uf);
        expect(response.body.items[0]).toHaveProperty('title', 'Lâmpadas');
        expect(response.body.items).toHaveLength(3);
    });
});
