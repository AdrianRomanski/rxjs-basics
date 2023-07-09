/**
 * Delay emitted values by given time.
 */
import {fromEvent, mapTo, merge, mergeMap, of, takeUntil} from "rxjs";
import {delay} from "rxjs/operators";

export function delayOperator(): void {
  example2();
}



///Example 1: Delay to recognize long press
function example1(): void {
  const mousedown$ = fromEvent(document, 'mousedown');
  const mouseup$ = fromEvent(document, 'mouseup');

  mousedown$
    .pipe(mergeMap(event => of(event).pipe(delay(700), takeUntil(mouseup$))))
    .subscribe(event => console.log('Long Press!', event));
}

// Example 2: Delay for increasing durations
function example2(): void {
  //emit one item
  const example = of(null);
  //delay output of each by an extra second
  const message = merge(
    example.pipe(mapTo('Hello')),
    example.pipe(mapTo('World!'), delay(1000)),
    example.pipe(mapTo('Goodbye'), delay(2000)),
    example.pipe(mapTo('World!'), delay(3000))
  );
  //output: 'Hello'...'World!'...'Goodbye'...'World!'
  const subscribe = message.subscribe(val => console.log(val));
}
