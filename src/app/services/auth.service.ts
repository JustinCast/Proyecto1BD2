import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Login } from "../models/Login";
import { Observable } from "rxjs";
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

  connectBD(config: any): Observable<any> {
    console.log(config)
    return this._http.post("http://localhost:3000/api/v1/login", config)
  }
}
export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
