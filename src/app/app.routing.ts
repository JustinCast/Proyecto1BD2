import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

export const ROUTES: Routes =  [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent }
];