import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Login } from "../models/Login";
import { ProcService } from "../services/proc.service";

@Component({
  selector: "app-login-connection",
  templateUrl: "./login-connection.component.html",
  styleUrls: ["./login-connection.component.scss"]
})
export class LoginConnectionComponent implements OnInit {
  loginFG: FormGroup;
  icon = "priority_high";

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _procService: ProcService
  ) {
    this.loginFG = this._fb.group({
      server: ["", Validators.required],
      database: ["", Validators.required],
      user: ["", Validators.required],
      password: ["", Validators.required],
      port: ["", Validators.required]
    });
  }

  ngOnInit() {
    if (this._auth.isLoggedIn()) {
      this._router.navigate(["/home"]);
    }
    this.loginFG.valueChanges.subscribe(() => {
      if (this.loginFG.invalid == false) this.icon = "done";
      else this.icon = "priority_high";
    });
    this._procService.checkIfProcsExist();
  }

  onSubmit() {
    let login = {
      server: this.loginFG.controls["server"].value,
      port: this.loginFG.controls["port"].value,
      database: this.loginFG.controls["database"].value,
      user: this.loginFG.controls["user"].value,
      password: this.loginFG.controls["password"].value
    };

    this._auth.connectBD(login).subscribe(
      loggued => {
        console.log(loggued);
        this._router.navigate(["/home"]);
        this._auth.login(
          new Login(
            login.user,
            login.password,
            login.server,
            login.database,
            login.port
          )
        );
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
