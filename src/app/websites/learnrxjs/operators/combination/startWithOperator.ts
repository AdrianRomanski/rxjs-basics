/** Emit given value first.
 * 💡 A BehaviorSubject can also start with an initial value!
 *
 * Why use startWith?
 * The startWith operator is a great tool when you need to provide an initial value to an observable sequence,
 * ensuring that the consumer always receives a value upon subscription. It's a handy way to set a default state or
 * value for your observables, making it easier for subscribers to handle the data
 * and minimizing the chances of encountering unexpected scenarios.
 * A real-world example can be seen in a search functionality, where the search results should display
 * a list of popular items as a default state before the user starts typing their query.
 * By using startWith, you can seamlessly provide this default data to your subscribers.
 * Keep in mind that startWith emits the initial value immediately upon subscription.
 * This behavior is helpful when you want to make sure your subscribers receive a value right away,
 * even before the source observable starts emitting values.
 *
 */
import {interval, of, scan} from "rxjs";
import {startWith} from "rxjs/operators";


export function startWithOperator(): void {

}

// Example 1: startWith on number sequence
function example1(): void {
//emit (1,2,3)
  const source = of(1, 2, 3);
//start with 0
  const example = source.pipe(startWith(0));
//output: 0,1,2,3
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 2: startWith for initial scan value
function example2(): void {
  //emit ('World!', 'Goodbye', 'World!')
  const source = of('World!', 'Goodbye', 'World!');
  //start with 'Hello', concat current string to previous
  const example = source.pipe(
    startWith('Hello'),
    scan((acc, curr) => `${acc} ${curr}`)
  );
  /*
    output:
    "Hello"
    "Hello World!"
    "Hello World! Goodbye"
    "Hello World! Goodbye World!"
  */
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 3: startWith multiple values
function example3(): void {
//emit values in sequence every 1s
  const source = interval(1000);
//start with -3, -2, -1
  const example = source.pipe(startWith(-3, -2, -1));
//output: -3, -2, -1, 0, 1, 2....
  const subscribe = example.subscribe(val => console.log(val));
}
