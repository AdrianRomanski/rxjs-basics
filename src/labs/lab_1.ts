import {fromEvent, map} from "rxjs";

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
        // @ts-ignore
        map((scroll) => calculateScrollPercent(scroll.target.scrollingElement))
    )

    // elems
    const progressBar: any = document.querySelector('.progress-bar');

    progress$.subscribe(percent => {
        progressBar.style.width = `${percent}%`
    })


}

