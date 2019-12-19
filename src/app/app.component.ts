import { Component, OnInit } from '@angular/core';
import { Observable, of, from, fromEvent, Subject, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Reference: http://reactivex.io/rxjs/manual/tutorial.html

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'rxjs-demo';

  ngOnInit(): void {
    console.log('== of ==', 'Create an Observable from an object');
    const num$: Observable<Number> = of(1, 2, 3);
    num$.subscribe(data => console.log(data));

    const str$: Observable<string> = of('str1', 'str2');
    str$.subscribe(data => console.log(data));

    const mixed$: Observable<any> = of(1, 'str');
    mixed$.subscribe(data => console.log(data));

    console.log('== from ==', 'Create an Observable from an array');
    const arr$: Observable<Number> = from([1, 2, 3, 4]);
    arr$.subscribe(data => console.log(data));

    console.log('== fromEvent ==', 'Capture DOM events (click anywhere on the web page)');
    const docClick$ = fromEvent(document, 'click')
    docClick$.subscribe(data => console.log(data));



    console.log('== create ==', 'Create an observable (cast internally to subscribers; cold observable)');
    const custom$ = Observable.create(observer => {
      let counter = 0;
      observer.next(counter);
      observer.next(++counter);
    });
    custom$.subscribe(data => console.log('Subscriber_1', data));
    // subcribe later, but we still get all the values
    custom$.subscribe(data => console.log('Subscriber_2', data));

    console.log('== create ==', 'Create an Subject (cast anytime to subscribers; good for sending events)');
    const subject$ = new Subject<Number>();
    subject$.subscribe(data => console.log("Subject sub_1", data));
    subject$.next(0);
    subject$.next(1);
    subject$.subscribe(data => console.log("Subject sub_2", data));
    // produce values anytime; sub_2 only gets the new values (hot observable)
    subject$.next(2);

    console.log('== create ==', 'Create an BehaviorSubject (same as Subject but with required initial value)');
    const behaviorSubject$ = new BehaviorSubject<Number>(0);
    behaviorSubject$.subscribe(data => console.log("BehaviorSubject sub_1", data));
    behaviorSubject$.next(1);
    behaviorSubject$.next(2);

    console.log('== Error Handling ==', 'How to handle errors');
    const obs$ = Observable.create(observer => {
      observer.next(1);
      throw "Error in observable";
    });

    obs$
      .pipe(catchError(err => {
        console.log("Remove any spinners, wait indicators:", err)
        return throwError(err);   // bubble up the error
        // return of(null);   // to suppress the error
      }))
      .subscribe(
        data => {
          if (!data) {   // data will be null if catchError return of(null)
            return;
          }
          try {
            console.log('Subscriber', data);
            throw "Error in data processing";
          } catch (err) {
            console.log("Remove any spinners, wait indicators:", err);
          }
        });

    // Operators to exercise
    // filter, delay, throttleTime, debounceTime, take, takeUntil, switchMap, pluck, retry, tap


    console.log('== fromPromise ==', 'Turn a Promise into an Observable');
    const todo$ = from(fetch('https://jsonplaceholder.typicode.com/todos/1'))
      .pipe(map(response => response.json()));
    todo$.subscribe(data => {
      data.then(data => console.log(data));
    });
  }
}
