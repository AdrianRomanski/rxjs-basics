/**
 * Repeats an observable on completion.
 * 💡 Like retry but for non error cases!
 */
import {of, repeat} from "rxjs";
import {delay} from "rxjs/operators";

export function repeatOperator(): void {
  const delayedThing = of('delayed value').pipe(delay(2000));

  delayedThing
    .pipe(repeat(3))
    // delayed value...delayed value...delayed value
    .subscribe(console.log);
}
