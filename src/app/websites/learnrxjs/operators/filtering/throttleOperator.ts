/** Emit value on the leading edge of an interval, but suppress new values
 *  until durationSelector has completed.
 *  It's like throttleTime, but the silencing duration is determined by a second Observable.
 */
import {interval, throttle} from "rxjs";
import {map} from "rxjs/operators";

export function throttleOperator(): void {
  example2();
}

// Example 1: Throttle for 2 seconds, based on second observable
function example1(): void {
  //emit value every 1 second
  const source = interval(1000);
  //throttle for 2 seconds, emit latest value
  const example = source.pipe(throttle(val => interval(2000)));
  //output: 0...3...6...9
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 2: Throttle with promise
function example2(): void {
  //emit value every 1 second
  const source = interval(1000);
  //incrementally increase the time to resolve based on source
  // @ts-ignore
  const promise = val =>
    new Promise(resolve =>
      setTimeout(() => resolve(`Resolved: ${val}`), val * 100)
    );
  //when promise resolves emit item from source
  const example = source.pipe(
    throttle(promise),
    map(val => `Throttled off Promise: ${val}`)
  );

  const subscribe = example.subscribe(val => console.log(val));
}
