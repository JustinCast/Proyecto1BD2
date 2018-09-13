import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-connection',
  templateUrl: './login-connection.component.html',
  styleUrls: ['./login-connection.component.scss']
})
export class LoginConnectionComponent implements OnInit {
  loginFG: FormGroup

  constructor(private _fb: FormBuilder) { 
    this.loginFG = this._fb.group({
      'server': ['', Validators.required],
      'database': ['',Validators.required],
      'user':['',Validators.required],
      'password':['',Validators.required],
      'port':['',Validators.required]
    })
  }

 
  ngOnInit() {
  }

  onSubmit(){
    if(this.loginFG.controls['user'].value=='user' && this.loginFG.controls['password'].value=='123' ){
      console.log("perfecto");
    }else{
      console.log("usuario no encontrado intentelo de nuevo");
    }  
  }
}
