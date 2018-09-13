import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatProgressBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule
 } from "@angular/material";



@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    
  ],
  exports: [
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule

  ],
  declarations: []
})
export class SharedModule { }
