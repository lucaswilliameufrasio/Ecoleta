import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
    async index(request: Request, response: Response): Promise<Response> {
        const appUrl = process.env.APP_URL || 'http://127.0.0.1:3333';
        const items = await knex('items').select('*');

        const serializedItems = items.map((item) => {
            return {
                id: item.id,
                title: item.title,
                image_url: `${appUrl}/uploads/${item.image}`,
            };
        });

        return response.json(serializedItems);
    }
}

export default ItemsController;
