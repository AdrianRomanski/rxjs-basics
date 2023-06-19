import {
    auditTime,
    debounce,
    debounceTime,
    distinctUntilChanged,
    fromEvent,
    interval,
    pluck,
    sample,
    sampleTime,
    throttleTime
} from "rxjs";

export function rateOperators(): void {

    // elements
    const inputBox = document.getElementById('text-input');

    // streams
    const click$ = fromEvent(document, 'click');
    // @ts-ignore
    const input$ = fromEvent(inputBox, 'keyup');
    const timer$ = interval(1000);

    input$.pipe(
        // debounce(() => interval(1000)),
        debounceTime(5000),
        pluck('target', 'value'),
        distinctUntilChanged()
    ).subscribe((v) => console.log('debounceTime', v));

    //
    // starts after first emission
    input$.pipe(
        // debounce(() => interval(1000)),
        // emit first value in the time window
        throttleTime(5000),
        // @ts-ignore
    ).subscribe((v) => console.log('throttleTime', v.key));


    // sample time
    //u - units of time
    //
    // 1--3--5-------6-7-- values$
    // ----|---|---|---|-- auditTime(5u)
    // ----3---5-------7-- result
    //
    // ^   ^   ^   ^   ^
    //
    // ^ - when the timer starts
    //It's also worth noticing that this timer starts only when at least one value has arrived.
    input$.pipe(
        // debounce(() => interval(1000)),
        // emits based on notifier
        sampleTime(5000),
        // @ts-ignore
    ).subscribe((v) => console.log('sampleTime', v.key));


    // auditTime
    // auditTime(ms) will keep storing the latest value for ms milliseconds. After ms have passed,
    // if any value exists, it will pass along as a next notification.
    //
    // auditTime(ms) === audit(() => timer(ms, scheduler?)).
    //
    // u - units of time
    //
    // 1--3--5----------6-7-- values$
    // ----|-----|----!-----| auditTime(5u)
    // ----3-----5----------7 result
    //
    // ^     ^          ^
    //
    // ! - since the timer did not started, because there was no value after `5`,
    // there won't be any value emitted further in the stream
    //
    // ^ - when the timer starts
    input$.pipe(
        // debounce(() => interval(1000)),
        // emit latest value in time window
        auditTime(5000),
        // @ts-ignore
    ).subscribe((v) => console.log('auditTime', v.key));


    // input$.pipe(
    //     sample(click$),
    // ).subscribe((value) => console.log('timer$ + sample', value));

}