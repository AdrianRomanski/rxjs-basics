/** Toggle on to catch emitted values from source, toggle off to emit
 *  buffered values as array.
 *
 */
import {bufferToggle, fromEvent, interval} from "rxjs";

export function bufferToggleOperator(): void {
  example2();
}

// Example 1: Toggle buffer on and off at interval
function example1(): void {
  //emit value every second
  const sourceInterval = interval(1000);
  //start first buffer after 5s, and every 5s after
  const startInterval = interval(5000);
  //emit value after 3s, closing corresponding buffer
  // @ts-ignore
  const closingInterval = val => {
    console.log(`Value ${val} emitted, starting buffer! Closing in 3s!`);
    return interval(3000);
  };
  //every 5s a new buffer will start, collecting emitted values for 3s then emitting buffered values
  const bufferToggleInterval = sourceInterval.pipe(
    bufferToggle(startInterval, closingInterval)
  );
  //log to console
  //ex. emitted buffers [4,5,6]...[9,10,11]
  const subscribe = bufferToggleInterval.subscribe(val =>
    console.log('Emitted Buffer:', val)
  );
}


// Example 2: Toggle buffer on and off on mouse down/up
function example2(): void {
  fromEvent(document, 'mousemove')
    .pipe(
      bufferToggle(fromEvent(document, 'mousedown'), _ =>
        fromEvent(document, 'mouseup')
      )
    )
    .subscribe(console.log);
}
