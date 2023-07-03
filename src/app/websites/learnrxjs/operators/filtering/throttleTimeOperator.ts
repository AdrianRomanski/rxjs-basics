/**
 * Emit first value then ignore for specified duration
 */
import {asyncScheduler, interval, throttleTime} from "rxjs";

export function throttleTimeOperator(): void {

}

function example1(): void {
  // emit value every 1 second
  const source = interval(1000);
  /*
    emit the first value, then ignore for 5 seconds. repeat...
  */
  const example = source.pipe(throttleTime(5000));
  // output: 0...6...12
  const subscribe = example.subscribe(val => console.log(val));
}

function example2(): void {
  const source = interval(1000);
  /*
    emit the first value, then ignore for 5 seconds. repeat...
  */
  const example = source.pipe(
    throttleTime(5000, asyncScheduler, { trailing: true })
  );
// output: 5...11...17
  const subscribe = example.subscribe(val => console.log(val));
}
