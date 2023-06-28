/** Share source utilizing the provided Subject.
 *
 */
import {interval, mapTo, multicast, ReplaySubject, Subject, tap} from "rxjs";
import {take} from "rxjs/operators";

export function multicastOperator(): void {
  example2();
}

// Example 1: multicast with standard Subject
function example1(): void {
  //emit every 2 seconds, take 5
  const source = interval(2000).pipe(take(5));

  const example = source.pipe(
    //since we are multicasting below, side effects will be executed once
    tap(() => console.log('Side Effect #1')),
    mapTo('Result!')
  );

//subscribe subject to source upon connect()
  const multi = example.pipe(multicast(() => new Subject()));
  /*
    subscribers will share source
    output:
    "Side Effect #1"
    "Result!"
    "Result!"
    ...
  */
  const subscriberOne = multi.subscribe(val => console.log(val));
  const subscriberTwo = multi.subscribe(val => console.log(val));
//subscribe subject to source
  // @ts-ignore
  multi.connect();
}

//Example 2: multicast with ReplaySubject
function example2(): void {
  //emit every 2 seconds, take 5
  const source = interval(2000).pipe(take(5));

//example with ReplaySubject
  const example = source.pipe(
    //since we are multicasting below, side effects will be executed once
    tap(_ => console.log('Side Effect #2')),
    mapTo('Result Two!')
  );
//can use any type of subject
  const multi = example.pipe(multicast(() => new ReplaySubject(5)));
//subscribe subject to source
  // @ts-ignore
  multi.connect();

  setTimeout(() => {
    /*
     subscriber will receieve all previous values on subscription because
     of ReplaySubject
     */
    const subscriber = multi.subscribe(val => console.group(val));
  }, 5000);
}
