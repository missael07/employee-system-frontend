import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { UsersComponent } from './pages/users/users.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { RolesComponent } from './pages/roles/roles.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProjectsComponent,
    UsersComponent,
    TeamsComponent,
    RolesComponent,
    SideNavComponent,
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
