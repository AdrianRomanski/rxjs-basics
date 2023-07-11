/** Subscribe to second Observable if no emission occurs in given time span.
 *
 */
import {concatMap, of, timeoutWith} from "rxjs";
import {delay} from "rxjs/operators";

export function timeoutWithOperator(): void {
  // @ts-ignore
  const fakeRequest = delayTime => of('!response!').pipe(delay(delayTime));
  const requestTimeoutLogger = of('logging request timeout');
  const timeoutThreshold = 1000;

  of(timeoutThreshold + 1, timeoutThreshold - 1, timeoutThreshold + 3)
    .pipe(
      concatMap(e =>
        fakeRequest(e).pipe(timeoutWith(timeoutThreshold, requestTimeoutLogger))
      )
    )
    .subscribe(console.log);
}
