/** Also provide the last value from another observable.
 *
 * 💡 If you want the last emission
 * any time a variable number of observables emits, try combinelatest!
 *
 * The withLatestFrom operator is your best friend when you have one main observable whose emissions depend on the
 * latest values from one or more other observables. Think of it as a one-way data flow, where the primary observable
 * takes the lead and other observables chime in with their most recent values.
 * A classic example to remember withLatestFrom is a chat application that needs to send a message with a user's current location.
 * The message sending event (main observable) combines with the latest location data (another observable) to form the final message object.
 * Keep in mind that withLatestFrom only emits a value when the main observable emits,
 * and after each additional observable has emitted at least once. This can catch you off guard,
 * as you might not see any output or errors while one of the observables isn't behaving as expected, or a subscription is delayed.
 * If you need to combine values from multiple observables that emit more than once and are interdependent,
 * consider using combineLatest instead. And for scenarios where observables emit only once or you just need their last values, forkJoin might be a more suitable choice.
 *
 */
import {interval, map, withLatestFrom} from "rxjs";

export function withLatestFromOperator(): void {
  // example2();
}

function example1(): void {
//emit every 5s
  const source = interval(5000);
//emit every 1s
  const secondSource = interval(1000);
  const example = source.pipe(
    withLatestFrom(secondSource),
    map(([first, second]) => {
      return `First Source (5s): ${first} Second Source (1s): ${second}`;
    })
  );
  /*
    "First Source (5s): 0 Second Source (1s): 4"
    "First Source (5s): 1 Second Source (1s): 9"
    "First Source (5s): 2 Second Source (1s): 14"
    ...
  */
  const subscribe = example.subscribe(val => console.log(val));
}

function example2(): void {
  //emit every 5s
  const source = interval(5000);
//emit every 1s
  const secondSource = interval(1000);
//withLatestFrom slower than source
  const example = secondSource.pipe(
    //both sources must emit at least 1 value (5s) before emitting
    withLatestFrom(source),
    map(([first, second]) => {
      return `Source (1s): ${first} Latest From (5s): ${second}`;
    })
  );
  /*
    "Source (1s): 4 Latest From (5s): 0"
    "Source (1s): 5 Latest From (5s): 0"
    "Source (1s): 6 Latest From (5s): 0"
    ...
  */
  const subscribe = example.subscribe(val => console.log(val));
}
