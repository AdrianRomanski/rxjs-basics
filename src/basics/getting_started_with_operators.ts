import {filter, from, fromEvent, interval, map, mapTo, of, pluck, reduce, scan, take, tap} from "rxjs";

export function gettingStartedWithOperators(): void {

    of(1,2,3,4,5)
        .pipe(
            tap((value) => console.log('before map', value)),
            map(value => value * 10),
            tap((value) => console.log('after map', value))
        )
        .subscribe(console.log);

    const keyup$ = fromEvent(document, 'keyup');

    const keyCode$ = keyup$.pipe(
        map((event: KeyboardEvent) => event.code)
    );
    const keyCodeWithPluck$ = keyup$.pipe(
        pluck('code')
    );

    const pressed$ = keyup$.pipe(
        mapTo('Key pressed')
    )


    of(1,2,3,4,5).pipe(
        filter((number) => number > 2)
    ).subscribe(console.log);

    const enter$ = keyCode$.pipe(
        filter((value) => value === 'Enter')
    )

    // enter$.subscribe(console.log);

    const numbers = [1,2,3,4,5];

    // @ts-ignore
    const totalReducer = (accumulator, currentValue) => {
        return accumulator + currentValue;
    };

    from(numbers).pipe(
        reduce(totalReducer)
    )
        .subscribe((v) => console.log('numbers array with reduce', v));

    interval(1000).pipe(
        take(3),
        reduce(totalReducer)
    ).subscribe({
        next: console.log,
        complete: () => console.log('Complete!')
    });


    from(numbers).pipe(
        scan(totalReducer)
    ).subscribe((v) => console.log('numbers array with scan', v));

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

    state$.pipe(
        map((user) => user.name)
    ).subscribe(console.log);



}