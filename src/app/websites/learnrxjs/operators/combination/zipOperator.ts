/** After all observables emit, emit values as an array
 *
 * 💡 Combined with interval or timer, zip can be used to time output from another source!
 * Why use zip?
 * This operator is ideal when you want to combine values from multiple observables in a pairwise fashion,
 * like zipping together the teeth of a zipper. Imagine having two observables,
 * where one emits values like "hot", "warm", "cold", and the other emits values like "coffee", "tea", "lemonade".
 * Using the zip operator, you'd pair them together as "hot coffee", "warm tea", and "cold lemonade".
 * An everyday example is when you want to match information from two sources, like pairing names with
 * their corresponding scores in a game. Picture an observable emitting player names and another emitting their scores.
 * With zip, you can easily create pairs of [player, score], ensuring each player is associated with the correct score.
 * Be mindful that zip will only emit a value when all input observables have emitted a corresponding value.
 * This means if one observable has emitted more values than another, the unmatched values will be held back
 * until the other observable emits its next value. In some cases,
 * this could lead to unpaired values, making it important to ensure your observables are synchronized.
 */
import {fromEvent, interval, of, zip, map} from "rxjs";
import {delay, take} from "rxjs/operators";

export function zipOperator(): void {
  example4();
}

// Example 1: zip multiple observables emitting at alternate intervals
function example1(): void {
  const sourceOne = of('Hello');
  const sourceTwo = of('World!');
  const sourceThree = of('Goodbye');
  const sourceFour = of('World!');
//wait until all observables have emitted a value then emit all as an array
  const example = zip(
    sourceOne,
    sourceTwo.pipe(delay(1000)),
    sourceThree.pipe(delay(2000)),
    sourceFour.pipe(delay(3000))
  );
//output: ["Hello", "World!", "Goodbye", "World!"]
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 2: zip when 1 observable completes
function example2(): void {
//emit every 1s
  const source = interval(1000);
//when one observable completes no more values will be emitted
  const example = zip(source, source.pipe(take(2)));
//output: [0,0]...[1,1]
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 3: get X/Y coordinates of drag start/finish (mouse down/up)
function example3(): void {
  // @ts-ignore
  const documentEvent = eventName =>
    fromEvent(document, eventName).pipe(
      // @ts-ignore
      map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY }))
    );

  zip(documentEvent('mousedown'), documentEvent('mouseup')).subscribe(e =>
    console.log(JSON.stringify(e))
  );
}

// Example 4: mouse click duration
function example4(): void {
  // @ts-ignore
  const eventTime = eventName =>
    fromEvent(document, eventName).pipe(map(() => new Date()));

  const mouseClickDuration = zip(
    eventTime('mousedown'),
    eventTime('mouseup')
  ).pipe(map(([start, end]) => Math.abs(start.getTime() - end.getTime())));

  mouseClickDuration.subscribe(console.log);
}
