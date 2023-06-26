/**
 * Emit given value if nothing is emitted before completion.
 */
import {defaultIfEmpty, EMPTY, empty, of} from "rxjs";

export function defaultIfEmptyOperator(): void {
  example2();
}

// Example 1: Default for empty value
function example1(): void {
  const exampleOne = of().pipe(defaultIfEmpty('Observable.of() Empty!'));
  const subscribe = exampleOne.subscribe(val => console.log(val));
}

// Example 2: Default for Observable.empty
function example2(): void {
//emit 'Observable.empty()!' when empty, else any values from source
  const example = EMPTY.pipe(defaultIfEmpty('Observable.empty()!'));
//output: 'Observable.empty()!'
  const subscribe = example.subscribe(val => console.log(val));
}
