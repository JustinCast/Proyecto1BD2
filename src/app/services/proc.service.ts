import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Procedure } from "../models/Procedure";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class ProcService {
  building: boolean = false;
  constructor(private _http: HttpClient, public snackBar: MatSnackBar) {}

  genInsertProc(proc: Procedure) {
    this._http
      .post("http://localhost:3000/api/v1/genInsert", {
        prefix: proc.prefix,
        table_name: proc.table,
        table_schema: proc.tableSchema,
        proc_schema: proc.procSchema
      })
      .subscribe(
        success => {
          this.building = false;
          console.log(success);
          this.openSnackBar('Insert proc created successfully', 'Ok');
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

  genUpdateProc(proc: Procedure) {
    this._http
      .post("http://localhost:3000/api/v1/genUpdate", {
        prefix: proc.prefix,
        table_name: proc.table,
        table_schema: proc.tableSchema,
        proc_schema: proc.procSchema
      })
      .subscribe(
        success => {
          this.building = false;
          console.log(success);
          this.openSnackBar('Update proc created successfully', 'Ok');
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

  genDeleteProc(proc: Procedure) {
    this._http
      .post("http://localhost:3000/api/v1/genDelete", {
        prefix: proc.prefix,
        table_name: proc.table,
        table_schema: proc.tableSchema,
        proc_schema: proc.procSchema
      })
      .subscribe(
        success => {
          this.building = false;
          console.log(success);
          this.openSnackBar('Delete proc created successfully', 'Ok');
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
