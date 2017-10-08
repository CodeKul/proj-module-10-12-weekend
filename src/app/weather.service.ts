import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class WeatherService {

  constructor(
    private http: Http
  ) { }

  fromCity(city: string): Observable<any> {
    // let header: Headers = new Headers({
    //   'content-type': 'application/json'
    // });
    return this.http.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=7406c21bb1cb9f59d936a59c4e890279`
    ).map(
      resData => resData.json()
      );
  }
}
