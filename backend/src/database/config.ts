import path from 'path';
import env from '../config/env';

export const config = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: path.resolve(__dirname, 'db.sqlite'),
        },
        migrations: {
            directory: path.resolve(__dirname, 'migrations'),
        },
        seeds: {
            directory: path.resolve(__dirname, 'seeds'),
        },
        useNullAsDefault: true,
    },

    test: {
        client: 'sqlite3',
        connection: ':memory:',
        migrations: {
            directory: path.resolve(__dirname, 'migrations'),
        },
        seeds: {
            directory: path.resolve(__dirname, 'seeds'),
        },
        useNullAsDefault: true,
    },

    staging: {
        client: env.dbClient,
        connection: {
            host: env.host,
            port: env.dbPort,
            database: env.dbDatabase,
            user: env.dbUser,
            password: env.dbPassword,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: path.resolve(__dirname, 'migrations'),
        },
    },

    production: {
        client: env.dbClient,
        connection: {
            host: env.host,
            port: env.dbPort,
            database: env.dbDatabase,
            user: env.dbUser,
            password: env.dbPassword,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};
