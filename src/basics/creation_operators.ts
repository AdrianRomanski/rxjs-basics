import {from, fromEvent, interval, Observer, of, range, timer} from "rxjs";

export function creation_operators() {

    function*  generatorFunction() {
        console.log("Begin execution");
        yield 'yielded value 1';
        yield 'yielded value 2';
        console.log("End execution");
    }

    const iterator = generatorFunction();

    function hello() {
        return 'Hello World';
    }

    const observer: Observer<any> = {
        next: value => console.log('next', value),
        error: err => console.log('error',err),
        complete: () => console.log('complete!')
    };

    const fromSource$ = fromEvent(document, 'click');

    const subOne = fromSource$.subscribe(observer);

    const subTwo = fromSource$.subscribe(observer);

    setTimeout(() => {
        console.log('unsubscribing');
        subOne.unsubscribe();
    }, 3000);


    const ofSource$ = of([1],2,3,4,5);

    const range$ = range(15,5);

    const fromArraySource$ = from([22,23,24,25,26]);
    const fromStringSource$ = from('Split me');
    const fromPromiseSource$ = from(fetch(
        'https://api.github.com/users/octocat')
    );
    const fromIterableSource$ = from(iterator);


    ofSource$.subscribe(observer);
    range$.subscribe(observer);
    fromArraySource$.subscribe(observer);
    fromStringSource$.subscribe(observer);
    fromPromiseSource$.subscribe(observer);
    fromIterableSource$.subscribe(observer);


    const interval$ = interval(1000);

    // with 0 start due the first item will be emitted immediately
    const timer$ = timer(0,1000);

    // to emmit only one value
    const timerWithOneEmmit$ = timer(1000);

}