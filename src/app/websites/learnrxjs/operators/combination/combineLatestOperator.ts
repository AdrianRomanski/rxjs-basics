/**
 * When any observable emits a value, emit the last emitted value from each
 * This operator is best used when you have multiple,
 * long-lived observables that rely on each other for some calculation or determination.
 * Be aware that combineLatest will not emit an initial value until each observable emits at least one value.
 * This is the same behavior as withLatestFrom and can be a gotcha as there will be no output and no error but one
 * (or more) of your inner observables is likely not functioning as intended, or a subscription is late.
 * Lastly, if you are working with observables that only emit one value,
 * or you only require the last value of each before completion, forkJoin is likely a better option.
 */
import {combineLatest, fromEvent, mapTo, scan, timer} from "rxjs";
import {map, startWith} from "rxjs/operators";

export function combineLatestOperator(): void {
  example3();
}

//Combining observables emitting at 3 intervals
function example1(): void {
// timerOne emits first value at 1s, then once every 4s
  const timerOne$ = timer(1000, 4000);
// timerTwo emits first value at 2s, then once every 4s
  const timerTwo$ = timer(2000, 4000);
// timerThree emits first value at 3s, then once every 4s
  const timerThree$ = timer(3000, 4000);

// when one timer emits, emit the latest values from each timer as an array
  combineLatest([timerOne$, timerTwo$, timerThree$]).subscribe(
    ([timerValOne, timerValTwo, timerValThree]) => {
      /*
        Example:
        timerThree first tick: 'Timer One Latest: 0, Timer Two Latest: 0, Timer Three Latest: 0
        timerOne second tick: 'Timer One Latest: 1, Timer Two Latest: 0, Timer Three Latest: 0
        timerTwo second tick: 'Timer One Latest: 1, Timer Two Latest: 1, Timer Three Latest: 0
      */
      console.log(
        `Timer One Latest: ${timerValOne},
         Timer Two Latest: ${timerValTwo},
         Timer Three Latest: ${timerValThree}`
      );
    }
  );
}

//Example 2: combineLatest with projection function
function example2(): void {
  const timerOne$ = timer(1000, 4000);
  const timerTwo$ = timer(2000, 4000);
  const timerThree$ = timer(3000, 4000);

  combineLatest(
    timerOne$,
    timerTwo$,
    timerThree$,
    // combineLatest also takes an optional projection function
    (one, two, three) => {
      return `Timer One (Proj) Latest: ${one},
              Timer Two (Proj) Latest: ${two},
              Timer Three (Proj) Latest: ${three}`;
    }
  ).subscribe(console.log);
}

function example3(): void {
// elem refs
  const redTotal = document.getElementById('red-total') as HTMLElement;
  const blackTotal = document.getElementById('black-total') as HTMLElement;
  const total = document.getElementById('total') as HTMLElement;

  // @ts-ignore

  const addOneClick$ = id =>
    // @ts-ignore
    fromEvent(document.getElementById(id), 'click').pipe(
      // map every click to 1
      map(() => 1),
      // keep a running total
      scan((acc, curr) => acc + curr, 0),
      startWith(0)
    );

  combineLatest([addOneClick$('red'), addOneClick$('black')]).subscribe(
    ([red, black]: any) => {
      redTotal.innerHTML = red;
      blackTotal.innerHTML = black;
      total.innerHTML = red + black;
    }
  );
}
0
