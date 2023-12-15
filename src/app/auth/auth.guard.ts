import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
   console.log('authGuard#canActivate called');
  const authService = inject(AuthService);
  const router = inject(Router);
  let checkAuthService = authService.isAuthenticated();

  if(checkAuthService){
    authService.getPermissions();
    return true;
  }
  return router.parseUrl('/login');
};
