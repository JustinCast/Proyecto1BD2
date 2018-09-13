import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CreateProcedureComponent } from "./create-procedure/create-procedure.component";

export const ROUTES: Routes =  [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'proc', component: CreateProcedureComponent }
];