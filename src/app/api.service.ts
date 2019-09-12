import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';

import { MessageService } from './message.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private trafficUrl: string = environment.baseUrl + '/api/monitoring/traffic-statistics';
  private deviceInfoUrl: string = environment.baseUrl + '/api/device/information';
  private deviceSignalUrl: string = environment.baseUrl + '/api/device/signal';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  
  private log(message: string) {
    this.messageService.add(`TS: ${message}`);
  }

  getTraffic() {
    this.log("start");
    return this.http.get(this.trafficUrl).pipe(
      tap(traf => this.log('fetched traffic')),
      catchError(this.handleError('getTraffic', []))
    );
  }

  getDeviceInfo(): Observable<Object> {
    this.log("start");
    return this.http.get(this.deviceInfoUrl).pipe(
      tap(traf => this.log('fetched device info')),
      catchError(this.handleError('getDeviceInfo', []))
    );
  }

  getDeviceSignal() {
    this.log("start");
    return this.http.get(this.deviceSignalUrl).pipe(
      tap(traf => this.log('fetched device signal')),
      catchError(this.handleError('getDeviceSignal', []))
    );
  }

 
  getApiByUrl(url: string){
    this.log("start")
    return this.http.get(environment.baseUrl + url).pipe(
      tap(api => this.log('fetched: ' + url)),
      catchError(this.handleError('getApiByUrl', []))
    );
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
