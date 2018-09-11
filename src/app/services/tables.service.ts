import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Table } from "../models/Table";
import { List } from "linqts";

@Injectable({
  providedIn: "root"
})
export class TablesService {
  tables: List<Table>;
  extractedTables: Array<Table> = [];
  constructor(private _http: HttpClient) {}

  getTableNames() {
    this._http.get<any>(`http://localhost:3000/api/v1/getTableNames`).subscribe(
      data => {
        this.tables = new List<Table>(data);
        this.extractTables();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // Error del lado del cliente
          console.log("An error occurred:", err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // Error del lado del backend
          console.log(
            `Backend returned code ${err.status}, body was: ${JSON.stringify(
              err.error
            )}`
          );
        }
      }
    );
  }

  extractTables() {
    this.tables = this.tables.GroupBy(t => t.TABLE_NAME, t => t.COLUMN_NAME);
    for (var key in this.tables) {
      if (this.tables.hasOwnProperty(key)) {
        let table: Table = new Table(key);
        this.tables[key].forEach(element => {
          table.COLUMN_NAME.unshift(element);
        });
        this.extractedTables.unshift(table);
      }
    }
  }
}
