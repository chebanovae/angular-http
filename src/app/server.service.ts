import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerService {

  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    const header = new Headers({'Content-Type': 'application/json'});
    /*return this.http.post('https://angular-http-60a92.firebaseio.com/data.json',
      servers,
      {headers: header});*/
    return this.http.put('https://angular-http-60a92.firebaseio.com/data.json',
      servers,
      {headers: header});
  }

  getServers() {
    return this.http.get('https://angular-http-60a92.firebaseio.com/data')
      .map((response: Response) => {
        const data = response.json();
        for (const server of data) {
          server.name = 'FETCHED_' + server.name;
        }
        return data;
      })
      .catch(
        (error: Response) => {
          return Observable.throw('something went wrong');
        }
      );
  }

  getAppName() {
    return this.http.get('https://angular-http-60a92.firebaseio.com/appName.json')
      .map(
        (response: Response) => {
          console.log('map: ' + response);
          return response.json();
        }
      ).catch(
        (error: Response) => {
          console.log('error: ' + error);
          return Observable.throw('getAppName went wrong');
      }
    );
  }
}
