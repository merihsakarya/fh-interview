import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd';

/**
 * The default HTTP interceptor
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private nzMessageService: NzMessageService
  ) { }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    // Business Rules
    switch (event.status) {
      case 200:
        // Business level error handling
        break;
      case 401: // unauthorized request
        // Unauthorized level error handling
        // Ex : Logout and go to login page. "this.goTo('/login');"
        break;
      default:
        return throwError(event);
    }
    return of(event);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
    > {

    return next.handle(req).pipe(
      mergeMap((event: any) => {

        if (event instanceof HttpResponse && event.status === 200) {
          // Global Message Service for CRUD operations
          let message: string;

          // TODO: Handle Success Message.
          // EX: We can handler server side Success Messages here or
          // we can add Default success messages here according to the HTTP status.

          if (message) {
            this.nzMessageService.success(message);
          }

          return this.handleData(event);
        }
        // If everything is ok, follow-up
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => {

        // Global Message Service for error handling of CRUD operations
        let message: string;

        // TODO: Handle Error Message.
        // EX: We can handler server side Error Messages here or
        // we can add Default error messages here according to the HTTP status.

        if (message) {
          this.nzMessageService.error(message);
        } else {
          this.nzMessageService.error('Oops there was an error with the operation. Please try again later.');
        }

        return this.handleData(err);
      })
    );
  }
}
