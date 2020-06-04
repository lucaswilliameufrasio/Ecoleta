import knex from 'knex';
import { config } from './config';

const currentRunningEnvironment = () => {
    const nodeEnvironmentVariable = process.env.NODE_ENV;

    if (
        nodeEnvironmentVariable === 'test' ||
        nodeEnvironmentVariable === 'development' ||
        nodeEnvironmentVariable === 'production' ||
        nodeEnvironmentVariable === 'staging'
    ) {
        return config[nodeEnvironmentVariable];
    }
    return config.development;
};

const knexConfigBasedOnCurrentEnvironment = currentRunningEnvironment();

export const configuration = knexConfigBasedOnCurrentEnvironment;

const connection = knex(configuration);

export default connection;
