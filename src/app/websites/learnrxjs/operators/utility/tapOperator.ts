/** Transparently perform actions or side-effects, such as logging.
 * If you are using as a pipeable operator, do is known as tap
 */
import {map, of, tap} from "rxjs";

// Example 1: Logging with tap
export function tapOperator(): void {
  example2();
}

function example1(): void {
  const source = of(1, 2, 3, 4, 5);
  // transparently log values from source with 'tap'
  const example = source.pipe(
    tap(val => console.log(`BEFORE MAP: ${val}`)),
    map(val => val + 10),
    tap(val => console.log(`AFTER MAP: ${val}`))
  );

  //'tap' does not transform values
  //output: 11...12...13...14...15
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 2: Using tap with object
function example2(): void {
  const source = of(1, 2, 3, 4, 5);
  // tap also accepts an object map to log next, error, and complete
  const example = source
    .pipe(
      map(val => val + 10),
      tap({
        next: val => {
          // on next 11, etc.
          console.log('on next', val);
        },
        error: error => {
          console.log('on error', error.message);
        },
        complete: () => console.log('on complete')
      })
    )
    // output: 11, 12, 13, 14, 15
    .subscribe(val => console.log(val));
}
