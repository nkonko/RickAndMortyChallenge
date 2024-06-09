import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UNKNOWN_ERROR } from '../models/errors.constants';

export const ErrorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const snack = inject(MatSnackBar)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = UNKNOWN_ERROR;

      console.log(errorMessage);

      errorMessage = error.error instanceof ErrorEvent ?
      `Error: ${error.error.message}`:
      `Error Code: ${error.status}\n Message: Check console`;

      console.log(error.message);

      snack.open(errorMessage, 'Close', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });

      return throwError(() => errorMessage);
    })
  );
};
