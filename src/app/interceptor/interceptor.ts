import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private router: Router, private apiService: ApiService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err?.status === 401) { // invalid token
            this.newToken();
          } else {
            return throwError(err);
          }
        }
        return new Observable<HttpEvent<any>>();
      }));
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  newToken(): void {
    const payload = { refreshToken: localStorage.getItem('refreshToken') };
    if (payload?.refreshToken) {
      this.apiService.get(environment?.apiUrl + '/refresh-token').subscribe((data: any) => {
        localStorage.setItem('accessToken', data.token);
        location.reload();
      });
    } else this.logout();
  }
}
