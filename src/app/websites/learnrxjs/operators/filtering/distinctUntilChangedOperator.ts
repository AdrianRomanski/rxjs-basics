/**
 * Only emit when the current value is different than the last.
 *
 * 💡 distinctUntilChanged uses === comparison by default, object references must match!
 *
 * 💡 If you want to compare based on an object property, you can use distinctUntilKeyChanged instead!
 *
 */
import {distinctUntilChanged, from} from "rxjs";


export function distinctUntilChangedOperator(): void {
  example3();
}

// Example 1: distinctUntilChanged with basic values
function example1(): void {
  const source$ = from([1, 1, 2, 2, 3, 3]);

  source$
    .pipe(distinctUntilChanged())
    // output: 1,2,3
    .subscribe(console.log);
}

//Example 2: distinctUntilChanged with objects
function example2(): void {
  const sampleObject = { name: 'Test' };

//Objects must be same reference
  const source$ = from([sampleObject, sampleObject, sampleObject]);

// only emit distinct objects, based on last emitted value
  source$
    .pipe(distinctUntilChanged())
    // output: {name: 'Test'}
    .subscribe(console.log);
}

//Example 3: Using custom comparer function
function example3(): void {
// only output distinct values, based on the last emitted value
  const source$ = from([
    { name: 'Brian' },
    { name: 'Joe' },
    { name: 'Joe' },
    { name: 'Sue' }
  ]);

  source$
    // custom compare for name
    .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.name))
    // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
    .subscribe(console.log);
}
