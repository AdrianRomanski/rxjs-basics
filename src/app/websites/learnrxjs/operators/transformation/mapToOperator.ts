/** Map emissions to constant value.
 *
 */
import {fromEvent, interval, mapTo} from "rxjs";

export function mapToOperator(): void {
  example2();
}

function example1(): void {
  //emit value every two seconds
  const source = interval(2000);
  //map all emissions to one value
  const example = source.pipe(mapTo('HELLO WORLD!'));
  //output: 'HELLO WORLD!'...'HELLO WORLD!'...'HELLO WORLD!'...
  const subscribe = example.subscribe(val => console.log(val));
}

function example2(): void {
  //emit every click on document
  const source = fromEvent(document, 'click');
  //map all emissions to one value
  const example = source.pipe(mapTo('GOODBYE WORLD!'));
  //output: (click)'GOODBYE WORLD!'...
  const subscribe = example.subscribe(val => console.log(val));
}
