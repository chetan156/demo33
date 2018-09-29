import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor,
 HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class DataService {
    // retry a failed request up to 2 times
    private retryLimit = 1;
    private actionUrl: string;

    constructor(private _httpClient: HttpClient) {
        this.actionUrl = environment.APIEndPoint;
    }

    public getAll<T>(moduleUrl: string, data?: any): Observable<T> {
        if (data === undefined) { data = ''; }

        return this._httpClient
            .get<T>(this.actionUrl + moduleUrl + data)
            .pipe(
                retry(this.retryLimit),
                catchError(this.handleError)
            );
    }

    public getSingle<T>(moduleUrl: string, id: any): Observable<T> {
        return this._httpClient
            .get<T>(this.actionUrl + moduleUrl + id)
            .pipe(
                retry(this.retryLimit),
                catchError(this.handleError)
            );
    }

    public add<T>(moduleUrl: string, newItem: any): Observable<T> {
        return this._httpClient
            .post<T>(this.actionUrl + moduleUrl, newItem)
            .pipe(
                retry(this.retryLimit),
                catchError(this.handleError)
            );
    }

    public update<T>(moduleUrl: string, id: number, itemToUpdate: any): Observable<T> {
        return this._httpClient
            .put<T>(this.actionUrl + moduleUrl + id, itemToUpdate)
            .pipe(
                retry(this.retryLimit),
                catchError(this.handleError)
            );
    }

    public delete<T>(moduleUrl: string, id: number): Observable<T> {
        return this._httpClient
            .delete<T>(this.actionUrl + moduleUrl + id)
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
            console.error(error.message);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
          'Something bad happened; please try again later.');
    }
}
