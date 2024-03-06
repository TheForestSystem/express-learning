import Database from "../DBAL";
import Mascot from "../models/mascots";

import ManagerTemplate from "./ManagerTemplate";

/**
 * Manager for mascot data
 * @extends ManagerTemplate<Mascot>
 * @author ForestSystem
 */
export default class MascotManager extends ManagerTemplate<Mascot>{
  protected readonly TABLE_NAME = 'mascots';
  protected readonly db: Database;

  /**
   * @constructor
   * @param {Database} db - The database to use
   */
  constructor(db: Database) {
    super(db, 'mascots');
    this.db = db;
  }

  /**
   * Find a mascot by name
   * @async
   * @method findByName
   * @param {string} name - The name of the mascot
   * @returns {Promise<Mascot | null>} - The mascot with the given name, or null if no mascot has that name
   * @author ForestSystem
   */
  async findByName(name: string): Promise<Mascot | null> {
    return this.db.findOne(this.TABLE_NAME, { name });
  }

  /**
   * Add a mascot to the database
   * @async
   * @method insert
   * @param {Mascot} mascot - The mascot to add
   * @returns {Promise<Mascot>} - The added mascot
   * @author ForestSystem
   */
  async insert(mascot: Mascot): Promise<Mascot> {
    return this.db.insert(this.TABLE_NAME, mascot);
  }

  /**
   * Get all mascots
   * @async
   * @method getAllMascots
   * @returns {Promise<Mascot[]>} - All mascots
   * @author ForestSystem
   */
  async getAllMascots(): Promise<Mascot[]> {
    return this.db.query(`SELECT * FROM ${this.TABLE_NAME}`, []);
  }

  /**
   * Get mascots by organization
   * @async
   * @param {string} organization - The organization to search for
   * @returns {Promise<Mascot[]>} - Mascots from the given organization
   * @author ForestSystem
   */
  async getByOrganization(organization: string): Promise<Mascot[]> {
    return this.db.query(`SELECT * FROM ${this.TABLE_NAME} WHERE organization = $1`, [organization]);
  }

  /**
   * Get a mascot by ID
   * @async
   * @method getById
   * @param {number} id - The ID of the mascot
   * @returns {Promise<Mascot | null>} - The mascot with the given ID, or null if no mascot has that ID
   * @author ForestSystem
   */
  async getById(id: number): Promise<Mascot | null> {
    return this.db.findOne(this.TABLE_NAME, {mascot_id: id});
  }

  /**
   * Update a mascot
   * @async
   * @method update
   * @param {Mascot} mascot - The mascot to update
   * @returns {Promise<Mascot>} - The updated mascot
   * @author ForestSystem
   */
  async update(mascot: Mascot): Promise<Mascot> {
    const result = await this.db.update(this.TABLE_NAME, {mascot_id: mascot.mascot_id}, {
      name: mascot.name,
      organization: mascot.organization,
      birth_year: mascot.birth_year
    });
    return (result as Mascot[])[0];
  }

  /**
   * Delete a mascot
   * @async
   * @method delete
   * @param {number} id - The ID of the mascot to delete
   * @returns {Promise<void>} - A promise that resolves when the mascot is deleted
   * @author ForestSystem
   */
  async delete(id: number): Promise<void> {
    this.db.delete(this.TABLE_NAME, {mascot_id: id});
  }
}