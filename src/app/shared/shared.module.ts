import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatProgressBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule
 } from "@angular/material";
@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  exports: [
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  declarations: []
})
export class SharedModule { }
