import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Table } from '../../../models/Table';
import { SchemaService } from '../../../services/schema.service';

@Component({
  selector: 'app-execution-dialog',
  templateUrl: './execution-dialog.component.html',
  styleUrls: ['./execution-dialog.component.scss'],
  providers: [SchemaService]
})
export class ExecutionDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ExecutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public tables: Array<Table>,
    public _schemaService: SchemaService
  ) { }

  ngOnInit() {
    if(this._schemaService.schemas.length === 0)
      this._schemaService.getSchemas();
  }

}
