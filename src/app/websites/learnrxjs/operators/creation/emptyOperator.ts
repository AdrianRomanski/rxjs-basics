/** Observable that immediately completes.
 *
 */
import {empty, EMPTY, fromEvent, interval, mapTo, merge, scan, switchMap, takeWhile} from "rxjs";
import {startWith} from "rxjs/operators";


export function emptyOperator(): void {
  example2();
}

function example1(): void {
  const subscribe = EMPTY.subscribe({
    next: () => console.log('Next'),
    complete: () => console.log('Complete!')
  });
}

function example2(): void {
  const countdownSeconds = 10;
  // @ts-ignore
  const setHTML = id => val => (document.getElementById(id).innerHTML = val);
  const pauseButton = document.getElementById('pause');
  const resumeButton = document.getElementById('resume');
  const interval$ = interval(1000).pipe(mapTo(-1));

  // @ts-ignore
  const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));
  // @ts-ignore
  const resume$ = fromEvent(resumeButton, 'click').pipe(mapTo(true));

  const timer$ = merge(pause$, resume$)
    .pipe(
      startWith(true),
      // if timer is paused return empty observable
      switchMap(val => (val ? interval$ : EMPTY)),
      scan((acc, curr) => (curr ? curr + acc : acc), countdownSeconds),
      takeWhile(v => v >= 0)
    )
    .subscribe(setHTML('remaining'));
}
