import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { ExecutionDialogComponent } from "./execution-dialog/execution-dialog.component";
import { Observable } from "rxjs";
@Injectable()
export class ExecutionOptionsDialogService {
  constructor(private dialog: MatDialog) {}

  public confirm(): Observable<boolean> {
    let dialogRef: MatDialogRef<ExecutionDialogComponent>;
    dialogRef = this.dialog.open(ExecutionDialogComponent, {
      width: "35%",
      data: { name: "Ups!" }
    });

    return dialogRef.afterClosed();
  }
}
