import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    console.log('ApiService get, ', path, params);
    return this.http.get<T>(path, { params }).pipe(
      tap((val: T) => console.log('fetched objects', val)),
      catchError(this.handleError<T>('get: ' + path))
    );
  }

  put<T>(path: string, body: {}): Observable<T> {
    console.log('ApiService put, ', path, body);
    return this.http
      .put<T>(path, JSON.stringify(body), httpOptions)
      .pipe(
        tap((val: T) => console.log('response', val)),
        catchError(this.handleError<T>('put: ' + path))
      );
  }

  post<T>(path: string, body): Observable<T> {
    console.log('ApiService post, ', path, body);
    return this.http
      .post<T>(path, JSON.stringify(body), httpOptions)
      .pipe(
        tap((val: T) => console.log('response', val)),
        catchError(this.handleError<T>('post: ' + path))
      );
  }

  delete<T>(path): Observable<T> {
    console.log('ApiService delete, ', path);
    return this.http.delete<T>(path, httpOptions).pipe(
      tap((val: T) => console.log('response', val)),
      catchError(this.handleError<T>('delete: ' + path))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
