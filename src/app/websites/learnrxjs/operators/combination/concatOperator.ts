/** Subscribe to observables in order as previous completes
 *
 * 💡 You can think of concat like a line at a ATM, the next transaction (subscription)
 * cannot start until the previous completes!
 * 💡 If throughput, not order, is a primary concern, try merge instead!
 *
 * Why use concat?
 * The concat operator is best used when you need to combine multiple observables,
 * but you want their emissions to be in a specific order, one after the other.
 * It's like putting together a puzzle where the pieces must come together sequentially to create the full picture.
 * An example of this can be seen in a real-world scenario,
 * like downloading and displaying several images in the correct order,
 * where you don't want the next image to load until the current one is fully loaded.
 *
 * Keep in mind that concat will only start emitting values from the next observable
 * once the previous one has completed. This means that if one of your observables never completes,
 * the subsequent observables will never emit any values.
 * This behavior can be a gotcha, as there will be no output and no error,
 * but one (or more) of your inner observables might not be functioning as intended,
 * or a subscription is not being set up correctly.
 *
 *
 * In contrast, if you need to combine observables that emit values concurrently,
 * or you require the latest values from multiple observables whenever any of them emit a new value,
 * combineLatest or withLatestFrom might be more suitable options.
 */
import {concat, EMPTY, interval, of} from "rxjs";
import {delay, startWith, take} from "rxjs/operators";


export function concatOperator(): void{
  example4();
}

//Example 1: Basic concat usage with three observables
function example1(): void {
  concat(
    of(1, 2, 3),
    // subscribed after first completes
    of(4, 5, 6),
    // subscribed after second completes
    of(7, 8, 9)
  )
    // log: 1, 2, 3, 4, 5, 6, 7, 8, 9
    .subscribe(console.log);
}

//Example 2: Display message using concat with delayed observables
function example2(): void {
// elems
  const userMessage = document.getElementById('message');
// helper
  // @ts-ignore
  const delayedMessage = (message, delayedTime = 1000) => {
    return EMPTY.pipe(startWith(message), delay(delayedTime));
  };

  concat(
    delayedMessage('Get Ready!'),
    delayedMessage(3),
    delayedMessage(2),
    delayedMessage(1),
    delayedMessage('Go!'),
    delayedMessage('', 2000)
    // @ts-ignore
  ).subscribe((message: any) => (userMessage.innerHTML = message));
}

// Example 3: (Warning!) concat with source that does not complete
function example3(): void {
// when source never completes, any subsequent observables never run
  concat(interval(1000), of('This', 'Never', 'Runs'))
    // log: 1,2,3,4.....
    .subscribe(console.log);
}

// Example 4: Fixed example 3
function example4(): void {
// when source never completes, any subsequent observables never run
  concat(interval(1000).pipe(take(3)), of('This', 'Runs'))
    // log: 1,2,3,4.....
    .subscribe(console.log);
}
