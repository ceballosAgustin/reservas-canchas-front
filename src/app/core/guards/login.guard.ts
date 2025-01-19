import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if(auth.isAuthenticated()) {
    router.navigate(['/dashboard']);
    return false;

  } else {
    return true;
  }
};
