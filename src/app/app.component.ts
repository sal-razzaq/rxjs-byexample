import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'rxjs-demo';

  ngOnInit(): void {

    console.log('AppComponent.ngOnInit()');
    
    console.log('== of operator ==', 'Create an Observable from an object');
    const num: Number = 1;
    const numObs: Observable<Number> = of(num);
    numObs.subscribe(data => console.log(data));

    const nums: Number[] = [1, 2, 3, 4];
    const numsObs: Observable<Number[]> = of(nums);
    numsObs.subscribe(data => console.log(data));

    const str: string = 'string data';
    const strObs: Observable<string> = of(str);
    strObs.subscribe(data => console.log(data));

    console.log('== from operator ==', 'Turn a Promise into an Observable');
  }

}
