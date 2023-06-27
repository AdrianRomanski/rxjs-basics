/**
 * Create an observable with given subscription function.
 *
 * 💡 defer is used as part of the iif operator!
 *
 */
import {defer, merge, of, switchMap, timer} from "rxjs";

// Example 1: Defer to get current date/time at the time of subscription
export function deferOperator(): void {
  const s1 = of(new Date()); //will capture current date time
  const s2 = defer(() => of(new Date())); //will capture date time at the moment of subscription

  console.log(new Date());

  timer(2000)
    .pipe(switchMap(_ => merge(s1, s2)))
    .subscribe(console.log);
}
