import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { CreateSchemaDialogComponent } from './create-schema-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SchemaDialogService {
  constructor(private dialog: MatDialog) {}

  public open() {
    let dialogRef: MatDialogRef<CreateSchemaDialogComponent>;
    dialogRef = this.dialog.open(CreateSchemaDialogComponent, {
      width: "30%",
      height: "27%"
    });
  }
}
