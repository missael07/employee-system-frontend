import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthStatus } from '../auth/enum/auth-state.enum';
import { AuthService } from '../auth/services/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  
  const authService = inject( AuthService );
  const router      = inject( Router );

  console.log(authService.authStatus())
  if ( authService.authStatus() === AuthStatus.authenticated ) {
    router.navigateByUrl('/dashboard');
    return false;
  }

  console.log(1)

  return true;
};
