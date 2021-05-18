import path from 'path';
import env from '../config/env';
import knex, { Knex } from 'knex';

type KnexConnectionParams = {
    client: string;
    connection?: Record<string, any> | string;
    migrations?: Record<string, any>;
    seeds?: Record<string, any>;
    pool?: Record<string, any>;
    connectionConfig?: {
        connectionString?: string;
        host?: string;
        user?: string;
        port?: number;
        password?: string;
        database?: string;
    };
    useNullAsDefault?: boolean;
};

export type KnexConfig = Record<string, KnexConnectionParams>;

export const config: KnexConfig = {
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
            host: env.dbHost,
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
            host: env.dbHost,
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
