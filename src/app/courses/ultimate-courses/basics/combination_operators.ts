import {
    interval,
    empty,
    concat,
    endWith,
    of,
    concatWith,
    fromEvent,
    merge,
    mapTo,
    switchMap,
    scan,
    takeWhile, combineLatest, filter, map, forkJoin
} from 'rxjs';
import { take, startWith, delay } from 'rxjs/operators';

export function combinationOperators(): void {

    const numbers$ = of(1,2,3);
    const letters$ = of('a','b','c');

    numbers$.pipe(
        startWith('a', 'b', 'c'),
        endWith('d', 'e', 'f')
    ).subscribe(console.log);


    const interval$ = interval(1000);
    const delayed$ = empty().pipe(delay(1000));

    delayed$
        .pipe(
            concatWith(
                delayed$.pipe(startWith('3...')),
                delayed$.pipe(startWith('2...')),
                delayed$.pipe(startWith('1...')),
                delayed$.pipe(startWith('Go!'))
            ),
            startWith('Get Ready!')
        )
        .subscribe(console.log);

    const countdown: any = document.getElementById('countdown');
    const message = document.getElementById('message');
    const pauseButton = document.getElementById('pause');
    const startButton = document.getElementById('start');

// streams
    const counter$ = interval(1000);
    // @ts-ignore
    const pauseClick$ = fromEvent(pauseButton, 'click');
    // @ts-ignore
    const startClick$ = fromEvent(startButton, 'click');

    const COUNTDOWN_FROM = 10;

    /*
     * With merge, we can combine the start and pause
     * streams, taking relevant action below depending
     * on which stream emits a value.
     */
    merge(
        startClick$.pipe(mapTo(true)),
        pauseClick$.pipe(mapTo(false))
    )
        .pipe(
            /*
             * Depending on whether start or pause was clicked,
             * we'll either switch to the interval observable,
             * or to an empty observable which will act as a pause.
             */
            switchMap(shouldStart => {
                return shouldStart ? counter$ : empty();
            }),
            mapTo(-1),
            scan((accumulator, current) => {
                return accumulator + current;
            }, COUNTDOWN_FROM),
            takeWhile(value => value >= 0),
            startWith(COUNTDOWN_FROM)
        )
        .subscribe(value => {
            countdown.innerHTML = value;
            if (!value) {
                // @ts-ignore
                message.innerHTML = 'Liftoff!';
            }
        });

    const first = document.getElementById('first');
    const second = document.getElementById('second');

        /*
     * When you want to augment one stream with
     * information from a second stream on emitted values,
     * withLatestFrom is a perfect choice.
     */
    // click$.pipe(
    //   withLatestFrom(interval(1000))
    // ).subscribe(console.log);

    // @ts-ignore
    const keyupAsValue = elem => {
        return fromEvent(elem, 'keyup').pipe(
            map((event: any) => event.target.valueAsNumber)
        );
    };

    combineLatest(
        keyupAsValue(first),
        keyupAsValue(second)
    )
        .pipe(
            filter(([first, second]) => {
                return !isNaN(first) && !isNaN(second);
            }),
            map(([first, second]) => first + second)
        )
        .subscribe(console.log);

    // emits last emission from each obs after they both complete
    forkJoin({
            numbers: numbers$,
            letters: letters$
        }
    ).subscribe(console.log);

}