import Database from "./storage/DBAL";

declare global {
    namespace Express {
        interface Request {
            database: Database;
        }
    }
}
