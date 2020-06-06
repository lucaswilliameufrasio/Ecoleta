import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
    async index(request: Request, response: Response): Promise<Response> {
        const host = process.env.HOST || '127.0.0.1';
        const items = await knex('items').select('*');

        const serializedItems = items.map((item) => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://${host}:3333/uploads/${item.image}`,
            };
        });

        return response.json(serializedItems);
    }
}

export default ItemsController;
