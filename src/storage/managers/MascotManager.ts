import Database from "../DBAL";
import Mascot from "../models/mascots";

export default class MascotManager {
  private readonly TABLE_NAME = 'mascots';
  private readonly db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  /**
   * Find a mascot by name
   * @param {string} name - The name of the mascot
   * @returns {Promise<Mascot | null>} - The mascot with the given name, or null if no mascot has that name
   * @async
   */
  async findByName(name: string): Promise<Mascot | null> {
    return this.db.findOne(this.TABLE_NAME, { name });
  }

  /**
   * Add a mascot to the database
   * @param {Mascot} mascot - The mascot to add
   * @returns {Promise<Mascot>} - The added mascot
   * @async
   */
  async addMascot(mascot: Mascot): Promise<Mascot> {
    return this.db.insert(this.TABLE_NAME, mascot);
  }

  /**
   * Get all mascots
   * @returns {Promise<Mascot[]>} - All mascots
   * @async
   */
  async getAllMascots(): Promise<Mascot[]> {
    return this.db.query(`SELECT * FROM ${this.TABLE_NAME}`, []);
  }

  /**
   * Get mascots by organization
   * @param {string} organization - The organization to search for
   * @returns {Promise<Mascot[]>} - Mascots from the given organization
   * @async
   */
  async getByOrganization(organization: string): Promise<Mascot[]> {
    const {where, params} = this.db.buildWhereClause({organization});
    const queryText = `SELECT * FROM ${this.TABLE_NAME} WHERE ${where}`;
    return this.db.query(queryText, params);
  }
}