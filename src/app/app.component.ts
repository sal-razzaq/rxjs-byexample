import { Component, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'rxjs-demo';

  ngOnInit(): void {
    console.log('== of operator ==', 'Create an Observable from an object');
    const num$: Observable<Number> = of(1);
    num$.subscribe(data => console.log(data));

    const str$: Observable<string> = of('string data');
    str$.subscribe(data => console.log(data));

    const mixed$: Observable<any> = of(1, 'string data');
    mixed$.subscribe(data => console.log(data));

    console.log('== from operator ==', 'Create an Observable from an array');
    const arr$: Observable<Number> = from([1, 2, 3, 4]);
    arr$.subscribe(data => console.log(data));

    console.log('== from operator ==', 'Turn a Promise into an Observable');
  }

}
