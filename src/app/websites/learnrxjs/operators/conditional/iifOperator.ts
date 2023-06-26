/**  Subscribe to first or second observable based on a condition
 *
 */
import {filter, fromEvent, iif, interval, map, mergeMap, of, throttleTime} from "rxjs";

export function iifOperator(): void {
  example2();
}

// Example 1: simple iif
function example1(): void {
  const r$ = of('R');
  const x$ = of('X');

  interval(1000)
    .pipe(mergeMap(v => iif(() => v % 4 === 0, r$, x$)))
    .subscribe(console.log);
}

// Example 2: iif with mouse moves
function example2(): void {
  const r$ = of(`I'm saying R!!`);
  const x$ = of(`X's always win!!`);


  fromEvent(document, 'mousemove')
    .pipe(
      // @ts-ignore
      throttleTime(50),
      filter((move: MouseEvent) => move.clientY < 210),
      map((move: MouseEvent) => move.clientY),
      mergeMap(yCoord => iif(() => yCoord < 110, r$, x$))
    )
    .subscribe(console.log);
}
