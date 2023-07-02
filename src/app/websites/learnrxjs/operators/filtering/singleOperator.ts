/** Emit single item that passes expression.
 *
 */
import {from, single} from "rxjs";

export function singleOperator(): void {
  const source = from([1, 2, 3, 4, 5]);
  //emit one item that matches predicate
  const example = source.pipe(single(val => val === 4));
  //output: 4
  const subscribe = example.subscribe(val => console.log(val));
}
