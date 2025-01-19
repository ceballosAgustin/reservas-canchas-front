import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const toast = inject(ToastrService);

  const requiredRole = route.data['role'];
  const roles = auth.getUserRole();

  if(auth.isAuthenticated()) {
    if(roles.includes(requiredRole)) {
      return true;

    } else {
      toast.error('No tienes permiso acceder a esta sección', '¡Oops!');
      router.navigate(['/dashboard']);
      return false;
    }

  } else {
    toast.error("Debes estar autenticado para acceder a esta sesión", "Error");
    router.navigate(['/login']);
    return false;
  }
};
