import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  schemas: Array<any> = [];
  constructor(private _http: HttpClient) { }

  getSchemas() {
    this._http.get<string[]>(`http://localhost:3000/api/v1/getSchemas`).subscribe(
      data => {
        this.schemas = data;
        console.log(data);
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
