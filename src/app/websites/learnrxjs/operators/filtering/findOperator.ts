/**
 * Emit the first item that passes predicate then complete.
 * 💡 If you always want the first item emitted, regardless of condition, try first()!
 */
import {filter, find, fromEvent, mapTo, repeatWhen} from "rxjs";
import {startWith} from "rxjs/operators";


export function findOperator(): void {
  // elem ref
  const status = document.getElementById('status');
  // streams
  const clicks$ = fromEvent(document, 'click');

  clicks$
    .pipe(
      find((event: any) => event.target.id === 'box'),
      mapTo('Found!'),
      startWith('Find me!'),
      // reset when click outside box
      repeatWhen(() =>
        clicks$.pipe(filter((event: any) => event.target.id !== 'box'))
      )
    )
    // @ts-ignore
    .subscribe(message => (status.innerHTML = message));
}
