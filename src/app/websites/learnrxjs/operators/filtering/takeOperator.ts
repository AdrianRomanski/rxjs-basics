/** Emit provided number of values before completing.
 *
 * Why use take?
 * When you are interested in only the first emission, you want to use take.
 * Maybe you want to see what the user first clicked on when they entered the page,
 * or you would want to subscribe to the click event and just take the first emission.
 * Another use-case is when you need to take a snapshot of data at a particular
 * point in time but do not require further emissions. For example, a stream
 * of user token updates, or a route guard based on a stream in an Angular application.
 *
 * 💡 If you want to take a variable number of values based on some logic,
 * or another observable, you can use takeUntil or takeWhile!
 * 💡 take is the opposite of skip where take will take the
 * first n number of emissions while skip will skip the first n number of emissions.
 */
import {fromEvent, interval, of, tap} from "rxjs";
import {take} from "rxjs/operators";

export function takeOperator(): void {

}

// Example 1: Take 1 value from source
function example1(): void {
  //emit 1,2,3,4,5
  const source = of(1, 2, 3, 4, 5);
  //take the first emitted value then complete
  const example = source.pipe(take(1));
  //output: 1
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 2: Take the first 5 values from source
function example2(): void {
  //emit value every 1s
  const interval$ = interval(1000);
  //take the first 5 emitted values
  const example = interval$.pipe(take(5));
  //output: 0,1,2,3,4
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 3: Taking first click location
function example3(): void {
  const oneClickEvent = fromEvent(document, 'click').pipe(
    take(1),
    tap(v => {
      // @ts-ignore
      document.getElementById(
        'locationDisplay'
        // @ts-ignore
      ).innerHTML = `Your first click was on location ${v.screenX}:${v.screenY}`;
    })
  );

  const subscribe = oneClickEvent.subscribe();
}
