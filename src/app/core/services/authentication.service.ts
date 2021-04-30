import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authUrl = `${environment.API_URL}/${environment.API_VERSION}/merchant/user/login`;

  constructor(
    private http: HttpClient,
    private storageService: StorageService) {

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(`${operation} failed: ${error.message}`);

      if (operation === 'getAuthorizationToken') {
        this.logout();
      }

      if (error) {
        result = error;
      }

      // Let the app keep running by returning an empty result.
      return throwError(result as T);
    };
  }

  login(username: string, password: string): Observable<HttpResponse<any>> {
    const body = new HttpParams()
      .set(`username`, username)
      .set(`password`, password);

    // Because of CORS problem I used Mock data. We directly geting data from JSON object.
    return this.http.get<any>('./assets/mock/login.json')
      .pipe(
        tap((response: any) => {
          this.storageService.set('access_token', response.token);

          // NOTE: There is no user information comes from the API.
          // this.storageService.set('user', response.token);
        }),
        catchError(this.handleError<any>('getAuthorizationToken', null))
      );

    // Note: Original request
    /*
    return this.http.post<any>(`${this.authUrl}`, body.toString())
      .pipe(
        tap((response: any) => {
          this.storageService.set('access_token', response.token);

          // NOTE: There is no user information comes from the API.
          // this.storageService.set('user', response.token);
        }),
        catchError(this.handleError<any>('getAuthorizationToken', null))
      );
    */
  }

  logout(): void {
    this.storageService.remove('access_token');
    this.storageService.remove('user');
  }

  getAuthorizationToken(): string | null {
    return this.storageService.get('access_token');
  }

  getAuthorizedUser(): any {
    return this.storageService.get('user');
  }

  isAccessTokenValid(): boolean {
    const accessToke = this.storageService.get('access_token');
    if (accessToke) {
     // Check token is valid;
     return true;
    }
    return false;
   }
}
