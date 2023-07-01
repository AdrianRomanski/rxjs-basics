/** Discard emitted values that take less than the specified time between output
 * 💡 This operator is popular in scenarios such as type-ahead where the rate of user input must be controlled!
 */
import {debounceTime, fromEvent} from "rxjs";
import {map} from "rxjs/operators";


export function debounceTimeOperator(): void {
  // elem ref
  const searchBox = document.getElementById('search');

  // streams
  // @ts-ignore
  const keyup$ = fromEvent(searchBox, 'keyup');

  // wait .5s between keyups to emit current value
  keyup$
    .pipe(
      map((i: any) => i.currentTarget.value),
      debounceTime(500)
    )
    .subscribe(console.log);
}
