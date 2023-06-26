/**
 * When all observables complete, emit the last emitted value from each.
 * 💡 If you want corresponding emissions from multiple observables as they occur, try zip!
 * ⚠ If an inner observable does not complete forkJoin will never emit a value!
 *
 * Why use forkJoin?
 * This operator is best used when you have a group of observables and only care about the final
 * emitted value of each. One common use case for this is if you wish to issue multiple requests
 * on page load (or some other event) and only want to take action when a response has
 * been received for all. In this way it is similar to how you might use Promise.all.
 *
 *
 * Be aware that if any of the inner observables supplied to forkJoin error you will lose the value
 * of any other observables that would or have already completed if you do not catch
 * the error correctly on the inner observable. If you are only concerned with all inner observables
 * completing successfully you can catch the error on the outside.
 *
 * It's also worth noting that if you have an observable that emits more than one item,
 * and you are concerned with the previous emissions forkJoin is not the correct choice.
 * In these cases you may be better off with an operator like combineLatest or zip.
 *
 *
 */
import {catchError, forkJoin, interval, mergeMap, of, throwError} from "rxjs";
import {ajax} from "rxjs/ajax";
import {delay, take} from "rxjs/operators";

export function forkJoinOperator(): void {
  example4();
}

//Example 1: Using a dictionary of sources to make AJAX request
function example1(): void {
  /*
    when all observables complete, provide the last
    emitted value from each as dictionary
  */
  forkJoin(
    // as of RxJS 6.5+ we can use a dictionary of sources
    {
      google: ajax.getJSON('https://api.github.com/users/google'),
      microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
      users: ajax.getJSON('https://api.github.com/users')
    }
  )
    // { google: object, microsoft: object, users: array }
    .subscribe(console.log);
}

// Example 2: Observables completing after different durations
function example2(): void {
  // @ts-ignore
  const myPromise = val =>
    new Promise(resolve =>
      setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
    );

  /*
    when all observables complete, give the last
    emitted value from each as an array
  */
  const example = forkJoin({
    //emit 'Hello' immediately
    sourceOne: of('Hello'),
    //emit 'World' after 1 second
    sourceTwo: of('World').pipe(delay(1000)),
    //emit 0 after 1 second
    sourceThree: interval(1000).pipe(take(1)),
    //emit 0...1 in 1 second interval
    sourceFour: interval(1000).pipe(take(2)),
    //promise that resolves to 'Promise Resolved' after 5 seconds
    sourceFive: myPromise('RESULT')
  });
  /*
   * Output:
   * {
   *   sourceOne: "Hello",
   *   sourceTwo: "World",
   *   sourceThree: 0,
   *   sourceFour: 1,
   *   sourceFive: "Promise Resolved: RESULT"
   * }
   */
  const subscribe = example.subscribe(val => console.log(val));
}

//Example 3: Making a variable number of requests (uses deprecated API)
function example3(): void {
  // @ts-ignore
  const myPromise = val =>
    new Promise(resolve =>
      setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000)
    );

  const source = of([1, 2, 3, 4, 5]);
  //emit array of all 5 results
  const example = source.pipe(
    mergeMap(q => forkJoin(...q.map(myPromise))));
  /*
    output:
    [
     "Promise Resolved: 1",
     "Promise Resolved: 2",
     "Promise Resolved: 3",
     "Promise Resolved: 4",
     "Promise Resolved: 5"
    ]
  */
  const subscribe = example.subscribe(val => console.log(val));
}

//Example 4: Handling errors on outside
function example4(): void {
  /*
    If any inner observables error, the error result
    will be emitted by catchError.
  */
  const example = forkJoin({
    // emit 'Hello' immediately
    sourceOne: of('Hello'),
    // emit 'World' after 1 second
    sourceTwo: of('World').pipe(delay(1000)),
    // throw error
    sourceThree: throwError('This will error')
  }).pipe(catchError(error => of(error)));

// output: 'This will Error'
  const subscribe = example.subscribe(val => console.log(val));
}
