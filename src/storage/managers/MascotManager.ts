import Database from "../DBAL";
import Mascot from "../models/mascots";

import ManagerTemplate from "./ManagerTemplate";

export default class MascotManager extends ManagerTemplate<Mascot>{
  protected readonly TABLE_NAME = 'mascots';
  protected readonly db: Database;

  constructor(db: Database) {
    super(db, 'mascots');
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
  async insert(mascot: Mascot): Promise<Mascot> {
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
    return this.db.query(`SELECT * FROM ${this.TABLE_NAME} WHERE organization = $1`, [organization]);
  }

  async getById(id: number): Promise<Mascot | null> {
    return this.db.findOne(this.TABLE_NAME, {mascot_id: id});
  }

  async update(mascot: Mascot): Promise<Mascot> {
    const result = await this.db.update(this.TABLE_NAME, {mascot_id: mascot.mascot_id}, {
      name: mascot.name,
      organization: mascot.organization,
      birth_year: mascot.birth_year
    });
    return (result as Mascot[])[0];
  }

  async delete(id: number): Promise<void> {
    this.db.delete(this.TABLE_NAME, {mascot_id: id});
  }
}