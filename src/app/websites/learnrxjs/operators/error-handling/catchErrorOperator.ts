/** Gracefully handle errors in an observable sequence.
 * ⚠ Remember to return an observable from the catchError function!
 */
import {catchError, from, fromEvent, mergeMap, of, switchMap, tap, throwError, timer} from "rxjs";


export function catchErrorOperator(): void {
  example1();
}

// Example 1: Catching error from observable
function example1(): void {
  const source = throwError('This is an error!');
  //gracefully handle error, returning observable with error message
  const example = source.pipe(catchError(val => of(`I caught: ${val}`)));
  //output: 'I caught: This is an error'
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 2: Catching rejected promise
function example2(): void {
//create promise that immediately rejects
  const myBadPromise = () =>
    new Promise((resolve, reject) => reject('Rejected!'));
//emit single value after 1 second
  const source = timer(1000);
//catch rejected promise, returning observable containing error message
  const example = source.pipe(
    mergeMap(_ =>
      from(myBadPromise()).pipe(catchError(error => of(`Bad Promise: ${error}`)))
    )
  );
//output: 'Bad Promise: Rejected'
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 3: Catching errors comparison when using switchMap/mergeMap/concatMap/exhaustMap
function example3(): void {
  const fakeRequest$ = of().pipe(
    tap(_ => console.log('fakeRequest')),
    throwError
  );


  const iWillContinueListening$ = fromEvent(
    // @ts-ignore
    document.getElementById('continued'),
    'click'
  ).pipe(
    switchMap(_ => fakeRequest$.pipe(catchError(_ => of('keep on clicking!!!'))))
  );

  const iWillStopListening$ = fromEvent(
    // @ts-ignore
    document.getElementById('stopped'),
    'click'
  ).pipe(
    switchMap(_ => fakeRequest$),
    catchError(_ => of('no more requests!!!'))
  );

  iWillContinueListening$.subscribe(console.log);
  iWillStopListening$.subscribe(console.log);
}


