import knex from 'knex';
import { config } from './config';

const currentRunningEnvironment = () => {
    const environments = ['test', 'development', 'production', 'staging'];

    const nodeEnvironmentVariable: string | undefined = process.env.NODE_ENV;

    if (
        environments.findIndex((value) => nodeEnvironmentVariable === value) !== -1 &&
        nodeEnvironmentVariable !== undefined
    ) {
        return config[nodeEnvironmentVariable];
    }
    return config.development;
};

const knexConfigBasedOnCurrentEnvironment = currentRunningEnvironment();

export const configuration = knexConfigBasedOnCurrentEnvironment;

const connection = knex(configuration);

export default connection;
