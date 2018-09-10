import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatProgressBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatListModule,
  MatRadioModule,
  MatInputModule
 } from "@angular/material";
@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule,
    MatRadioModule
  ],
  exports: [
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule,
    MatRadioModule
  ],
  declarations: []
})
export class SharedModule { }
