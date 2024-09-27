import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const apiKey = 'A324A26A71471437BB024E4FADD5B497FDFF1A8EA6FF12F6FB62AF2720B59CCX';
    
    const isLoginRequest = request.url.endsWith('/api/Auth/login');

    if (!isLoginRequest) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'x-api-key': apiKey
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'x-api-key': apiKey
        }
      });
    }

    return next.handle(request);
  }
}
