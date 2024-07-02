import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTES } from '../constants/routes';
import { MessageService } from 'primeng/api';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private messageService: MessageService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {
      if ([0, 500].includes(error.status)) {
        if (['ejecutarConteoSlbtr','ejecutarConteoT24','ejecutarMT299'].includes(request.url.split('/')[request.url.split('/').length-1])) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error con la ejecución del ETL, vuelva a intentarlo. En caso de que el error persista, recomendamos ejecutar la tarea directamente desde el servidor.' });
        } else {
          this.router.navigate([ROUTES.ERROR_500])
        }
      }
      return throwError(() => error);
    }));
  }
}
