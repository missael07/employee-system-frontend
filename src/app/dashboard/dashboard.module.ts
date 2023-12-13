import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProjectsComponent } from './pages/projects/projects.component';
import { UsersComponent } from './pages/users/users.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { RolesComponent } from './pages/roles/roles.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectComponent } from './pages/projects/project/project.component';
import { FilterComponent } from './components/shared/filter/filter.component';
import { TableContainerComponent } from './components/shared/table-container/table-container.component';
import { TeamComponent } from './pages/teams/team/team.component';



@NgModule({
  declarations: [
    ProjectsComponent,
    UsersComponent,
    TeamsComponent,
    RolesComponent,
    SideNavComponent,
    DashboardLayoutComponent,
    NavbarComponent,
    ProjectComponent,
    FilterComponent,
    TableContainerComponent,
    TeamComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    MaterialModule,
    SharedModule
  ]
})
export class DashboardModule { }
