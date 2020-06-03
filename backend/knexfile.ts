// Update with your config settings.
// import path from 'path';
import { config } from './src/database/config';

module.exports = config;
// module.exports = {
//     development: {
//         client: 'sqlite3',
//         connection: {
//             filename: path.resolve(__dirname, 'src', 'database', 'db.sqlite'),
//         },
//         migrations: {
//             directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
//         },
//         seeds: {
//             directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
//         },
//         useNullAsDefault: true,
//     },

//     test: {
//         client: 'sqlite3',
//         connection: {
//             filename: path.resolve(__dirname, 'src', 'database', 'test.sqlite'),
//         },
//     },

//     staging: {
//         client: 'postgresql',
//         connection: {
//             database: 'ecoleta',
//             user: 'username',
//             password: 'password',
//         },
//         pool: {
//             min: 2,
//             max: 10,
//         },
//         migrations: {
//             tableName: 'knex_migrations',
//         },
//     },

//     production: {
//         client: 'postgresql',
//         connection: {
//             database: 'ecoleta',
//             user: 'username',
//             password: 'password',
//         },
//         pool: {
//             min: 2,
//             max: 10,
//         },
//         migrations: {
//             tableName: 'knex_migrations',
//         },
//     },
// };
