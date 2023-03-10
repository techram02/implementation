import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateEmpTDComponent } from './create-emp-td/create-emp-td.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmpRFComponent } from './create-emp-rf/create-emp-rf.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'createtd', component: CreateEmpTDComponent },
  { path: 'edittd/:id', component: CreateEmpTDComponent },
  { path: 'createrf', component: CreateEmpRFComponent },
  { path: 'editrf/:id', component: CreateEmpRFComponent },
  { path: 'list', component: EmployeeListComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
