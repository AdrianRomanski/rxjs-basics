import {Observable, Observer} from "rxjs";

export function gettingStarted(): void {
    const observer: Observer<any> = {
        next: value => console.log('next', value),
        error: err => console.log('error', err),
        complete: () => console.log('complete')
    }

    const observable: Observable<any> = new Observable(subscriber => {
        let count = 0;

        const  id = setInterval(() => {
            subscriber.next(count);
            // complete method of observer called
            // subscriber.complete();
            count += 1;
        }, 1000);

        return () => {
            console.log('called');
            clearInterval(id);
        }
    })


    const subscription = observable.subscribe(observer);

    const subscription2 = observable.subscribe(observer);

    subscription.add(subscription2);

    setTimeout(() => {
        // with that approach complete from observer is not fired
        subscription.unsubscribe();
    }, 3500);
}

