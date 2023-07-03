/** Map values to inner observable, subscribe and emit in order.
 * Projects each source value to an Observable which is merged in the output Observable,
 * in a serialized fashion waiting for each one to complete before merging the next
 */
import {concatMap, mergeMap, of} from "rxjs";
import {delay} from "rxjs/operators";

export function concatMapOperator(): void {
  example3();
}

// Example 1: Demonstrating the difference between concatMap and mergeMap

// 💡 Note the difference between concatMap and mergeMap.
// Because concatMap does not subscribe to the next observable until
// the previous completes, the value from the source delayed by 2000ms will
// be emitted first. Contrast this with mergeMap which subscribes immediately
// to inner observables, the observable with the lesser delay (1000ms) will emit,
// followed by the observable which takes 2000ms to complete.
function example1(): void {
  //emit delay value
  const source = of(2000, 1000);
  // map value from source into inner observable, when complete emit result and move to next
  const example = source.pipe(
    concatMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  );
  //output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
  const subscribe = example.subscribe(val =>
    console.log(`With concatMap: ${val}`)
  );

  // showing the difference between concatMap and mergeMap
  const mergeMapExample = source
    .pipe(
      // just so we can log this after the first example has run
      delay(5000),
      mergeMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
    )
    .subscribe(val => console.log(`With mergeMap: ${val}`));
}

// Example 2: Map to promise
function example2(): void {
  //emit 'Hello' and 'Goodbye'
  const source = of('Hello', 'Goodbye');
  //example with promise
  // @ts-ignore
  const examplePromise = val => new Promise(resolve => resolve(`${val} World!`));
  // map value from source into inner observable, when complete emit result and move to next
  const example = source.pipe(concatMap(val => examplePromise(val)));
  //output: 'Example w/ Promise: 'Hello World', Example w/ Promise: 'Goodbye World'
  const subscribe = example.subscribe(val =>
    console.log('Example w/ Promise:', val)
  );
}

// Example 3: Supplying a projection function
function example3(): void {
//emit 'Hello' and 'Goodbye'
  const source = of('Hello', 'Goodbye');
//example with promise
  // @ts-ignore
  const examplePromise = val => new Promise(resolve => resolve(`${val} World!`));
//result of first param passed to second param selector function before being  returned
  const example = source.pipe(
    concatMap(
      val => examplePromise(val),
      result => `${result} w/ selector!`
    )
  );
//output: 'Example w/ Selector: 'Hello w/ Selector', Example w/ Selector: 'Goodbye w/ Selector'
  const subscribe = example.subscribe(val =>
    console.log('Example w/ Selector:', val)
  );
}
