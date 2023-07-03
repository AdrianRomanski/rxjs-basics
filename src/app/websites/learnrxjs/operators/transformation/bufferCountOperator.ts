/** Collect emitted values until provided number is fulfilled, emit as array.
 * Why use bufferCount?
 *
 *
 * The key distinction between bufferCount and other buffering operators lies
 * in its count-based buffering approach. Upon reaching the specified count of emissions,
 * bufferCount groups and emits the values as an array. Think of it as collecting items
 * in groups of the specified count.
 *
 * This operator proves advantageous in scenarios where processing data in chunks is
 * more efficient, such as bulk updates or batch processing. By contrast, the buffer
 * operator relies on a closing notifier to define the buffering window,
 * which may not suit all use cases.
 *
 * Keep in mind, though, that bufferCount may not be the best choice when the
 * buffering strategy requires time-based or event-driven windows. In such instances,
 * consider using buffer or buffertime instead. Remember, bufferCount organizes values
 * based on emission count, as illustrated clearly in the first example.
 *
 * Exercise caution in situations where buffering strategy plays a critical role
 * in the desired output, as choosing the wrong operator might lead to unexpected behavior.
 * Familiarize yourself with the various buffering operators to make informed decisions
 * based on your specific requirements.
 *
 */
import {bufferCount, fromEvent, interval, mergeMap, of, tap} from "rxjs";
import {map} from "rxjs/operators";

export function bufferCountOperator(): void {
  example3();
}

// Example 1: Collect buffer and emit after specified number of values
  function example1(): void {
  //Create an observable that emits a value every second
  const source = interval(1000);
  //After three values are emitted, pass on as an array of buffered values
  const bufferThree = source.pipe(bufferCount(3));
  //Print values to console
  //ex. output [0,1,2]...[3,4,5]
  const subscribe = bufferThree.subscribe(val =>
    console.log('Buffered Values:', val)
  );
}

// Example 2: Overlapping buffers
function example2(): void {
//Create an observable that emits a value every second
  const source = interval(1000);
  /*
  bufferCount also takes second argument, when to start the next buffer
  for instance, if we have a bufferCount of 3 but second argument (startBufferEvery) of 1:
  1st interval value:
  buffer 1: [0]
  2nd interval value:
  buffer 1: [0,1]
  buffer 2: [1]
  3rd interval value:
  buffer 1: [0,1,2] Buffer of 3, emit buffer
  buffer 2: [1,2]
  buffer 3: [2]
  4th interval value:
  buffer 2: [1,2,3] Buffer of 3, emit buffer
  buffer 3: [2, 3]
  buffer 4: [3]
  */
  const bufferEveryOne = source.pipe(bufferCount(3, 1));
//Print values to console
  const subscribe = bufferEveryOne.subscribe(val =>
    console.log('Start Buffer Every 1:', val)
  );
}

// Example 3: Last n keyboard presses tracking
function example3(): void {
  // @ts-ignore
  const fakeKeyPressesPost = keypresses => {
    return of(201).pipe(
      tap(_ => {
        console.log(`received key presses are: ${keypresses}`);
        // @ts-ignore
        // document.getElementById('output').innerText = keypresses;
      })
    );
  };

  fromEvent(document, 'keydown')
    .pipe(
      // @ts-ignore
      map((e: KeyboardEvent) => e.key),
      bufferCount(5),
      mergeMap(fakeKeyPressesPost)
    )
    .subscribe();
}
