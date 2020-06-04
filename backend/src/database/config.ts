import path from 'path';
console.log(process.env.APP_URL);
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
        connection: {
            filename: path.resolve(__dirname, 'test.sqlite'),
        },
        migrations: {
            directory: path.resolve(__dirname, 'migrations'),
        },
        seeds: {
            directory: path.resolve(__dirname, 'seeds'),
        },
        useNullAsDefault: true,
    },

    staging: {
        client: process.env.DB_CLIENT ?? 'pg',
        connection: {
            host: process.env.DB_HOST ?? '127.0.0.1',
            port: process.env.DB_PORT ?? '5432',
            database: process.env.DB_DATABASE ?? '',
            user: process.env.DB_USERNAME ?? 'postgres',
            password: process.env.DB_PASSWORD ?? '',
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
        client: process.env.DB_CLIENT ?? 'pg',
        connection: {
            host: process.env.DB_HOST ?? '127.0.0.1',
            port: process.env.DB_PORT ?? '5432',
            database: process.env.DB_DATABASE ?? '',
            user: process.env.DB_USERNAME ?? 'postgres',
            password: process.env.DB_PASSWORD ?? '',
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
