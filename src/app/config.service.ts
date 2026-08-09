import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  private configUrl = environment.baseUrl + '/config';

  setConfig(newConfig: unknown): Observable<any> {
    this.log('start setConfig:' + JSON.stringify(newConfig));
    return this.http.put<any>(this.configUrl, newConfig).pipe(
      tap(() => this.log('setting config')),
      catchError(this.handleError('setConfig', {}))
    );
  }

  getConfig(): Observable<any> {
    this.log('start');
    return this.http.get<any>(this.configUrl).pipe(
      tap(() => this.log('fetched config')),
      catchError(this.handleError('getConfig', {}))
    );
  }

  private log(message: string) {
    console.log(message);
    this.messageService.add(`CS: ${message}`);
  }

  private handleError<T>(operation = 'operacja', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
