import {filter, fromEvent, interval, mapTo, scan, takeUntil, takeWhile} from "rxjs";

export function countDownTimer(): void {

    const countdown = document.getElementById('countdown');
    const message = document.getElementById('message');
    const abortButton = document.getElementById('abort');
    const counter$ = interval(1000);


    // counter$.subscribe(console.log);

    // @ts-ignore
    const abortClick$ = fromEvent(abortButton, 'click');

    counter$.pipe(
        mapTo(-1),
        scan((accumulator, current) => {
            return accumulator + current;
        }, 10),
        takeWhile(value => value >= 0),
        takeUntil(abortClick$)
    ).subscribe(value => {
        // @ts-ignore
        countdown.innerHTML = '' + value;
        if(!value) {
          // @ts-ignore
            message.innerHTML = 'Liftoff';
        }
    });

}