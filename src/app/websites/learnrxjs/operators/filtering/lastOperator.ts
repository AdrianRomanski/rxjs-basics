/** Emit the last value emitted from source on completion, based on provided expression.
 * 💡 The counterpart to last is first!
 */
import {from, last} from "rxjs";

export function lastOperator(): void {
  example3();
}

// Example 1: Last value in sequence
function example1(): void {
  const source = from([1, 2, 3, 4, 5]);
  //no arguments, emit last value
  const example = source.pipe(last());
  //output: "Last value: 5"
  const subscribe = example.subscribe(val => console.log(`Last value: ${val}`));
}

// Example 2: Last value to pass predicate
function example2(): void {
  const source = from([1, 2, 3, 4, 5]);
  //emit last even number
  const exampleTwo = source.pipe(last(num => num % 2 === 0));
  //output: "Last to pass test: 4"
  const subscribeTwo = exampleTwo.subscribe(val =>
    console.log(`Last to pass test: ${val}`)
  );
}

// Example 3: Last with default value
function example3(): void {
  const source = from([1, 2, 3, 4, 5]);
  //no values will pass given predicate, emit default
  const exampleTwo = source.pipe(last(v => v > 5, 'Nothing!'));
  //output: 'Nothing!'
  const subscribeTwo = exampleTwo.subscribe(val => console.log(val));
}
