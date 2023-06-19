import {
    animationFrameScheduler,
    asapScheduler,
    asyncScheduler,
    interval,
    of,
    queueScheduler,
    subscribeOn,
    takeWhile
} from "rxjs";
import {tap} from "rxjs/operators";

export function schedulers(): void {

}

// async scheduler
function executeTasksAsynchronously(): void {
    const observer = {
        next: val => console.log('next', val),
        error: err => console.log('error', err),
        complete: () => console.log('complete')
    };

    /*
     * The asyncScheduler lets you schedule tasks asynchronously,
     * similar to a setTimeout. All schedulers have a signature
     * of work, delay, state, but providing a delay for any other
     * scheduler will simply default it to the asyncScheduler
     * behind the scenes.
     *
     * The schedule call returns a subscription, so if you need
     * to cancel work before it is performed you can simply
     * unsubscribe, similar to observables.
     */
    const sub = asyncScheduler.schedule(
        // work
        console.log,
        // delay
        2000,
        // state
        'Hello World!'
    );
    // sub.unsubscribe();

    /*
     * Most static creation operators accept a scheduler as
     * the last argument. For instance, if we want to emit
     * values from of asynchronously, we can supply the
     * asyncScheduler as the last argument.
     *
     * Output: 4,5,6,1,2,3
     */
    // of(1,2,3, asyncScheduler).subscribe(observer);
    // of(4,5,6).subscribe(observer);

    /*
     * You can also introduce schedulers by using the
     * observeOn operator. This is equivalent to wrapping
     * next, error, and complete functions in appropriate
     * scheduler.
     */
    // of(1,2,3).pipe(
    //   // logging values before scheduler
    //   tap(observer),
    //   // delay can also be supplied as second argument
    //   observeOn(asyncScheduler, 2000)
    // ).subscribe(observer);

    /*
     * Lastly, you can use schedulers to determine when
     * subscriptions occur by using the subscribeOn
     * operator. This is equivalent to wrapping your entire
     * subscription in a scheduler.
     */
    of(1,2,3).pipe(
        tap(observer),
        subscribeOn(asyncScheduler, 2000)
    ).subscribe(observer);

}

// asap scheduler
function deferTaskExecution(): void {
    const observer = {
        next: val => console.log('next', val),
        error: err => console.log('error', err),
        complete: () => console.log('complete')
    };

    /*
     * The asapScheduler executes tasks asynchronously but
     * 'as quickly as possible', similar to microtasks.
     * For instance, even though our task scheduled with
     * the asapScheduler appears after the asyncScheduler
     * task, it will be executed before, but not before the
     * synchronous console.log. This is the same behavior
     * you would see with Promise.resolve or queueMicrotask.
     */
    asyncScheduler.schedule(() => console.log('asyncScheduler'));
    // queueMicrotask(() => console.log('queueMicrotask'));
    // Promise.resolve('fromPromise').then(console.log);
    asapScheduler.schedule(() => console.log('asapScheduler'));
    console.log('synchronous');

    /*
     * Like other schedulers it can be provided as an
     * argument to most static operators, or by using the observeOn
     * or subscribeOn operators.
     */
    // as argument to static operator
    // of(1,2,3, asapScheduler).subscribe(observer);

    // using observeOn
    // of(1,2,3).pipe(
    //   // logging values before scheduler
    //   tap(observer),
    //   observeOn(asapScheduler)
    // ).subscribe(observer);

    // using subscribeOn
    // of(1,2,3).pipe(
    //   tap(observer),
    //   subscribeOn(asapScheduler)
    // ).subscribe(observer);
}

// animation frame scheduler
function scheduleTaskBeforeBrowserRepaints(): void {
    const ball = document.getElementById('ball');
    /*
     * The animationFrameScheduler let's you schedule
     * tasks before browser repaint.
     */
    // animationFrameScheduler.schedule(function(position){
    //   ball.style.transform = `translate3d(0, ${position}px, 0`;
    //   if(position <= 200) {
    //     this.schedule(position + 1)
    //   }
    // }, 0, 0);

    interval(0, animationFrameScheduler).pipe(
        takeWhile(val => val <= 200)
    ).subscribe(val => {
        ball.style.transform = `translate3d(0, ${val}px, 0`;
    });
}

// queue scheduler
function executeTasksOnQueue(): void {
    const observer = {
        next: val => console.log('next', val),
        error: err => console.log('error', err),
        complete: () => console.log('complete')
    };

    /*
     * The queueScheduler executes tasks synchronously by default,
     * allowing you to queue tasks inside other tasks.
     */
    asyncScheduler.schedule(() => console.log('asyncScheduler'));
    asapScheduler.schedule(() => console.log('asapScheduler'));
    queueScheduler.schedule(() => console.log('queueScheduler'));
    console.log('synchronous');

    /*
     * Scheduling tasks with queue scheduler inside another
     * queue will always execute the outer tasks first.
     */
    queueScheduler.schedule(() => {
        queueScheduler.schedule(() => {
            console.log('inside second queue');
            queueScheduler.schedule(() => {
                console.log('inside third queue');
            });
        });
        console.log('inside first queue');
    })
}