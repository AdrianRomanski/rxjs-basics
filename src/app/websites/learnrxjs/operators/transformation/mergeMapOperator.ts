/** Map to observable, emit values.
 *
 * 💡 flatMap is an alias for mergeMap!
 * 💡 If only one inner subscription should be active at a time, try switchMap!
 * 💡 If the order of emission and subscription of inner observables is important, try concatMap!
 *
 * Why use mergeMap?
 *
 * This operator is best used when you wish to flatten an inner observable
 * but want to manually control the number of inner subscriptions.
 *
 * For instance, when using switchMap each inner subscription is completed when the
 * source emits, allowing only one active inner subscription. In contrast, mergeMap
 * allows for multiple inner subscriptions to be active at a time. Because of this,
 * one of the most common use-case for mergeMap is requests that should not be canceled,
 * think writes rather than reads. Note that if order must be maintained concatMap
 * is a better option
 *
 * Be aware that because mergeMap maintains multiple active inner subscriptions at once
 * it's possible to create a memory leak through long-lived inner subscriptions.
 * A basic example would be if you were mapping to an observable with an inner timer,
 * or a stream of dom events. In these cases, if you still wish to utilize mergeMap
 * you may want to take advantage of another operator to manage the completion
 * of the inner subscription, think take or takeUntil. You can also limit the number
 * of active inner subscriptions at a time with the concurrent parameter, seen in example 5.
 *
 */
import {fromEvent, interval, mergeMap, of} from "rxjs";
import {delay, take} from "rxjs/operators";
import {ajax} from "rxjs/ajax";


export function mergeMapOperator(): void {
  example5();
}

// Example 1: mergeMap simulating save of click locations
function example1(): void {
// faking network request for save
  // @ts-ignore
  const saveLocation = location => {
    return of(location).pipe(delay(500));
  };
// streams
  const click$ = fromEvent(document, 'click');


  click$
    .pipe(
      // @ts-ignore
      mergeMap((e: MouseEvent) => {
        return saveLocation({
          x: e.clientX,
          y: e.clientY,
          timestamp: Date.now()
        });
      })
    )
    // Saved! {x: 98, y: 170, ...}
    .subscribe(r => console.log('Saved!', r));
}

// Example 2: mergeMap with ajax observable
function example2(): void {
// free api url
  const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

// streams
  const click$ = fromEvent(document, 'click');

  click$
    .pipe(
      /*
       * Using mergeMap for example, but generally for GET requests
       * you will prefer switchMap.
       * Also, if you do not need the parameter like
       * below you could use mergeMapTo instead.
       * ex. mergeMapTo(ajax.getJSON(API_URL))
       */
      mergeMap(() => ajax.getJSON(API_URL))
    )
    // { userId: 1, id: 1, ...}
    .subscribe(console.log);
}

// Example 3: mergeMap with promise (could also use from to convert to observable)
function example3(): void {
  // helper to create promise
  // @ts-ignore
  const myPromise = val =>
    new Promise(resolve => resolve(`${val} World From Promise!`));

  // emit 'Hello'
  const source$ = of('Hello');

  // map to promise and emit result
  source$
    .pipe(mergeMap(val => myPromise(val)))
    // output: 'Hello World From Promise'
    .subscribe(val => console.log(val));
}

// Example 4: mergeMap with resultSelector
function example4(): void {
  // helper to create promise
  // @ts-ignore
  const myPromise = val =>
    new Promise(resolve => resolve(`${val} World From Promise!`));

  // emit 'Hello'
  const source$ = of('Hello');

  source$
    .pipe(
      mergeMap(
        val => myPromise(val),
        /*
        you can also supply a second argument which receives the source value and emitted
        value of inner observable or promise
      */
        (valueFromSource, valueFromPromise) => {
          return `Source: ${valueFromSource}, Promise: ${valueFromPromise}`;
        }
      )
    )
    // output: "Source: Hello, Promise: Hello World From Promise!"
    .subscribe(val => console.log(val));
}

function example5(): void {
// emit value every 1s
  const source$ = interval(1000);

  source$
    .pipe(
      mergeMap(
        // project
        val => interval(5000).pipe(take(2)),
        // resultSelector
        (oVal, iVal, oIndex, iIndex) => [oIndex, oVal, iIndex, iVal],
        // concurrent
        2
      )
    )
    /*
          Output:
          [0, 0, 0, 0] <--1st inner observable
          [1, 1, 0, 0] <--2nd inner observable
          [0, 0, 1, 1] <--1st inner observable
          [1, 1, 1, 1] <--2nd inner observable
          [2, 2, 0, 0] <--3rd inner observable
          [3, 3, 0, 0] <--4th inner observable
  */
    .subscribe(val => console.log(val));
}
