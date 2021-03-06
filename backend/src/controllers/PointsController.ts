import { Request, Response } from 'express';
import knex from '../database/connection';

const appUrl = process.env.APP_URL || 'http://127.0.0.1:3333';

class PointsController {
    async index(request: Request, response: Response): Promise<Response> {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map((item) => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map((point) => {
            return {
                ...point,
                image_url: `${appUrl}/uploads/${point.image}`,
            };
        });

        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not found.' });
        }

        const serializedPoint = {
            ...point,
            image_url: `${appUrl}/uploads/${point.image}`,
        };

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ point: serializedPoint, items });
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;

        const trx = await knex.transaction();

        if (!request.file) {
            return response.status(400).json({
                error: 'Bad request',
                message: '"image" is required',
                validation: {
                    source: 'file',
                    keys: ['image'],
                },
            });
        }

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const insertedIds = await trx('points').insert(point).returning('id');

        const point_id = insertedIds[0];

        if (!point_id) {
            return response.status(418).json({
                error: 'Error during point creation',
                message: "I really don't know",
            });
        }

        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id: point_id,
                };
            });

        await trx('point_items').insert(pointItems);

        await trx.commit();

        return response.json({
            id: point_id,
            ...point,
        });
    }
}

export default PointsController;
