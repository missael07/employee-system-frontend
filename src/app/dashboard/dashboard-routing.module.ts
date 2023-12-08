import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProjectsComponent } from './pages/projects/projects.component';

const routes: Routes = [
  { path: '', 
  component: DashboardLayoutComponent,
  children: [
    {
      path: 'projects',
      component: ProjectsComponent
    }
  ] 
  },
  { path: '**', redirectTo: 'projects'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
