/** The observable to emit first is used.
 *
 * Why use race?
 * The race operator is the go-to choice when you want to work with multiple observables that compete against each other,
 * and you're only interested in the first one to emit a value. It's like a competitive race, where the first runne
 * r to cross the finish line claims the victory, and the others don't matter anymore (if you're not first you're last?).
 *
 * A relatable example of using race can be observed in an image loading scenario.
 * Imagine you have two sources to load an image from, and you want to display the image as soon as possible.
 * You can use the race operator to subscribe to both sources, and once the first source successfully loads the image,
 * it will emit the value, and the subscription to the other source will be automatically unsubscribed.
 * It's crucial to remember that race only pays attention to the first emitted value from the competing observables.
 * Once an observable wins the race, the other observables are disregarded,
 * and their potential future emissions will have no impact on the output.
 * If your use case involves working with multiple observables that should all emit values and complete,
 * or you need to process the emitted values in a specific order, consider using operators like combineLatest or forkJoin instead.
 *
 */
import {interval, map, mapTo, of, race} from "rxjs";
import {delay} from "rxjs/operators";

export function raceOperator(): void {
  example2();
}

//Example 1: race with 4 observables
function example1(): void {
//take the first observable to emit
  const example = race(
    //emit every 1.5s
    interval(1500),
    //emit every 1s
    interval(1000).pipe(mapTo('1s won!')),
    //emit every 2s
    interval(2000),
    //emit every 2.5s
    interval(2500)
  );
//output: "1s won!"..."1s won!"...etc
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 2: race with an error
function example2(): void {
//Throws an error and ignores the other observables.
  const first = of('first').pipe(
    delay(100),
    map(_ => {
      throw 'error';
    })
  );
  const second = of('second').pipe(delay(200));
  const third = of('third').pipe(delay(300));
// nothing logged
  race(first, second, third).subscribe(val => console.log(val));
}
