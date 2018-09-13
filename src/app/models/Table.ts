export class Table {
  COLUMN_NAME: Array<string> = [];
  /*public TABLE_SCHEMA: string;*/
  constructor(public TABLE_SCHEMA?: string, public TABLE_NAME?: string) {}

  public setColumnName(column: string): void {
    this.COLUMN_NAME.unshift(column);
  }

  /*public setSchema(schema: string) {
    this.TABLE_SCHEMA = schema;
  }*/
}
