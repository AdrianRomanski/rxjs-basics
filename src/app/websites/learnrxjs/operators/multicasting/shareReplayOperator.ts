/** Share source and replay specified number of emissions on subscription.
 *
 * Why use shareReplayOperator?
 * You generally want to use shareReplayOperator when you have side-effects
 * or taxing computations that you do not wish to be executed amongst multiple subscribers.
 * It may also be valuable in situations where you know you will have late subscribers
 * to a stream that need access to previously emitted values.
 * This ability to replay values on subscription is what differentiates share and shareReplayOperator
 */
import {pluck, ReplaySubject, shareReplay, Subject, tap} from "rxjs";
import {share} from "rxjs/operators";

export function shareReplayOperator(): void {
  example3();
}

// For instance, suppose you have an observable that emits the last visited url.
// In the first example we are going to use share:
function example1(): void {
  // simulate url change with subject
  const routeEnd = new Subject<{data: any, url: string}>();

  // grab url and share with subscribers
  const lastUrl = routeEnd.pipe(
    pluck('url'),
    share()
  );

  // initial subscriber required
  const initialSubscriber = lastUrl.subscribe(console.log);

  // simulate route change
  routeEnd.next({data: {}, url: 'my-path'});

  // nothing logged
  const lateSubscriber = lastUrl.subscribe(console.log);
}

//In the above example nothing is logged as the lateSubscriber subscribes  to the source.
// Now suppose instead we wanted to give access
// to the last emitted value on subscription, we can accomplish this with shareReplay
function example2(): void {
  // simulate url change with subject
  const routeEnd = new Subject<{data: any, url: string}>();

  // grab url and share with subscribers
  const lastUrl = routeEnd.pipe(
    tap(_ => console.log('executed')),
    pluck('url'),
    // defaults to all values so we set it to just keep and replay last one
    shareReplay(1)
  );

  // requires initial subscription
  const initialSubscriber = lastUrl.subscribe(console.log);

  // simulate route change
  // logged: 'executed', 'my-path'
  routeEnd.next({data: {}, url: 'my-path'});

  // logged: 'my-path'
  const lateSubscriber = lastUrl.subscribe(console.log);
}

//Note that this is similar behavior to what you would see if you subscribed
// a ReplaySubject to the lastUrl stream, then subscribed to that Subject:

function example3(): void {
  // simulate url change with subject
  const routeEnd = new Subject<{data: any, url: string}>();

  // instead of using shareReplay, use ReplaySubject
  const shareWithReplay = new ReplaySubject();

  // grab url and share with subscribers
  const lastUrl = routeEnd.pipe(
    pluck('url')
  )
    .subscribe(val => shareWithReplay.next(val));

  // simulate route change
  routeEnd.next({data: {}, url: 'my-path'});

  // subscribe to ReplaySubject instead
  // logged: 'my path'
  shareWithReplay.subscribe(console.log);
}

