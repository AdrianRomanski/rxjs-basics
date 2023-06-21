import {combineLatestAll, interval, Observable} from "rxjs";
import {map, take} from "rxjs/operators";

export function combineLatestAllOperator():void {
  // emit every 1s, take 2
  const source$: Observable<string> = interval(1000)
    .pipe(
      map((v) => `Outer: ${v+1}`),
      take(2)
    );
  // map each emitted value from source to interval observable that takes 5 values
  const example$: Observable<Observable<string>> = source$.pipe(
    map(upperObservableValue =>
      interval(1000).pipe(
        map(i => `{${upperObservableValue}, Inner:${i+1}}`),
        take(5)
      )
    )
  );
  /*
    2 values from source will map to 2 (inner) interval observables that emit every 1s.
    combineAll uses combineLatest strategy, emitting the last value from each
    whenever either observable emits a value
  */
  example$
    .pipe(combineLatestAll())
    .subscribe(console.log)
}
