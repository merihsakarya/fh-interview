import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthenticationService } from '@core/services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) { }

  private static _isSecure(url: string) {
    const urlReg = /(user\/login)/gi;
    return !urlReg.test(url);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (AuthInterceptor._isSecure(req.url)) {
      // Get the auth token from the service.
      const authToken = this.auth.getAuthorizationToken();

      if (authToken) {
        req = req.clone({ setHeaders: { Authorization: `${authToken}` } });
      }

    }

    return next.handle(req);
  }
}
