/**
 * Reduces the values from source observable
 * to a single value that's emitted when the source completes
 *
 * 💡 Just like Array.prototype.reduce()
 * 💡 If you need the current accumulated value on each emission, try scan!
 */
import {of, reduce} from "rxjs";


export function reduceOperator(): void {
  const source = of(1, 2, 3, 4);
  const example = source.pipe(reduce((acc, val) => acc + val));
//output: Sum: 10'
  const subscribe = example.subscribe(val => console.log('Sum:', val));
}
