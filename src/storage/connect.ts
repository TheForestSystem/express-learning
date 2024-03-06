import Database from "./DBAL";
import DatabaseConfig from "./DatabaseConfig";

let globalDatabase: Database | null = null; // Module-level variable to store the database instance

/**
 * Get the database configuration from environment variables
 * @method getDatabaseConfig
 * @returns {DatabaseConfig} - The database configuration
 * @throws {Error} - Throws an error if the configuration is incomplete or invalid
 * @author ForestSystem
 */
function getDatabaseConfig(): DatabaseConfig {
    console.log('--- Retrieving Database Configuration ---');
    const user = process.env.DB_USER || '';
    const host = process.env.DB_HOST || '';
    const database = process.env.DB_DATABASE || '';
    const password = process.env.DB_PASSWORD || '';
    const port = parseInt(process.env.DB_PORT || '5432');

    if (!user || !host || !database || !password || isNaN(port)) {
        throw new Error('Incomplete or invalid database configuration.');
    }

    console.log(`[${new Date().toISOString()}] Database Configuration: ${user}@${host}:${port}/${database}`);

    return {
        user,
        host,
        database,
        password,
        port
    };
}

/**
 * Connect to the database
 * @method connect
 * @returns {Database} - The database instance
 * @author ForestSystem
 */
function connect(): Database {
    if (globalDatabase) {
        return globalDatabase;
    }

    const config = getDatabaseConfig();
    globalDatabase = new Database(config);
    return globalDatabase;
}

export { connect, globalDatabase }