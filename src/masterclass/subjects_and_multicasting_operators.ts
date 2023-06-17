import {Subject, interval, BehaviorSubject, ReplaySubject, fromEvent, shareReplay, AsyncSubject} from 'rxjs';
import {mergeMapTo, share, tap} from 'rxjs/operators';
import {ajax} from "rxjs/ajax";
export function subjectsAndMulticastingOperators() {
    shareDateAmongstMultipleSubscribers();
}

function shareDateAmongstMultipleSubscribers() {
// begin lesson code

    const observer = {
        next: val => console.log('next', val),
        error: err => console.log('error', err),
        complete: () => console.log('complete')
    };

    const subject = new Subject();

    /*
     * Subjects are both observables and observers,
     * meaning they have a pipe and subscibe method, as well
     * as next, error, and complete methods to emit values
     * to any observers of the subject.
     *
     * For instance, we can subscribe to the subject like
     * any other observable.
     */
    const subscription = subject.subscribe(observer);

    /*
     * We can then use the subject to emit notifications to any
     * registered observers by calling the next method with
     * the value. This is similar to an EventEmitter.
     */
    subject.next('Hello');

    /*
     * Late subscribers to the Subject will not receive
     * previously emitted values, for instance this subscriber
     * will not receieve the value 'Hello', which was emitted before.
     * Other variations of Subjects do allow the delivery
     * of previously emitted values, and will be discussed instance
     * the following lessons.
     */
    const secondSubscription = subject.subscribe(observer);

    subject.next('World');

    /*
     * Subjects are multicast, meaning instead of each new subscriber
     * creating it's own execution path, subscribers are instead
     * registered to the subject, with each being delivered the same
     * notifications as the occur.
     *
     * To see this more clearly, let's create an interval observable.
     * We can also add on a console.log for each time the
     * interval emits.
     */
    const interval$ = interval(2000).pipe(
        tap(i => console.log('new interval', i))
    );

    /*
     * With normal, unicast observables, each subscriber would cause
     * a new interval to be created. We can see this by the fact
     * 'new interval' is being emitted twice.
     */
// interval$.subscribe(observer);
// interval$.subscribe(observer);

    /*
     * With a subject, we can share this execution by
     * first subscribing the subject to the interval$
     * observable, then subscribing to that subject.
     *
     * Remember, Subjects are OBSERVERS with next methods,
     * so you can subscribe it directly to another observable.
     */
// interval$.subscribe(subject);

    /*
     * This method of sharing an execution is so common
     * that RxJS offers a variety of operators which use subjects
     * behind the scenes to turn a typical unicast observable
     * into a multicast observable. We will explore these in detail
     * in the subsequent lessons.
     */
}

function automateTheSharingOfObservables(): void {
    const observer = {
        next: val => console.log('next', val),
        error: err => console.log('error', err),
        complete: () => console.log('complete')
    };

    const interval$ = interval(2000).pipe(
        tap(i => console.log('new interval', i))
    );

// const multicastedInterval$ = interval$.pipe(
//   /*
//    * The multicast operator will subscribe the Subject you return
//    * to the underlying observable when connect() is called.
//    * This can be any flavor of Subject, for instance you can also
//    * multicast with a Behavior or ReplaySubject instead should
//    * the need arise.
//    */
//   multicast(() => new Subject())
// );

    /*
     * Multicast returns a 'ConnectableObservable', meaning you need
     * to call the connect method to tell it when to subscribe the
     * subject to the source. Without calling connect no values will be
     * emitted. connect() returns a subscription you can use to then
     * unsubscribe when needed.
     */
// @ts-ignore
// const connectedSub = multicastedInterval$.connect();

// const subOne = multicastedInterval$.subscribe(observer);
// const subTwo = multicastedInterval$.subscribe(observer);

// // unsubscribe after 3 seconds
// setTimeout(() => {
//   connectedSub.unsubscribe();
// }, 3000);

// const multicastedInterval$ = interval$.pipe(
//   multicast(() => new Subject()),
//   /*
//    * Instead of explicitly calling connect(), you can instead use the
//    * refCount operator. refCount will automatically connect the Subject
//    * to the source for you when the first subscriber arrives, and disconnect
//    * when the subscriber count hits zero.
//    */
//   refCount()
// );

// const subOne = multicastedInterval$.subscribe(observer);
// const subTwo = multicastedInterval$.subscribe(observer);

// // unsubscribe after 3 seconds
// setTimeout(() => {
//   subOne.unsubscribe();
//   subTwo.unsubscribe();
// }, 3000);

    const multicastedInterval$ = interval$.pipe(
        /*
         * We can actually optimize this example even further. Because multicasting
         * with a refCount is so common, RxJS offers an operator that
         * does both of these things for us, the share operator. This let's us replace
         * multicast and refCount with share for the same behavior.
         */
        share()
    );

    const subOne = multicastedInterval$.subscribe(observer);
    const subTwo = multicastedInterval$.subscribe(observer);

// unsubscribe after 3 seconds
    setTimeout(() => {
        subOne.unsubscribe();
        subTwo.unsubscribe();
    }, 3000);

}

