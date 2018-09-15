import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatProgressBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatListModule,
  MatRadioModule,
  MatIconModule,
  MatSnackBarModule
 } from "@angular/material";



@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatSnackBarModule
  ],
  exports: [
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class SharedModule { }
