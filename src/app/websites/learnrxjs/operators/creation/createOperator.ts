/** Create an observable with given subscription function.
 *
 */
import {Observable} from "rxjs";

export function createOperator(): void {
  example2();
}

function example1(): void {
  /*
    Create an observable that emits 'Hello' and 'World' on
    subscription.
  */
  // @ts-ignore
  const hello = Observable.create(function(observer) {
    observer.next('Hello');
    observer.next('World');
    observer.complete();
  });

//output: 'Hello'...'World'
  // @ts-ignore
  const subscribe = hello.subscribe(val => console.log(val));
}

function example2(): void {
  // @ts-ignore
  const evenNumbers = Observable.create(function(observer) {
    let value = 0;
    const interval = setInterval(() => {
      if (value % 2 === 0) {
        observer.next(value);
      }
      value++;
    }, 1000);

    return () => clearInterval(interval);
  });
//output: 0...2...4...6...8
  // @ts-ignore
  const subscribe = evenNumbers.subscribe(val => console.log(val));
//unsubscribe after 10 seconds
  setTimeout(() => {
    subscribe.unsubscribe();
  }, 10000);
}
