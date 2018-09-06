import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatProgressBarModule
 } from "@angular/material";
@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports: [
    MatProgressBarModule
  ],
  declarations: []
})
export class SharedModule { }
