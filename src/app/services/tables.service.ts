import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Table } from "../models/Table";
import { List } from "linqts";
import { TableInterface } from "../models/Table.interface";

@Injectable({
  providedIn: "root"
})
export class TablesService {
  tables: List<Table>;
  extractedTables: Array<Table> = [];
  constructor(private _http: HttpClient) {}

  getTableNames() {
    this._http.get<TableInterface[]>(`http://localhost:3000/api/v1/getTableNames`).subscribe(
      data => {
        //this.tables = new List<Table>(data);
        console.log(data)
        data.forEach(element => {
          if(this.extractedTables.find(t => t.TABLE_NAME === element.TABLE_NAME) !== undefined){
            this.extractedTables.find(t => t.TABLE_NAME === element.TABLE_NAME).setColumnName(element.COLUMN_NAME)
          }
          else{
            let table = new Table(element.TABLE_SCHEMA, element.TABLE_NAME);
            table.setColumnName(element.COLUMN_NAME);
            this.extractedTables.unshift(table);

          }
        });
        console.log(this.extractedTables)
        //this.extractTables();
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
}