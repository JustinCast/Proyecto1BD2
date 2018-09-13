import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { ExecutionDialogComponent } from "./execution-dialog/execution-dialog.component";
import { Observable } from "rxjs";
import { Table } from "../../models/Table";
@Injectable()
export class ExecutionOptionsDialogService {
  constructor(private dialog: MatDialog) {}

  public confirm(selectedTables: Array<Table>): Observable<boolean> {
    let dialogRef: MatDialogRef<ExecutionDialogComponent>;
    dialogRef = this.dialog.open(ExecutionDialogComponent, {
      width: "65%",
      height: "50%",
      data: selectedTables
    });

    return dialogRef.afterClosed();
  }
}
