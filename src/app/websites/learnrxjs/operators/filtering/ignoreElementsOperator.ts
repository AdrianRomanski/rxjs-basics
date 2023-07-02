/** Ignore everything but complete and error.
 *
 */
import {ignoreElements, interval, mergeMap, of, throwError} from "rxjs";
import {take} from "rxjs/operators";


export function ignoreElementsOperator(): void {
  example2();
}

// Example 1: Ignore all elements from source
function example1(): void {
  //emit value every 100ms
  const source = interval(100);
  //ignore everything but complete
  const example = source.pipe(take(5), ignoreElements());
  //output: "COMPLETE!"
  const subscribe = example.subscribe(
    val => console.log(`NEXT: ${val}`),
    val => console.log(`ERROR: ${val}`),
    () => console.log('COMPLETE!')
  );
}

// Example 2: Only displaying error
function example2(): void {
  //emit value every 100ms
  const source = interval(100);
  //ignore everything but error
  const error = source.pipe(
    mergeMap(val => {
      if (val === 4) {
        return throwError(`ERROR AT ${val}`);
      }
      return of(val);
    }),
    ignoreElements()
  );
//output: "ERROR: ERROR AT 4"
  const subscribe = error.subscribe(
    val => console.log(`NEXT: ${val}`),
    val => console.log(`ERROR: ${val}`),
    () => console.log('SECOND COMPLETE!')
  );
}
