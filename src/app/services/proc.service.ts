import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Procedure } from "../models/Procedure";

@Injectable({
  providedIn: "root"
})
export class ProcService {
  constructor(private _http: HttpClient) {}

  createProc(proc: Procedure) {
    this._http
      .post("http://localhost:3000/api/v1/genInsert", {
        prefix: proc.prefix,
        table_name: proc.table,
        table_schema: proc.tableSchema,
        proc_schema: proc.procSchema
      })
      .subscribe(
        success => {
          console.log(success);
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
