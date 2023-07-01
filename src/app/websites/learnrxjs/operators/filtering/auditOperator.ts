/**
 * Ignores source values for a duration determined by another Observable,
 * then emits the most recent value from the source Observable,
 * then repeats this process.
 *
 * It's like auditTime, but the silencing duration is determined by a second Observable.
 */
import {audit, fromEvent, interval} from "rxjs";

export function auditOperator(): void {
  const clicks = fromEvent(document, 'click');
  const result = clicks.pipe(audit(ev => interval(1000)));
  result.subscribe(x => console.log(x));
}
