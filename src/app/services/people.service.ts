import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Person } from "../models/Person";

@Injectable({
  providedIn: "root"
})
export class PeopleService {
  constructor(private _http: HttpClient) {}

  getPeople(schema: string, tablename: string) {
    this._http
      .get<Person[]>(
        `http://localhost:3000/api/v1/getPeople/${schema}/${tablename}`
      )
      .subscribe(
        data => {
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
