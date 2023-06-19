import {catchError, fromEvent, of, timer} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {
    takeUntil,
    pluck,
    mergeMapTo,
    exhaustMap,
    tap,
    finalize,
    switchMapTo
} from 'rxjs/operators';

export function lab3(): void {

// elems
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const pollingStatus = document.getElementById('polling-status');
    const dogImage: any = document.getElementById('dog');

// streams
    // @ts-ignore
    const startClick$ = fromEvent(startButton, 'click');
    // @ts-ignore
    const stopClick$ = fromEvent(stopButton, 'click');
    let headers = {
        'Content-Type': 'application/json',
            'x-rxjs-is': 'Awesome!'
    };
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    startClick$
        .pipe(
            /*
             * Every start click we will map to an interval which
             * emits every 5 seconds to request a new image.
             * Since we do not want multiple polls active at once,
             * we'll use exhaustMap to ignore any emissions
             * while the inner interval is running.
             */
            exhaustMap(() =>
                timer(0, 5000).pipe(
                    // @ts-ignore
                    tap(() => (pollingStatus.innerHTML = 'Active')),
                    switchMapTo(
                        ajax.getJSON('https://random.dog/woof.json', headers).pipe(pluck('url')),
                    ),
                    /*
                     * Cancel the poll when stop click stream emits
                     */
                    takeUntil(stopClick$),
                    /*
                     * We'll use finalize to update the status to stopped
                     * each time the inner observable completes.
                     */
                    // @ts-ignore
                    finalize(() => (pollingStatus.innerHTML = 'Stopped'))
                )
            )
        )
        .subscribe(url => (dogImage.src = url));
}
