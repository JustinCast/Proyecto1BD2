import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { RouterModule } from "@angular/router";
import { ROUTES } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateProcedureComponent } from './create-procedure/create-procedure.component';
import { SharedModule } from './shared/shared.module';
import { ExecutionDialogComponent } from './home/execution-dialog-options/execution-dialog/execution-dialog.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { LoginConnectionComponent } from './login-connection/login-connection.component';
import { AUTH_PROVIDERS } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateProcedureComponent,
    ExecutionDialogComponent,
    LoginConnectionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ExecutionDialogComponent
  ],
  providers: [AUTH_PROVIDERS,],
  bootstrap: [AppComponent]
})
export class AppModule { }
