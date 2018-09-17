import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  schemas: Array<any> = [];
  loading: boolean = false;
  constructor(private _http: HttpClient, private snackBar: MatSnackBar) { }

  getSchemas() {
    this._http.get<string[]>(`http://localhost:3000/api/v1/getSchemas`).subscribe(
      data => {
        this.schemas = data;
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

  createSchema(schema: string) {
    this._http.post(`http://localhost:3000/api/v1/createSchema`, {schema: schema})
    .subscribe(
      created => {
        this.openSnackBar('Schema created successfully', 'Ok');
        this.loading = false;
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
