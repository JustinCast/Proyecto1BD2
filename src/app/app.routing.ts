import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CreateProcedureComponent } from "./create-procedure/create-procedure.component";
import { LoginConnectionComponent } from "./login-connection/login-connection.component";
import { LogguedInGuard } from "./loggued-in.guard";

export const ROUTES: Routes =  [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginConnectionComponent },
    { path: 'home', component: HomeComponent, canActivate: [LogguedInGuard] },
    { path: 'proc', component: CreateProcedureComponent }
];