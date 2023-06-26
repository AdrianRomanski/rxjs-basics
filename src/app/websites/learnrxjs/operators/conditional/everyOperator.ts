/**
 * If all values pass predicate before completion emit true, else false.
 */
import {concat, every, of, tap} from "rxjs";
import {delay} from "rxjs/operators";

export function everyOperator(): void {
  example3();
}

// Example 1: Some values false
function example1(): void {
  //emit 5 values
  const source = of(1, 2, 3, 4, 5);
  const example = source.pipe(
    //is every value even?
    every(val => val % 2 === 0)
  );
//output: false
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 2: All values true
function example2(): void {
  //emit 5 values
  const allEvens = of(2, 4, 6, 8, 10);
  const example = allEvens.pipe(
    //is every value even?
    every(val => val % 2 === 0)
  );
//output: true
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 3: Values arriving over time
// and completing stream prematurely due to every returning false
function example3(): void {
  const log = console.log;
  // @ts-ignore
  const returnCode = request => (Number.isInteger(request) ? 200 : 400);
  // @ts-ignore
  const fakeRequest = request =>
    of({ code: returnCode(request) }).pipe(
      tap(_ => log(request)),
      delay(1000)
    );

  const apiCalls$ = concat(
    fakeRequest(1),
    fakeRequest('invalid payload'),
    fakeRequest(2) //this won't execute as every will return false for previous line
  ).pipe(
    every(e => e.code === 200),
    tap(e => log(`all request successful: ${e}`))
  );

  apiCalls$.subscribe();
}
