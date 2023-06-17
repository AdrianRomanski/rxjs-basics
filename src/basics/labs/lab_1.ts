import {asyncScheduler, fromEvent, map, tap, throttleTime} from "rxjs";

export function scrollIndicator() {

    function calculateScrollPercent(element) {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = element;
        return (scrollTop / (scrollHeight - clientHeight)) * 100
    }

    const scroll$  = fromEvent(document, 'scroll');
    const progress$ = scroll$.pipe(
        // percent progress
        throttleTime(30, asyncScheduler, {
            leading: false,
            trailing: true
        }),
        map((scroll) =>
            calculateScrollPercent(
                // @ts-ignore
                scroll.target.scrollingElement
            )
        ),
        tap(console.log)
    )

    // elems
    const progressBar: any = document.querySelector('.progress-bar');

    progress$.subscribe(percent => {
        progressBar.style.width = `${percent}%`
    })


}

