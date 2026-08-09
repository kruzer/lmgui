import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  private trafficUrl: string = environment.baseUrl + '/api/monitoring/traffic-statistics';
  private deviceInfoUrl: string = environment.baseUrl + '/api/device/information';
  private deviceSignalUrl: string = environment.baseUrl + '/api/device/signal';

  private log(message: string) {
    this.messageService.add(`TS: ${message}`);
  }

  getTraffic(): Observable<any> {
    this.log('start');
    return this.http.get<any>(this.trafficUrl).pipe(
      tap(() => this.log('fetched traffic')),
      catchError(this.handleError('getTraffic', {}))
    );
  }

  getDeviceInfo(): Observable<any> {
    this.log('start');
    return this.http.get<any>(this.deviceInfoUrl).pipe(
      tap(() => this.log('fetched device info')),
      catchError(this.handleError('getDeviceInfo', {}))
    );
  }

  getDeviceSignal(): Observable<any> {
    this.log('start');
    return this.http.get<any>(this.deviceSignalUrl).pipe(
      tap(() => this.log('fetched device signal')),
      catchError(this.handleError('getDeviceSignal', {}))
    );
  }

  getApiByUrl(url: string): Observable<any> {
    this.log('start');
    return this.http.get<any>(environment.baseUrl + url).pipe(
      tap(() => this.log('fetched: ' + url)),
      catchError(this.handleError('getApiByUrl', {}))
    );
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
