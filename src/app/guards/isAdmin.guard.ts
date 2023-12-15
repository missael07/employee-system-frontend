import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const isAdminGuard: CanActivateFn = (route, state) => {

  const role = localStorage.getItem('Role');

  if(role !== 'Admin'){
    console.log(2)
    return false;
  }

  return true;
};
