import { Pool, QueryResult } from 'pg';
import DatabaseConfig from './DatabaseConfig';

import Mascot from './models/mascots';

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
    const { where, params } = this.buildWhereClause(conditions);
    const queryText = `SELECT * FROM ${table} WHERE ${where} LIMIT 1`;
    const result = await this.query(queryText, params);
    return result.length > 0 ? result[0] : null;
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
   */
  async update(table: string, conditions: Record<string, any>, data: Record<string, any>): Promise<any[]> {
    const { where, params } = this.buildWhereClause(conditions);
    const set = Object.keys(data).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const queryText = `UPDATE ${table} SET ${set} WHERE ${where} RETURNING *`;
    const result = await this.query(queryText, [...Object.values(data), ...params]);
    return result;
  }

  /**
   * DELETE rows from a table
   * @param {string} table - Table name
   * @param {Record<string, any>} conditions - Search conditions
   * @returns {Promise<any[]>} - The deleted rows
   * @async
   */
  async delete(table: string, conditions: Record<string, any>): Promise<any[]> {
    const { where, params } = this.buildWhereClause(conditions);
    const queryText = `DELETE FROM ${table} WHERE ${where} RETURNING *`;
    const result = await this.query(queryText, params);
    return result;
  }

  /**
   * Builds a WHERE clause for a SQL query
   * @param {Record<string, any>} conditions - Search conditions
   * @returns {{ where: string; params: any[] }} - WHERE clause and parameters
   * @private
   * @example const { where, params } = this.buildWhereClause({ id: 1, name: 'John' });
   */
  buildWhereClause(conditions: Record<string, any>): { where: string; params: any[] } {
    const keys = Object.keys(conditions);
    const where = keys.map((key, index) => `${key} = $${index + 1}`).join(' AND ');
    const params = keys.map((key) => conditions[key]);
    return { where, params };
  }
}
