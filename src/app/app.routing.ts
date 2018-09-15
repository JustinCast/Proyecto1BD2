import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CreateProcedureComponent } from "./create-procedure/create-procedure.component";

export const ROUTES: Routes =  [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'proc', component: CreateProcedureComponent }
];