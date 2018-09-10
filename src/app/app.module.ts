import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { RouterModule } from "@angular/router";
import { ROUTES } from './app.routing';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateProcedureComponent } from './create-procedure/create-procedure.component';
import { SharedModule } from './shared/shared.module';
import { ExecutionDialogComponent } from './home/execution-dialog-options/execution-dialog/execution-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CreateProcedureComponent,
    ExecutionDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    SharedModule
  ],
  entryComponents: [
    ExecutionDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
