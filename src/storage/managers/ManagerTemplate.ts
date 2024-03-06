import Database from "../DBAL";

/**
 * Abstract class for database managers
 * @abstract
 */
abstract class ManagerTemplate<T> {
  protected readonly TABLE_NAME: string;
  protected readonly db: Database;

  constructor(db: Database, tableName: string) {
    this.db = db;
    this.TABLE_NAME = tableName;
  }

  /**
   * Insert an item into the database
   * @abstract
   * @param {T} item - The item to insert
   * @returns {Promise<T>} - The inserted item
   */
  abstract insert(item: T): Promise<T>;

  /**
   * Get all items from the database
   * @abstract
   * @param {number} id - The ID of the item
   * @returns {Promise<T[]>} - All items
   */
  abstract delete(id: number): Promise<void>;

  /**
   * Get all items from the database
   * @abstract
   * @param {T} item - The item to update
   * @returns {Promise<T[]>} - All items
   */
  abstract update(item: T): Promise<T>;


}

export default ManagerTemplate;
