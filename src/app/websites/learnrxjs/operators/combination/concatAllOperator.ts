/** Collect observables and subscribe to next when previous completes.
 *
 * ⚠ Be wary of backpressure when the source emits at a faster pace than inner observables complete!
 *
 * 💡 In many cases you can use concatMap as a single operator instead!
 *
 * Why use concatAll?
 * This operator is best used when you have multiple observables that need to be processed sequentially,
 * ensuring that each observable completes before moving on to the next.
 * Real-world examples of this can be seen in scenarios such as uploading multiple files
 * to a server one-by-one, or displaying a sequence of animations in order.
 *
 *
 * Bear in mind that concatAll will only start processing the next observable when the current one completes.
 * This is an important consideration if you have observables that emit values indefinitely
 * or take a long time to complete, as it may cause a delay in processing subsequent observables.
 *
 * Additionally, if you're working with observables that can emit values concurrently
 * and don't need to wait for one to complete before processing another,
 * mergeAll might be a more suitable choice. Similarly, if you only need to combine the values
 * of multiple observables at the point when they all complete, forkJoin could be a better option.
 *
 */
import {concatAll, interval, Observable, of} from "rxjs";
import {map, take} from "rxjs/operators";

export function concatAllOperator(): void {
  example3();
}

// Example 1: concatAll with observable
function example1(): void {
  //emit a value every 2 seconds
  const source: Observable<number> = interval(2000);
  const example: Observable<number> = source.pipe(
    //for demonstration, add 10 to and return as observable
    map(val => of(val + 10)),
    //merge values from inner observable
    concatAll()
  );
  //output: 'Example with Basic Observable 10', 'Example with Basic Observable 11'...
  const subscribe = example.subscribe(val =>
    console.log('Example with Basic Observable:', val)
  );
}

//Example 2: concatAll with promise
function example2(): void {
  //create and resolve basic promise
  // @ts-ignore
  const samplePromise = val => new Promise(resolve => resolve(val));
  //emit a value every 2 seconds
  const source: Observable<number> = interval(2000);

  const example = source.pipe(
    map(val => samplePromise(val)),
    //merge values from resolved promise
    concatAll()
  );
  //output: 'Example with Promise 0', 'Example with Promise 1'...
  const subscribe = example.subscribe(val =>
    console.log('Example with Promise:', val)
  );
}

//Example 3: Delay while inner observables complete
function example3(): void {
  const obs1: Observable<number>  = interval(1000).pipe(take(5));
  const obs2: Observable<number>  = interval(500).pipe(take(2));
  const obs3: Observable<number>  = interval(2000).pipe(take(1));
  //emit three observables
  const source: Observable<Observable<number>> = of(obs1, obs2, obs3);
  //subscribe to each inner observable in order when previous completes
  // concatAll Reminds me flatMap operator
  const example: Observable<number> = source.pipe(concatAll());
  /*
    output: 0,1,2,3,4,0,1,0
    How it works...
    Subscribes to each inner observable and emit values, when complete subscribe to next
    obs1: 0,1,2,3,4 (complete)
    obs2: 0,1 (complete)
    obs3: 0 (complete)
  */
  const subscribe = example.subscribe(val => console.log(val));
}
