/**Collect and subscribe to all observables.
 *
 * 💡 In many cases you can use mergeMap as a single operator instead!
 *
 * Why use mergeAll?
 * This operator is best used when you have multiple, short-lived observables that produce values
 * independently and you want to flatten them into a single output stream.
 * Real-world examples of this can be seen in scenarios like processing multiple requests simultaneously,
 * where each request is an observable and the responses need to be combined into a single stream.
 * Consider a web page that displays live news updates from different sources.
 * Each source produces updates as separate observables,
 * and you want to merge them all together to show a single feed of news updates. In this case, mergeAll can come to the rescue.
 * It's essential to note that mergeAll will start emitting values as soon as any of the inner observables emit a value.
 * This is different from combineLatest, which waits for each observable to emit at least one value before producing an output.
 * When deciding between mergeAll and other operators, keep in mind the following:
 * If you need to merge multiple observables that rely on each other for calculations or decisions, combineLatest may be more suitable.
 * If you're working with observables that only emit one value or you only require the last value
 * of each before completion, forkJoin is likely a better choice.
 * If you need to merge observables that produce values independently and are short-lived, mergeAll is the operator to reach for.
 */
import {interval, map, mergeAll, of} from "rxjs";
import {delay, take} from "rxjs/operators";


export function mergeAllOperator(): void {
  example2()
}

// Example 1: mergeAll with promises
function example1(): void {
  // @ts-ignore
  const myPromise = val =>
    new Promise(resolve =>
      setTimeout(() => resolve(`Result: ${val}`), 2000));
  //emit 1,2,3
  const source = of(1, 2, 3);

  const example = source.pipe(
    //map each value to promise
    map(val => myPromise(val)),
    //emit result from source
    mergeAll()
  );

  /*
    output:
    "Result: 1"
    "Result: 2"
    "Result: 3"
  */
  const subscribe = example.subscribe(val => console.log(val));
}

//Example 2: mergeAll with concurrent parameter
function example2(): void {
  const source = interval(500).pipe(take(5));

  /*
    interval is emitting a value every 0.5s.  This value is then being mapped to interval that
    is delayed for 1.0s.  The mergeAll operator takes an optional argument that determines how
    many inner observables to subscribe to at a time.  The rest of the observables are stored
    in a backlog waiting to be subscribe.
  */
  const example = source
    .pipe(
      map(val => source.pipe(delay(1000), take(3))),
      mergeAll(2)
    )
    .subscribe(val => console.log(val));
  /*
    The subscription is completed once the operator emits all values.
  */
}
