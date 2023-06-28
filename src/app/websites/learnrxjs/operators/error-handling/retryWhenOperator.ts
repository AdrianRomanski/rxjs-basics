import {delayWhen, interval, map, mergeMap, Observable, retryWhen, tap, throwError, timer} from "rxjs";
import {finalize} from "rxjs/operators";

export function retryWhenOperator(): void {
  example1();
}

// Example 1: Trigger retry after specified duration
function example1(): void {
  //emit value every 1s
  const source = interval(1000);
  const example = source.pipe(
    map(val => {
  if (val > 5) {
    //error will be picked up by retryWhen
    throw val;
  }
  return val;
}),
retryWhen(errors =>
  errors.pipe(
    //log error message
    tap(val => console.log(`Value ${val} was too high!`)),
    //restart in 6 seconds
    delayWhen(val => timer(val * 1000))
  )
)
);
/*
  output:
  0
  1
  2
  3
  4
  5
  "Value 6 was too high!"
  --Wait 6 seconds then repeat
*/
const subscribe = example.subscribe(val => console.log(val));
}

export const genericRetryStrategy = ({
                                       maxRetryAttempts = 3,
                                       scalingDuration = 1000,
                                       excludedStatusCodes = []
                                     }: {
  maxRetryAttempts?: number,
  scalingDuration?: number,
  excludedStatusCodes?: number[]
} = {}) => (attempts: Observable<any>) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find(e => e === error.status)
      ) {
        return throwError(error);
      }
      console.log(
        `Attempt ${retryAttempt}: retrying in ${retryAttempt *
        scalingDuration}ms`
      );
      // retry after 1s, 2s, etc...
      return timer(retryAttempt * scalingDuration);
    }),
    finalize(() => console.log('We are done!'))
  );
};
