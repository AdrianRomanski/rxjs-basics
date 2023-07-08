/** Accumulate value over time via merged observables.
 *
 */
import {fromEvent, interval, map, mergeScan, scan, takeUntil} from "rxjs";

export function mergeScanOperator(): void {
// streams
  const mouseDown$ = fromEvent(document, 'mousedown');
  const mouseUp$ = fromEvent(document, 'mouseup');

// accumulate time mouse held down over time
  mouseDown$
    .pipe(
      mergeScan((acc, curr) => {
        return interval(1000).pipe(
          scan((a, _) => ++a, 0),
          map((val: any) => val + acc),
          takeUntil(mouseUp$)
        );
      }, 0)
      // output: 1s...2s...3s...4s...
    )
    // @ts-ignore
    .subscribe(val => console.log(val));
}
