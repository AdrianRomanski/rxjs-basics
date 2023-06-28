import { timer } from 'rxjs';
import { tap, mapTo, share } from 'rxjs/operators';

/** Share source among multiple subscribers.
 *  share is like multicast with a Subject and refCount!
 *  RefCount
 * make a Connectable Observable behave like an ordinary Observable
 */
export function shareOperator(): void {
  //emit value in 1s
  const source = timer(1000);
//log side effect, emit result
  const example = source.pipe(
    tap(() => console.log('***SIDE EFFECT***')),
    mapTo('***RESULT***')
  );

  /*
    ***NOT SHARED, SIDE EFFECT WILL BE EXECUTED TWICE***
    output:
    "***SIDE EFFECT***"
    "***RESULT***"
    "***SIDE EFFECT***"
    "***RESULT***"
  */
  const subscribe = example.subscribe(val => console.log(val));
  const subscribeTwo = example.subscribe(val => console.log(val));

//share observable among subscribers
  const sharedExample = example.pipe(share());
  /*
    ***SHARED, SIDE EFFECT EXECUTED ONCE***
    output:
    "***SIDE EFFECT***"
    "***RESULT***"
    "***RESULT***"
  */
  const subscribeThree = sharedExample.subscribe(val => console.log(val));
  const subscribeFour = sharedExample.subscribe(val => console.log(val));
}
