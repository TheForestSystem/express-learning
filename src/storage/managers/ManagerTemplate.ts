import Database from "../DBAL";

abstract class ManagerTemplate<T> {
  protected readonly TABLE_NAME: string;
  protected readonly db: Database;

  constructor(db: Database, tableName: string) {
    this.db = db;
    this.TABLE_NAME = tableName;
  }

  abstract insert(item: T): Promise<T>;

  abstract delete(id: number): Promise<void>;

  abstract update(item: T): Promise<T>;


}

export default ManagerTemplate;
