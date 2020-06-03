import knex from 'knex';
// import path from 'path';
import { config } from './config';

export const configuration = process.env.NODE_ENV === 'test' ? config.test : config.development;

const connection = knex(configuration);

// const connection = knex({
//     client: 'sqlite3',
//     connection: {
//         filename: path.resolve(__dirname, 'db.sqlite'),
//     },
//     useNullAsDefault: true,
// });

export default connection;
