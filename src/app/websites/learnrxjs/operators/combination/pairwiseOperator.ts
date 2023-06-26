import {interval, pairwise} from "rxjs";
import {take} from "rxjs/operators";

/** Emit the previous and current values as an array.
 *
 *  Why use pairwise?
 * The pairwise operator is best suited when you need to compare or perform calculations between the current
 * and previous values emitted by an observable. Real-world examples can be seen in scenarios like tracking mouse movement,
 * where the previous and current positions are used to determine the direction or speed of the cursor,
 * or in financial applications, where consecutive stock price updates are compared to calculate the change or percentage change.
 * Keep in mind that pairwise will not emit an initial value until the observable emits at least two values.
 * This behavior can lead to confusion, as there will be no output and no error,
 * but the observable might not be functioning as intended or is waiting for more values.
 * Lastly, if you're working with observables that emit multiple values
 * but you only want to compare the last two emitted values,
 * consider using the bufferCount operator with a buffer size of 2 and a start buffer count of 1 as an alternative approach.
 */
export function pairwiseOperator(): void {
//Returns: [0,1], [1,2], [2,3], [3,4], [4,5]
  interval(1000)
    .pipe(pairwise(), take(5))
    .subscribe(console.log);
}
