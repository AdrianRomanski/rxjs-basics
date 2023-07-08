/**
 * Close window at provided time frame emitting observable of collected values from source.
 */
import {interval, mergeAll, tap, timer, windowWhen} from "rxjs";

export function windowWhenOperator(): void {
  //emit immediately then every 1s
  const source = timer(0, 1000);
  const example = source.pipe(
    //close window every 5s and emit observable of collected values from source
    windowWhen(() => interval(5000)),
    tap(_ => console.log('NEW WINDOW!'))
  );

  const subscribeTwo = example
    .pipe(
      //window emits nested observable
      mergeAll()
      /*
        output:
        "NEW WINDOW!"
        0
        1
        2
        3
        4
        "NEW WINDOW!"
        5
        6
        7
        8
        9
      */
    )
    .subscribe(val => console.log(val));
}
