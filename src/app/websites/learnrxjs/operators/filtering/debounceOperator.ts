/**
 * Discard emitted values that take less than the specified time,
 * based on selector function, between output.
 *
 * 💡 Though not as widely used as debounceTime,
 * debounce is important when the debounce rate is variable!
 */
import {debounce, interval, of, timer} from "rxjs";


export function debounceOperator(): void {
  example2();
}

// Example 1: Debounce on timer
function example1(): void {
  //emit four strings
  const example = of('WAIT', 'ONE', 'SECOND', 'Last will display');
  /*
      Only emit values after a second has passed between the last emission,
      throw away all other values
  */
  const debouncedExample = example.pipe(debounce(() => timer(1000)));
  /*
      In this example, all values but the last will be omitted
      output: 'Last will display'
  */
  const subscribe = debouncedExample.subscribe(val => console.log(val));
}

// Example 2: Debounce at increasing interval
function example2(): void {
  //emit value every 1 second, ex. 0...1...2
  const interval$ = interval(1000);
  //raise the debounce time by 200ms each second
  const debouncedInterval = interval$.pipe(debounce(val => timer(val * 200)));
  /*
    After 5 seconds, debounce time will be greater than interval time,
    all future values will be thrown away
    output: 0...1...2...3...4......(debounce time over 1s, no values emitted)
  */
  const subscribe = debouncedInterval.subscribe(val =>
    console.log(`Example Two: ${val}`)
  );
}
