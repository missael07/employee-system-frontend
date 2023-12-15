import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './guards/isAuthenticated.guard';
import { isNotAuthenticatedGuard } from './guards/isNotAuthenticated.guard';

const routes: Routes = [
    
  { path: 'dashboard', canActivate: [isAuthenticatedGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'auth', canActivate: [isNotAuthenticatedGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**',redirectTo: 'auth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
