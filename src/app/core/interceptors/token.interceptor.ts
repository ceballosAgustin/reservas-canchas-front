import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const auth = inject(AuthService);
  const toast = inject(ToastrService);
  const loginUrl = environment.url + environment.prefixAuth + environment.login;

  return next(req).pipe(catchError((err: HttpErrorResponse) => {

    if(err.status == 401 || !auth.isAuthenticated() && req.url !== loginUrl) {
      console.log(req.url == loginUrl);
      toast.error("Tu token expiró", "¡Ups!");
      auth.logout();
      router.navigate(['/login']);
    }

    return throwError(() => err);

  }));
};
