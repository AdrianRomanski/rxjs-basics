/** Turn an array, promise, or iterable into an observable.
 *
 * 💡 This operator can be used to convert a promise to an observable!
 * 💡 For arrays and iterables, all contained values will be emitted as a sequence!
 * 💡 This operator can also be used to emit a string as a sequence of characters!
 *
 */
import {from} from "rxjs";

export function fromOperator(): void {
    example4();
}

function example1(): void {
  //emit array as a sequence of values
  const arraySource = from([1, 2, 3, 4, 5]);
//output: 1,2,3,4,5
  const subscribe = arraySource.subscribe(val => console.log(val));
}

function example2(): void {
//emit result of promise
  const promiseSource = from(new Promise(resolve => resolve('Hello World!')));
//output: 'Hello World'
  const subscribe = promiseSource.subscribe(val => console.log(val));
}

function example3(): void {
//works on js collections
  const map = new Map();
  map.set(1, 'Hi');
  map.set(2, 'Bye');

  const mapSource = from(map);
//output: [1, 'Hi'], [2, 'Bye']
  const subscribe = mapSource.subscribe(val => console.log(val));
}

function example4(): void {
//emit string as a sequence
  const source = from('Hello World');
//output: 'H','e','l','l','o',' ','W','o','r','l','d'
  const subscribe = source.subscribe(val => console.log(val));
}
