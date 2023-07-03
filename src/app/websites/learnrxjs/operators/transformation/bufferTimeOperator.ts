/** Collect emitted values until provided time has passed, emit as array.
 *
 * The key distinction between bufferTime and other buffering operators lies in
 * its time-based buffering approach. bufferTime accumulates values from the source
 * observable in an array over a specified time duration before emitting the buffered array.
 *
 * This operator is particularly well-suited for scenarios where you need to batch or throttle emissions
 * from high-frequency observables, such as monitoring user interactions, tracking mouse movements,
 * or dealing with rapidly updating data streams. bufferTime provides an efficient way to handle
 * and process these emissions in a more manageable, time-based manner.
 *
 * Remember, bufferTime allows you to manage data emissions effectively by collecting
 * and emitting them in time-based batches, as illustrated in the first example.
 * Be mindful of its implications, though, and choose the right operator according
 * to your specific use case.
 *
 */
import {bufferTime, interval} from "rxjs";

export function bufferTimeOperator(): void {
  example2();
}

// Example 1: Buffer for 2 seconds
function example1(): void {
  //Create an observable that emits a value every 500ms
  const source = interval(500);
  //After 2 seconds have passed, emit buffered values as an array
  const example = source.pipe(bufferTime(2000));
  //Print values to console
  //ex. output [0,1,2]...[3,4,5,6]
  const subscribe = example.subscribe(val =>
    console.log('Buffered with Time:', val)
  );
}

// Example 2: Multiple active buffers
function example2(): void {
//Create an observable that emits a value every 500ms
  const source = interval(500);
  /*
  bufferTime also takes second argument, when to start the next buffer (time in ms)
  for instance, if we have a bufferTime of 2 seconds but second argument (bufferCreationInterval) of 1 second:
  ex. output: [0,1,2]...[1,2,3,4,5]...[3,4,5,6,7]
  */
  const example = source.pipe(bufferTime(2000, 1000));
  //Print values to console
  const subscribe = example.subscribe(val =>
    console.log('Start Buffer Every 1s:', val)
  );
}
