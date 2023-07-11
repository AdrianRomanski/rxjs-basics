/**
 * Error if no value is emitted before specified duration
 */
import {catchError, concatMap, of, timeout} from "rxjs";
import {delay} from "rxjs/operators";

export function timeoutOperator(): void {
  // simulate request
  // @ts-ignore
  function makeRequest(timeToDelay) {
    return of('Request Complete!').pipe(delay(timeToDelay));
  }

  of(4000, 3000, 2000)
    .pipe(
      concatMap(duration =>
        makeRequest(duration).pipe(
          timeout(2500),
          catchError(error => of(`Request timed out after: ${duration}`))
        )
      )
    )
    /*
     *  "Request timed out after: 4000"
     *  "Request timed out after: 3000"
     *  "Request Complete!"
     */
    .subscribe(val => console.log(val));
}
