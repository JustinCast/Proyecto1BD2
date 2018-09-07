import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatProgressBarModule,
  MatButtonModule,
  MatCheckboxModule
 } from "@angular/material";
@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports: [
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  declarations: []
})
export class SharedModule { }
