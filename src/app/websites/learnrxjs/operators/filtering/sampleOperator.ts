/** Sample from source when provided observable emits.
 *
 */
import {from, fromEvent, interval, mapTo, merge, sample, zip} from "rxjs";

export function sampleOperator(): void {
  example3();
}

// Example 1: Sample source every 2 seconds
function example1(): void {
  //emit value every 1s
  const source = interval(1000);
  //sample last emitted value from source every 2s
  const example = source.pipe(sample(interval(3000)));
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 2: Sample source when interval emits
function example2(): void {
  const source = zip(
    //emit 'Joe', 'Frank' and 'Bob' in sequence
    from(['Joe', 'Frank', 'Bob']),
    //emit value every 2s
    interval(2000),
    from(['Mary', 'Jean', 'Witch']),
  );
  //sample last emitted value from source every 2.5s
  const example = source.pipe(sample(interval(2500)));
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 3: Distinguish between drag and click
// That one is very interesting!
function example3(): void {
  const listener = merge(
    fromEvent(document, 'mousedown').pipe(mapTo(false)),
    fromEvent(document, 'mousemove').pipe(mapTo(true))
  )
    .pipe(sample(fromEvent(document, 'mouseup')))
    .subscribe(isDragging => {
      console.log('Were you dragging?', isDragging);
    });
}
