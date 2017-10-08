import { WeatherService } from './weather.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private title = 'app';
  private itvrlSub: Subscription;
  private mySub: Subscription;
  private info: string;

  constructor(
    private weather: WeatherService
  ) {

  }
  ngOnInit(): void {
    /*this.itvrlSub = Observable.interval(1000).subscribe(
      cnt => this.title = `${cnt}`,
      err => console.log(err),
      () => console.log(`completed`)
    );

    this.mySub = this.myObservable().subscribe(
      num => this.title = `Num is ${num}`,
      err => console.log(err),
      () => console.log(`Mysub completed`)
    );*/
  }

  ngOnDestroy() {
    this.itvrlSub.unsubscribe();
    this.mySub.unsubscribe();
  }

  private myObservable(): Observable<number> { // cold observable
    return Observable.create(
      sub => {
        for (let i = 0; i < 100; i++) {
          setTimeout(() => console.log(`${i}`), 1000);
        }
        sub.complete();
      }
    ).catch(err => console.log(`error handler`));
  }

  onCity(city: string) {
    this.weather.fromCity(city).subscribe( //pls unsubscribe
      res => {
        this.info = `Description ${res.weather[0].description}, temprature ${res.main.temp}`;
      },
      err => console.log(err),
      () => console.log(`completed`)
    );
  }
}