function deliverStartingValueToSubscribers(): void {
    const observer = {
        next: val => console.log('next', val),
        error: err => console.log('error', err),
        complete: () => console.log('complete')
    };

    /*
     * BehaviorSubject's accept an argument, the initial seed value.
     * This value will be emitted to subscribers until .next is called
     * again. New subscribers to BehaviorSubject's always receieve the
     * last emitted value on subscription.
     */
    const subject = new BehaviorSubject('Hello');

    /*
     * Subscribers to the BehaviorSubject will receieve the seed value,
     * or last emitted value. In this case no other value has been
     * emitted so the subscriber will initially receive 'Hello'
     */
    const subscription = subject.subscribe(observer);

    /*
     * Emit 'World' to all subscribers, just the observer above
     * right now.
     */
    subject.next('World');

    /*
     * Contrary to the normal Subject, BehaviorSubject will deliver the last
     * emitted value to late subscribers. In this case our subscriber
     * will receive 'World' immediately.
     */
    const secondSubscription = subject.subscribe(observer);

    subject.next('Goodbye!');

    /*
     * You can also access the current value of the BehaviorSubject
     * synchronously by calling getValue(), although this is
     * generally not advised.
     */
    console.log('getValue()', subject.getValue());
}

function replayHistoryToNewSubscribers(): void {

    const observer = {
        next: val => console.log('next', val),
        error: err => console.log('error', err),
        complete: () => console.log('complete')
    };

    /*
     * ReplaySubject's accept an optional argument, the number
     * of previously emitted values you wish to 'replay'
     * on subscription. These values will be emitted in sequence
     * beginning with the most recent, to any late subscribers.
     *
     * By default, if no arguments are supplied ALL values are replayed.
     */
    const subject = new ReplaySubject();

    subject.next('Hello');
    /*
     * Receieves the value 'Hello' on subscription.
     */
    const subscription = subject.subscribe(observer);

    /*
     * Emit 'World' to all subscribers, just the observer above
     * right now.
     */
    subject.next('World');

    /*
     * Late subscribers receieve the number of values replayed,
     * when available. For instance, the ReplaySubject will emit
     * 'Hello' and 'World' to this subscriber.
     */
    const secondSubscription = subject.subscribe(observer);

    subject.next('Goodbye!');
    subject.next('World!');

    /*
     * 'Hello' 'World' 'Goodbye' 'World'
     */
    const thirdSubscription = subject.subscribe(observer);
}

function automateMulticastingAndReplying(): void {
    const observer = {
        next: val => console.log('next', val),
        error: err => console.log('error', err),
        complete: () => console.log('complete')
    };

    const click$ = fromEvent(document, 'click');
    const ajax$ = ajax('https://api.github.com/users/octocat');

    /*
     * shareReplay turns a unicast observable into multicasted
     * observable, utilizing a ReplaySubject behind the scenes.
     *
     * In this example, we are mapping any clicks to an ajax
     * request, sharing the response.
     */
    const sharedClick$ = click$.pipe(
        mergeMapTo(ajax$),
        /*
         * By default shareReplay shares all old values, like
         * a standard ReplaySubject. In this case, we only want
         * to share the most recent response.
         */
        shareReplay(1)
    );

    sharedClick$.subscribe(observer)

    /*
     * Late subscribers will be replayed old value(s).
     */
    setTimeout(() => {
        console.log('subscribing');
        sharedClick$.subscribe(observer);
    }, 5000);
}

function deliverTheLastValueOnComplete(): void {


    const observer = {
        next: val => console.log('next', val),
        error: err => console.log('error', err),
        complete: () => console.log('complete')
    };

    /*
     * AsyncSubject's only emit the final value on completion.
     */
    const subject = new AsyncSubject();

    /*
     * For instance, let's create a few subscribers here...
     */
    const subscription = subject.subscribe(observer);
    const secondSubscription = subject.subscribe(observer);

    /*
     * next 4 values to AsyncSubject, nothing is emitted to observers.
     */
    subject.next('Hello');
    subject.next('World');
    subject.next('Goodbye!');
    subject.next('World!');

    /*
     * Once the subject completes, the last value, in this case
     * 'World!' is emitted.
     */
    subject.complete();
}