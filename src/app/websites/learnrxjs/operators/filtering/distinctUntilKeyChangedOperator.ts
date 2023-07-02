/** Only emit when the specified key value has changed
 *
 */
import {distinctUntilKeyChanged, from, fromEvent, pluck} from "rxjs";

export function distinctUntilKeyChangedOperator(): void {
  example2();
}

// Example 1: Compare based on key
function example1(): void {
// only output distinct values, based on the last emitted value
  const source$ = from([
    { name: 'Brian' },
    { name: 'Joe' },
    { name: 'Joe' },
    { name: 'Sue' }
  ]);

  source$
    // custom compare based on name property
    .pipe(distinctUntilKeyChanged('name'))
    // output: { name: 'Brian }, { name: 'Joe' }, { name: 'Sue' }
    .subscribe(console.log);
}


// Example 2: Keyboard events
function example2(): void {
  const keys$ = fromEvent(document, 'keyup').pipe(
    // @ts-ignore
    distinctUntilKeyChanged('key'),
  );

  keys$.subscribe(console.log);
}

