/** Map to same inner observable, complete previous inner observable.
 * If you need to consider the emitted value from the source, try switchMap!
 */
import {fromEvent, interval, scan, takeWhile} from "rxjs";
import {finalize, startWith, switchMapTo} from "rxjs/operators";

export function switchMapToOperator(): void {
  const COUNTDOWN_TIME = 10;

// reference
  const countdownElem = document.getElementById('countdown');

// streams
  const click$ = fromEvent(document, 'click');
  const countdown$ = interval(1000).pipe(
    scan((acc, _) => --acc, COUNTDOWN_TIME),
    startWith(COUNTDOWN_TIME)
  );

  click$
    .pipe(
      switchMapTo(countdown$),
      takeWhile(val => val >= 0),
      // @ts-ignore
      finalize(() => (countdownElem.innerHTML = "We're done here!"))
    )
    // @ts-ignore
    .subscribe((val: any) => (countdownElem.innerHTML = val));
}
