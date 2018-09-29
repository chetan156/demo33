import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor,
  HttpRequest, HttpErrorResponse, HttpParams } from '@angular/common/http';
 import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs/Observable';
 import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
 import { catchError, retry } from 'rxjs/operators';
 import 'rxjs/add/operator/map';

 import { environment } from '../../../../environments/environment';
 import { UserViewModel } from '../../../core/models/userViewModel';

@Injectable()
export class LoginService {

    private retryLimit = 2;
    private actionUrl: string;
    private moduleUrl = 'token';
    userview: UserViewModel;

    constructor(private _httpClient: HttpClient) {
        this.actionUrl = environment.APIEndPoint + this.moduleUrl;
    }

    public authenticateUser<userview>(userViewModel: UserViewModel): Observable<UserViewModel> {
        return this._httpClient
            .get<UserViewModel>(this.actionUrl ,)
            .pipe(
                retry(this.retryLimit),
                catchError(this.handleError)
            );
    }


    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an ErrorObservable with a user-facing error message
      return new ErrorObservable(
        'Something bad happened; please try again later.');
  }

}
