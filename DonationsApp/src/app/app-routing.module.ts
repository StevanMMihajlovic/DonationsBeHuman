import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { DetailsComponent } from './details/details.component';
import { DonorsComponent } from './donors/donors.component';

const routes: Routes = [
  { path: "home", component: HomeComponent},
  { path: "donors", component: DonorsComponent},
  { path: "donors/:id", component: DetailsComponent},
  { path: "details", component: DetailsComponent},
  { path: "", redirectTo: "/home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
