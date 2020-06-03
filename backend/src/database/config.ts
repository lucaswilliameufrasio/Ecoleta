import path from 'path';
// import Knex from 'knex';

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
        client: 'postgresql',
        connection: {
            database: 'ecoleta',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'ecoleta',
            user: 'username',
            password: 'password',
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

// const instance: Knex = Knex(configuration as Knex.Config);

// export const knexCurrentDatabase = (): Knex => instance;
