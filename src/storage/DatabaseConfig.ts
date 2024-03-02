/**
 * Database configuration
 * @property {string} user - Database user
 * @property {string} host - Database host
 * @property {string} database - Database name
 * @property {string} password - Database password
 * @property {number} port - Database port
 */
export default interface DatabaseConfig {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}