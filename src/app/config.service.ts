import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configUrl = environment.baseUrl + '/config';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  setConfig(newConfig){
    this.log("start setConfig:" + newConfig);
    return this.http.put(this.configUrl,newConfig).pipe(
      tap(cos => this.log('setting config')),
      catchError(this.handleError('setConfig', []))
    )
  }

  getConfig() {
    this.log("start");
    return this.http.get(this.configUrl).pipe(
      tap(heroes => this.log('fetched config')),
      catchError(this.handleError('getConfig', []))
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
      this.log('${operation} failed: ${error.message}');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
