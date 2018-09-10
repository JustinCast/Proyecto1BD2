import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-execution-dialog',
  templateUrl: './execution-dialog.component.html',
  styleUrls: ['./execution-dialog.component.scss']
})
export class ExecutionDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ExecutionDialogComponent>) { }

  ngOnInit() {
  }

}
