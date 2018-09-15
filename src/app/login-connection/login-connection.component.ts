import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login-connection",
  templateUrl: "./login-connection.component.html",
  styleUrls: ["./login-connection.component.scss"]
})
export class LoginConnectionComponent implements OnInit {
  loginFG: FormGroup;
  icon = "priority_high";

  constructor(private _fb: FormBuilder) {
    this.loginFG = this._fb.group({
      server: ["", Validators.required],
      database: ["", Validators.required],
      user: ["", Validators.required],
      password: ["", Validators.required],
      port: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.loginFG.valueChanges.subscribe(() => {
      if (this.loginFG.invalid == false) this.icon = "done";
      else this.icon = "clear";
    });
  }

  onSubmit() {
    console.log(this.loginFG.value);
  }
}
