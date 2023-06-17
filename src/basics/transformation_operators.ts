import {
    catchError,
    concatMap,
    debounceTime, delay,
    distinctUntilChanged, EMPTY, empty, exhaustMap,
    fromEvent,
    interval,
    map,
    mergeAll,
    mergeMap, of,
    pluck,
    switchMap, take,
    takeUntil,
    takeWhile
} from "rxjs";
import {ajax} from "rxjs/ajax";

export function transformationOperators(): void {
    const GITHUB_BASE_URL = 'https://api.openbrewerydb.org/breweries'

    const inputBox = document.getElementById('text-input');
    const input$ = fromEvent(inputBox, 'keyup');


    input$.pipe(
        map((event) => {
            // @ts-ignore
            let term = event.target.value;
            // emits one value and completes
            return ajax.getJSON(
                `https://api.github.com/users/${term}`
            );
        }),
        debounceTime(100),
        // mergeAll subscribes to an Observable that emits Observables,
        // also known as a higher-order Observable.
        // Each time it observes one of these emitted inner Observables,
        // it subscribes to that and delivers all the values from the inner Observable
        // on the output Observable. The output Observable only completes once all
        // inner Observables have completed. Any error delivered by a inner
        // Observable will be immediately emitted on the output Observable.
        mergeAll()
    ).subscribe(console.log);


    input$.pipe(
        debounceTime(100),
        //A function that returns an Observable that emits the result of applying the projection function
        // (and the optional deprecated resultSelector) to each item emitted by the source Observable
        // and merging the results of the Observables obtained from this transformation

        // any time input emits another subscription is created
        mergeMap((event) => {
            // @ts-ignore
            let term = event.target.value;
            // emits one value and completes
            return ajax.getJSON(
                `https://api.github.com/users/${term}`
            );
        }),
    ).subscribe(console.log);


    const click$ = fromEvent(document, 'click');
    const mousedown$ = fromEvent(document, 'mousedown');
    const mouseup$ = fromEvent(document, 'mouseup');
    const timer$ = interval(1000);

    // any time input emits another subscription is created
    click$.pipe(
        mergeMap(() => timer$)
    ).subscribe((v) => console.log('mergeMap', v))

    // that is neat
    mousedown$.pipe(
        mergeMap(() => timer$.pipe(
            takeUntil(mouseup$)
        ))
    ).subscribe(console.log);


    const coordinates$ = click$.pipe(
        map((event) => ({
            // @ts-ignore
            x: event.clientX,
            // @ts-ignore
            y: event.clientY})
        ),
    );

    const coordinatesWithSave$ = coordinates$.pipe(
        mergeMap(coord => ajax.post(
            `https://www.mocky.io/v2/5185415ba171ea3a00704eed`,
            coord
        ))
    );
    coordinatesWithSave$.subscribe(console.log);

    // mergeMap can have multiple subscription while switchMap can have only one
    // when another observable emits first subscription completes
    click$.pipe(
        switchMap(() => timer$)
    ).subscribe((v) => console.log('switchMap', v))


    let typeHeadContainer = document.getElementById('typehead-container');

    // base for typehead
    input$.pipe(
        debounceTime(200),
        pluck('target', 'value'),
        distinctUntilChanged(),
        switchMap((searchTerm) => {
            return ajax.getJSON(`${GITHUB_BASE_URL}?by_name=${searchTerm}`).pipe(
                catchError((err, caught) => {
                    //throw error, return obs
                    return EMPTY;
                })
            )
        })
    ).subscribe((response) => {
        console.log('response', response)
        // @ts-ignore
        typeHeadContainer.innerHTML = response.map(
            b => b.name
        ).join('<br>')
    });

    // quees all obserbable until last one completes
    click$.pipe(
        /*
         * concat based operators are the 'single file line'
         * of operators, maintaining 1 active inner observable at
         * a time. For instance, in this example on the first click a new
         * interval observable will be subscribed to internally,
         * with any emitted values being emitted by concatMap.
         * If you click again while that inner interval
         * is active, the next interval will be queued until
         * the current active interval completes. At this point,
         * the next inner observable will be activated and so on...
         */
        concatMap(() => timer$.pipe(take(3)))
    ).subscribe((v) => console.log('concatMap', v))


    /*
 * BEGIN SECOND SECTION
 */
    const saveAnswer = answer => {
        // simulate delayed request
        return of(`Saved: ${answer}`).pipe(delay(1500));
    };

// elems
    const radioButtons = document.querySelectorAll('.radio-option');

// streams
    const answerChange$ = fromEvent(radioButtons, 'click');


    answerChange$
        .pipe(
            /*
             * concatMap can be useful if you need to queue
             * requests client side. For instance, in this example
             * we are emulating save requests on a quiz, ensuring
             * order remains in tact by not initiating the next
             * request until the previous completes. Be careful though,
             * as long running inner observables could cause backups.
             */
            concatMap((event: any) => saveAnswer(event.target.value))
        )
        .subscribe(console.log);

    // exhaust map ignores all observables until active one completes
    click$.pipe(
        exhaustMap(() => timer$)
    ).subscribe((v) => console.log('exhaustMap', v))


    const authenticateUser = () => {
        return ajax.post(
            'https://regres.in/api/login',
            {
                email: 'eve.holt@regres.in',
                password: 'cityslicka'
            }
        )
    }

    const loginButton = document.getElementById('login');

    const login$ = fromEvent(loginButton, 'click');

    login$.pipe(
        exhaustMap(() => authenticateUser())
    ).subscribe((v) => console.log('exhaustMap login', v))


}