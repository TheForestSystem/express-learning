import { Request, Response, NextFunction } from 'express';
import DatabaseConfig from '../storage/DatabaseConfig';
import Database from '../storage/DBAL';

let globalDatabase: Database | null = null; // Module-level variable to store the database instance

export default class DBConfigMiddleware {
    static returnDatabase(req: Request, res: Response, next: NextFunction) {
        console.log('--- Database Configuration Middleware ---');
        try {
            const config = DBConfigMiddleware.getDatabaseConfig();
            console.log(`[${new Date().toISOString()}] Config: ${JSON.stringify(config)}`);
            const db = new Database(config);
            res.on('finish', () => {
                globalDatabase = db; // Assign the database instance to the module-level variable
            });
            next();
        } catch (error) {
            next(error);
        }
    }

    static getDatabaseConfig(): DatabaseConfig {
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
}


export { globalDatabase }; // Export the module-level variable for use in other modules