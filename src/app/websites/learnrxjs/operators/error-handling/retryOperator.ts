/** Retry an observable sequence a specific number of times should an error occur.
 * 💡 Useful for retrying HTTP requests!
 * 💡 If you only want to retry in certain cases, check out retryWhen!
 * 💡 For non error cases check out repeat!
 */
import {interval, mergeMap, of, retry, throwError} from "rxjs";

export function retryOperator(): void {
  //emit value every 1s
  const source = interval(1000);
  const example = source.pipe(
    mergeMap(val => {
      //throw error for demonstration
      if (val > 5) {
        return throwError('Error!');
      }
      return of(val);
    }),
    //retry 2 times on error
    retry(2)
  );
  /*
    output:
    0..1..2..3..4..5..
    0..1..2..3..4..5..
    0..1..2..3..4..5..
    "Error!: Retried 2 times then quit!"
  */
  const subscribe = example.subscribe({
    next: val => console.log(val),
    error: val => console.log(`${val}: Retried 2 times then quit!`)
  });
}
