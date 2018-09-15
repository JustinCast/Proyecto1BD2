import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Login } from "../models/Login";
@Injectable()
export class AuthService {
  string = "";
  constructor(public _http: HttpClient) {}

  login(login: Login): void {
    localStorage.setItem("logguedUser", JSON.stringify(login));
  }

  logout(): any {
    localStorage.removeItem("logguedUser");
  }

  getUser(): any {
    return localStorage.getItem("logguedUser");
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  connectBD(config: any) {
    this._http.post("http://localhost:3000/api/v1/login", config).subscribe(
      loggued => {
        console.log(loggued);
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
export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
