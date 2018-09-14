import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatProgressBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatListModule,
  MatRadioModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule
 } from "@angular/material";
@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule
  ],
  exports: [
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule
  ],
  declarations: []
})
export class SharedModule { }
