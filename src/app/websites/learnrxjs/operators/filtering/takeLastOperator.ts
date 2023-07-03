/** Emit the last n emitted values before completion
 * 💡 If you want only the last emission from multiple observables,
 * on completion of multiple observables, try forkJoin!
 */
import {of, takeLast} from "rxjs";

export function takeLastOperator(): void {
  const source = of('Ignore', 'Ignore', 'Hello', 'World!');
  // take the last 2 emitted values
  const example = source.pipe(takeLast(2));
  // Hello, World!
  const subscribe = example.subscribe(val => console.log(val));
}
