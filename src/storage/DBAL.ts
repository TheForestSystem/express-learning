import { Pool, QueryResult } from 'pg';
import DatabaseConfig from './DatabaseConfig';
export default class Database {
  private pool: Pool;

  constructor(config: DatabaseConfig) {
    this.pool = new Pool(config);
  }

  /**
   * Query the database
   * @param {string} text - SQL query
   * @param {any[]} params - Query parameters
   * @returns {Promise<any[]>} - Query result
   * @async
   */
  async query(text: string, params: any[]): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult<any> = await client.query(text, params);
      return result.rows;
    } finally {
      client.release();
    }
  }

  /**
   * Find a single row in a table
   * @param {string} table - Table name
   * @param {Record<string, any>} conditions - Search conditions
   * @returns {Promise<any | null>} - The first row that matches the conditions, or null if no row matches
   * @async
   */
  async findOne(table: string, conditions: Record<string, any>): Promise<any | null> {
    const key = Object.keys(conditions)[0];
    const value = conditions[key];
    const queryText = `SELECT * FROM ${table} WHERE ${key} = $1 LIMIT 1`;
    const result = await this.query(queryText, [value]);
    return result[0] || null;
  }

  /**
   * INSERT a new row into a table
   * @param {string} table - Table name
   * @param {Record<string, any>} data - Row data
   * @returns {Promise<any>} - The inserted row
   * @async
   */
  async insert(table: string, data: Record<string, any>): Promise<any> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
    const queryText = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    console.debug('Query:', queryText, ":", values);
    const result = await this.query(queryText, values);
    return result[0];
  }

  /**
   * UPDATE rows in a table
   * @param {string} table - Table name
   * @param {Record<string, any>} conditions - Search conditions
   * @param {Record<string, any>} data - New row data
   * @returns {Promise<any[]>} - The updated rows
   * @async
   * @example await db.update('mascots', { name: 'John' }, { name: 'Johnny' });
   */
  async update(table: string, conditions: Record<string, any>, data: Record<string, any>): Promise<any[]> {
    const key = Object.keys(conditions)[0];
    const value = conditions[key];
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    const queryText = `UPDATE ${table} SET ${setClause} WHERE ${key} = $${keys.length + 1} RETURNING *`;
    console.debug('Query:', queryText, ":", [...values, value]);
    const result = await this.query(queryText, [...values, value]);
    return result;
  }



  /**
   * DELETE rows from a table
   * @param {string} table - Table name
   * @param {Record<string, any>} conditions - Search conditions
   * @async
   */
  async delete(table: string, conditions: Record<string, any>): Promise<void> {
    const key = Object.keys(conditions)[0];
    const value = conditions[key];
    const queryText = `DELETE FROM ${table} WHERE ${key} = $1`;
    await this.query(queryText, [value]);
  }
}
