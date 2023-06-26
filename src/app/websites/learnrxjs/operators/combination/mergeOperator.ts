/** Turn multiple observables into a single observable.
 * 💡 This operator can be used as either a static or instance method!
 * 💡 If order not throughput is a primary concern, try concat instead!
 *
 * Why use merge?
 * The merge operator is your go-to solution when you have multiple observables that produce values independently
 * and you want to combine their output into a single stream. Think of it as a highway merger, where multiple roads
 * join together to form a single, unified road - the traffic (data) from each road (observable) flows seamlessly together.
 * A real-world example can be seen in a chat application, where you have separate observables for receiving messages
 * from multiple users. By using merge, you can bring all those message streams into a
 * single unified stream for displaying the messages in the chat window.
 * Keep in mind that merge will emit values as soon as any of the observables emit a value.
 * This is different from combineLatest or withLatestFrom, which wait for each observable
 * to emit at least one value before emitting a combined value.
 * Lastly, if you're dealing with observables that emit values at specific intervals
 * and you need to combine them based on time, consider using the zip operator instead.
 */
import {interval, mapTo, merge} from "rxjs";

export function mergeOperator(): void {
  example1();
}

//Example 1: merging multiple observables, static method
function example1(): void {
//emit every 2.5 seconds
  const first = interval(2500);
//emit every 2 seconds
  const second = interval(2000);
//emit every 1.5 seconds
  const third = interval(1500);
//emit every 1 second
  const fourth = interval(1000);

//emit outputs from one observable
  const example = merge(
    first.pipe(mapTo('FIRST!')),
    second.pipe(mapTo('SECOND!')),
    third.pipe(mapTo('THIRD')),
    fourth.pipe(mapTo('FOURTH'))
  );
//output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
  const subscribe = example.subscribe(val => console.log(val));
}

