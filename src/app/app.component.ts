import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SchemaDialogService } from './home/create-schema-dialog/schema-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public _auth: AuthService,
    private createSchemaDialogS: SchemaDialogService
  ){}

  ngOnInit(): void {
  }

  openCreateSchema() {
    this.createSchemaDialogS.open();
  }
}
