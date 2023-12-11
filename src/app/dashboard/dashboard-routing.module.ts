import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RolesComponent } from './pages/roles/roles.component';
import { UsersComponent } from './pages/users/users.component';
import { TeamsComponent } from './pages/teams/teams.component';

const routes: Routes = [
  { path: '', 
  component: DashboardLayoutComponent,
  children: [
    {
      path: 'projects',
      component: ProjectsComponent
    },
    {
      path: 'roles',
      component: RolesComponent
    },
    {
      path: 'users',
      component: UsersComponent
    },
    {
      path: 'teams',
      component: TeamsComponent
    },
    { path: '**', redirectTo: 'projects'}
  ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
