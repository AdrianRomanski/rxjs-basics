import {
    distinctUntilChanged,
    distinctUntilKeyChanged,
    first,
    from,
    fromEvent,
    interval,
    map,
    of,
    scan,
    take,
    takeUntil,
    takeWhile
} from "rxjs";

export function filteringOperators(): void {

    const number$ = of(1,2,3,4,5);

    const click$ = fromEvent(document, 'click');


    click$.pipe(
        map((event) => ({
        // @ts-ignore
        x: event.clientX,
        // @ts-ignore
        y: event.clientY})
        ),
        first(({y}) => y > 200)
    ).subscribe(console.log);

    click$.pipe(
        map((event) => ({
            // @ts-ignore
            x: event.clientX,
            // @ts-ignore
            y: event.clientY})
        ),
        // observable completes when condition is met
        takeWhile(({y}) => y <= 200, true)
    ).subscribe(console.log);


    const counter$ = interval(1000);
    const click2$ = fromEvent(document, 'click');

    counter$.pipe(takeUntil(click2$)).subscribe(console.log);


    const numbersWithDuplicates$ = of(11, 11,'11',11, 11,22,22,22,33,33, 11);

    numbersWithDuplicates$.pipe(
        distinctUntilChanged()
    ).subscribe(console.log);

    const users = [
        {name: 'Brian', loggedIn: false, token: null},
        {name: 'Brian', loggedIn: true, token: 'abc'},
        {name: 'Brian', loggedIn: true, token: '123'}
    ]

    const state$ = from(users).pipe(
        scan((accumulator, currentValue) => {
            return {...accumulator, ...currentValue};
        })
    );

    const name$ = state$.pipe(
        distinctUntilKeyChanged('name'),
        map((user) => user.name)
    );

    name$.subscribe(console.log);



}