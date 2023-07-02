/** Emit the first value or first to pass provided expression.
 * 💡 The counterpart to first is last!
 *
 * 💡 First will deliver an EmptyError to the Observer's error callback
 * if the Observable completes before any next notification was sent.
 * If you don't want this behavior, use take(1) instead.
 */
import {first, from} from "rxjs";

export function firstOperator(): void {
  example3();
}


// Example 1: First value from sequence
function example1(): void {
  const source = from([1, 2, 3, 4, 5]);
  //no arguments, emit first value
  const example = source.pipe(first());
  //output: "First value: 1"
  const subscribe = example.subscribe(val => console.log(`First value: ${val}`));
}

// Example 2: First value to pass predicate
function example2(): void {
  const source = from([1, 2, 3, 4, 5]);
  //emit first item to pass test
  const example = source.pipe(first(num => num === 5));
  //output: "First to pass test: 5"
  const subscribe = example.subscribe(val =>
    console.log(`First to pass test: ${val}`)
  );
}

// Example 3: Utilizing default value
function example3(): void {
  const source = from([1, 2, 3, 4, 5]);
  //no value will pass, emit default
  const example = source.pipe(first(val => val > 5, 'Nothing'));
  //output: 'Nothing'
  const subscribe = example.subscribe(val => console.log(val));
}
