import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginConnectionComponent } from "./login-connection/login-connection.component";
import { LogguedInGuard } from "./loggued-in.guard";

export const ROUTES: Routes =  [
    { path: 'login', component: LoginConnectionComponent },
    { path: 'home', component: HomeComponent, canActivate: [LogguedInGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];