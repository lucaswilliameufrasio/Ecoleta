export = {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 3333,
    appUrl: process.env.APP_URL || 'http://localhost:3333',
    dbClient: process.env.DB_CLIENT || 'pg',
    dbPort: process.env.DB_PORT || '5432',
    dbDatabase: process.env.DB_DATABASE || 'ecoleta',
    dbUser: process.env.DB_USERNAME || 'postgres',
    dbPassword: process.env.DB_USERNAME || '',
};
