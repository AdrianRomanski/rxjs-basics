/**Emit variable amount of values in a sequence and then emits a complete notification.
 *
 */
import {of} from "rxjs";

export function ofOperator(): void {
  example2();
}

// Example 1: Emitting a sequence of numbers
function example1(): void {
  //emits any number of provided values in sequence
  const source = of(1, 2, 3, 4, 5);
  //output: 1,2,3,4,5
  const subscribe = source.subscribe(val => console.log(val));
}

// Example 2: Emitting an object, array, and function
function example2(): void {
  //emits values of any type
  const source = of(
    { name: 'Brian' },
    [1, 2, 3],
    function hello() {
      return 'Hello';
  });
  //output: {name: 'Brian'}, [1,2,3], function hello() { return 'Hello' }
  const subscribe = source.subscribe(val => console.log(val));
}
