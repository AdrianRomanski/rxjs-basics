/**
 * Convert an Observable that emits items into one that emits
 * indications oaf the amount of time elapsed between those emissions
 */
import {fromEvent, tap, timeInterval} from "rxjs";

export function timeIntervalOperator(): void {
  fromEvent(document, 'mousedown')
    .pipe(timeInterval(), tap(console.log))
    .subscribe(
      i =>
        console.log(`milliseconds since last click: ${i.interval}`)
    );
}
