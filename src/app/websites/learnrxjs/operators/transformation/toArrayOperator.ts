/**
 * Collects all source emissions and emits them as an array when the source completes.
 */
import {interval, toArray} from "rxjs";
import {take} from "rxjs/operators";

export function toArrayOperator(): void {
  interval(100)
    .pipe(take(10), toArray())
    .subscribe(console.log);
}
