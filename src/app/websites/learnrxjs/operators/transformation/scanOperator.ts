/** Reduce over time
 *
 * Why use scan?
 * The key distinction of the scan operator when compared to other reduction operators is
 * its continuous accumulation feature. With each emitted value, the accumulator function
 * is applied, and the accumulated result is emitted instantaneously. You can remember
 * this by the phrase "accumulate and emit on-the-go."
 *
 * The scan operator is highly useful in scenarios that require real-time monitoring and
 * processing, such as tallying scores in a game, where you want to display the
 * updated score each time points are added. However, be cautious when using scan for
 * cases where the only the final accumulated result is crucial. In those situations,
 * the reduce operator may be more appropriate, as it emits only the final value after
 * the source completes.
 *
 * In summary, the scan operator provides a powerful and flexible means of handling
 * continuous accumulation and emission of values, which can be especially useful
 * in real-time monitoring and processing tasks.
 *
 */
import {of, scan, Subject} from "rxjs";

export function scanOperator(): void {
  example2();
}

// Example 1: Sum over time
function example1(): void {
  const source = of(1, 2, 3);
  // basic scan example, sum over time starting with zero
  const example = source.pipe(scan((acc, curr) => acc + curr, 0));
  // log accumulated values
  // output: 1,3,6
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 2: Accumulating an object
function example2(): void {
  const subject = new Subject();
  //scan example building an object over time
  const example = subject.pipe(
    scan((acc, curr) => Object.assign({}, acc, curr), {})
  );
  //log accumulated values
  const subscribe = example.subscribe(val =>
    console.log('Accumulated object:', val)
  );
  //next values into subject, adding properties to object
  // {name: 'Joe'}
  subject.next({ name: 'Joe' });
  // {name: 'Joe', age: 30}
  subject.next({ age: 30 });
  // {name: 'Joe', age: 30, favoriteLanguage: 'JavaScript'}
  subject.next({ favoriteLanguage: 'JavaScript' });
}
