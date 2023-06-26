/**
 * Compares emitted sequence to expected sequence for match
 */
import {bufferCount, from, fromEvent, map, mergeMap, of, sequenceEqual, switchMap, tap} from "rxjs";


export function sequenceEqualOperator(): void {
  example2();
}

// Example 1: simple sequenceEqual
function example1(): void {
  const expectedSequence = from([4, 5, 6]);

  of([1, 2, 3], [4, 5, 6], [7, 8, 9])
    .pipe(switchMap(arr => from(arr).pipe(sequenceEqual(expectedSequence))))
    .subscribe(console.log);

//output: false, true, false
}

// Example 2: sequenceEqual with keyboard events
function example2(): void {
  const expectedSequence = from(['q', 'w', 'e', 'r', 't', 'y']);
  // @ts-ignore
  const setResult = text => (document.getElementById('result').innerText = text);

  fromEvent(document, 'keydown')
    .pipe(
      // @ts-ignore
      map((e: KeyboardEvent) => e.key),
      tap(v => setResult(v)),
      bufferCount(6),
      mergeMap(keyDowns =>
        from(keyDowns).pipe(
          sequenceEqual(expectedSequence),
          tap(isItQwerty => setResult(isItQwerty ? 'WELL DONE!' : 'TYPE AGAIN!'))
        )
      )
    )
    .subscribe(e => console.log(`did you say qwerty? ${e}`));
}
