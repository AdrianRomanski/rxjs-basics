import {
  BehaviorSubject,
  catchError, concatMap, filter,
  fromEvent,
  interval, map,
  Observable,
  of, partition,
  retryWhen, Subject,
  takeUntil, throttleTime,
  throwError,
  timer, withLatestFrom
} from "rxjs";
import {delay, finalize, mergeMap, mergeMapTo, pluck} from "rxjs/operators";

export function tipsTricks(): void {

}

function usingFinalizeForSideEffects(): void {
// elems
  const counter = document.getElementById('counter');

// streams
  const click$ = fromEvent(document, 'click');

  const sub = interval(1000).subscribe({
    next: (val: number) => {
      // @ts-ignore
      counter.innerHTML = val;
    },
    complete: () => {
      // @ts-ignore
      counter.innerHTML = 'Stopped!'
    }
  });

// calling unsubscribe will not trigger complete callbacks
  setTimeout(() => {
    sub.unsubscribe();
  }, 2000);

// operators that complete observables will, like take and takeUntil
  interval(1000).pipe(
    takeUntil(click$)
  ).subscribe({
    next: (val: any) => {
      // @ts-ignore
      counter.innerHTML = val;
    },
    complete: () => {
      // @ts-ignore
      counter.innerHTML = 'Stopped!'
    }
  });

  /*
   * You can also use finalize, which lets you run a function
   * on completion of the observable. This is good for misc side-effects,
   * but note, like tap, does not actually emit a returned item.
   *
   * If you need to emit a final value on completion you can use
   * the endWith operator instead.
   */
  interval(1000).pipe(
    takeUntil(click$),
    // @ts-ignore
    finalize(() => counter.innerHTML = 'Stopped!')
    // @ts-ignore
  ).subscribe((val: any) => counter.innerHTML = val);

  /*
   * finalize function will also be called if an error
   * occurs.
   */
    throwError(new Error('Oops!')).pipe(
      takeUntil(click$),
      // @ts-ignore
      finalize(() => counter.innerHTML = 'Stopped!')
      // @ts-ignore
    ).subscribe((val: any) => counter.innerHTML = val);
}

function extractCommonOperatorsLogicIntoStandaloneFunctions(): void {
// streams
  const click$ = fromEvent(document, 'click');

  const genericRetryStrategy = ({
     // default values
     retryAttempts = 3,
     scalingDuration = 1000,
     excludedStatusCodes = []
   }: {
    retryAttempts?: number;
    scalingDuration?: number;
    excludedStatusCodes?: number[];
  } = {}) => (obs: Observable<any>) => {
    return obs.pipe(
      retryWhen(attempts => {
        return attempts.pipe(
          mergeMap((error, i) => {
            const attemptNumber = i + 1;
            if (
              attemptNumber > retryAttempts ||
              excludedStatusCodes.find(e => e === error.status)
            ) {
              console.log('Giving up!');
              return throwError(error);
            }
            console.log(
              `Attempt ${attemptNumber}: retrying in ${attemptNumber *
              scalingDuration}ms`
            );
            return timer(attemptNumber * scalingDuration);
          })
        );
      })
    );
  };

  /*
   * Instead of dragging all of the retry logic around,
   * we can extract it into a customizable function
   * that can be used throughout our application.
   */
  click$.pipe(
    mergeMapTo(throwError({
      status: 400,
      message: 'Server error'
    }).pipe(
        retryWhen(attempts => {
          return attempts.pipe(
            mergeMap((error, i) => {
              const attemptNumber = i + 1;
              if (
                attemptNumber > 3 ||
                [404, 500].find(e => e === error.status)
              ) {
                console.log('Giving up!');
                return throwError(error);
              }
              console.log(
                `Attempt ${attemptNumber}: retrying in ${attemptNumber *
                1000}ms`
              );
              return timer(attemptNumber * 1000);
            })
          );
        }),
        catchError(err => of(err.message))
      )
    )
  ).subscribe(console.log);

// simulate network request with error
  click$.pipe(
    mergeMapTo(throwError({
      status: 500,
      message: 'Server error'
    }).pipe(
      genericRetryStrategy({
        retryAttempts: 4,
        scalingDuration: 2000
      }),
      // you may want different catching strategy depending on page
      catchError(err => of(err.message))
    ))
  ).subscribe(console.log);
}

function useCombinationOperatorsToAccessStateFromSecondaryStreams (): void {
// elems
  const radioButtons = document.querySelectorAll('.radio-option');

  const store$ = new BehaviorSubject({
    testId: 'abc123',
    complete: false,
    moreData: {}
  });

  // @ts-ignore
  const saveAnswer = (answer, testId) => {
    // simulate delayed request
    return of({
      answer,
      testId
      // TRY TO AVOID THIS
      // testId: store$.value.testId
    }).pipe(delay(200));
  };

// streams
  const answerChange$ = fromEvent(radioButtons, 'click');

  answerChange$.pipe(
    /*
     * Instead use withLatestFrom to grab extra
     * state that you may need.
     */
    withLatestFrom(store$.pipe(pluck('testId'))),
    concatMap(([event, testId]: any) => {
      return saveAnswer(event.target.value, testId)
    })
  )
    .subscribe(console.log);
}

function automateUnsubscribeProcessWithTakeUntil(): void {
  /*
   * 1st approach, explicitly unsubscribe to every
   * subscription.
   */
  const clickSub = fromEvent(document, 'click').pipe(
    map((event: any) => ({
      x: event.clientX,
      y: event.clientY
    }))
  ).subscribe(v => {
    // take action
    console.log(v);
  });

  const scrollSub = fromEvent(document, 'scroll').pipe(
    throttleTime(30)
  ).subscribe(v => {
    // take action
    console.log(v);
  });

  const intervalSub = interval(1000).subscribe(v => {
    // take action
    console.log(v);
  });

  setTimeout(() => {
    clickSub.unsubscribe();
    scrollSub.unsubscribe();
    intervalSub.unsubscribe();
  });

  /*
   * 2nd approach, add all subscriptions together and
   * unsubscribe at once.
   */
  const subscription = fromEvent(document, 'click').pipe(
    map((event: any) => ({
      x: event.clientX,
      y: event.clientY
    }))
  ).subscribe(v => {
    // take action
    console.log(v);
  });

  subscription.add(
    fromEvent(document, 'scroll').pipe(
      throttleTime(30)
    ).subscribe(v => {
      // take action
      console.log(v);
    })
  );

  subscription.add(
    interval(1000).subscribe(v => {
      // take action
      console.log(v);
    })
  );

  setTimeout(() => {
    subscription.unsubscribe();
  }, 2000);

  /*
   * 3rd (my preferred) approach, use a Subject and the
   * takeUntil operator to automate the unsubscribe
   * process on a hook.
   */
  const onDestroy$ = new Subject();

  fromEvent(document, 'click').pipe(
    map((event: any) => ({
      x: event.clientX,
      y: event.clientY
    })),
    takeUntil(onDestroy$)
  ).subscribe(v => {
    // take action
    console.log(v);
  });

  fromEvent(document, 'scroll').pipe(
    throttleTime(30),
    takeUntil(onDestroy$)
  ).subscribe(v => {
    // take action
    console.log(v);
  })

  interval(1000).pipe(
    takeUntil(onDestroy$)
  ).subscribe(v => {
    // take action
    console.log(v);
  });

  setTimeout(() => {
    onDestroy$.next({});
    onDestroy$.complete();
  }, 2000);
}

function useFilterAndPartitionForConditionalLogic(): void {
  const MOVE_SPEED = 20;
  let leftPosition = 0;

// elems
  const box = document.getElementById('box');

// streams
  const click$ = fromEvent(document, 'click');
  const xPositionClick$ = click$.pipe(pluck('clientX'));

xPositionClick$.subscribe(xPos => {
  /*
   * Generally if you have a single if statement in
   * you subscribe block, prefer filter instead.
   */
  // @ts-ignore
  if(xPos < window.innerWidth / 2) {
    // @ts-ignore
    box.style.left = `${leftPosition -= MOVE_SPEED}px`;
  }
});

  /*
   * Filtering for specific condition before subscribe
   */
  xPositionClick$.pipe(
    // @ts-ignore
    filter(xPos => xPos < window.innerWidth / 2)
  ).subscribe(xPos => {
    // @ts-ignore
    box.style.left = `${leftPosition -= MOVE_SPEED}px`;
  });

  /*
   * In case of if / else in subscribe...
   */
  xPositionClick$.subscribe(xPos => {
    /*
     * Generally if you have a single if statement in
     * you subscribe block, prefer filter instead.
     */
    // @ts-ignore
    if(xPos < window.innerWidth / 2) {
      // @ts-ignore
      box.style.left = `${leftPosition -= MOVE_SPEED}px`;
    } else {
      // @ts-ignore
      box.style.left = `${leftPosition += MOVE_SPEED}px`;
    }
  });

  /*
   * You can use partition instead to create
   * 2 separate streams.
   */
  const [ clickLeft$, clickRight$ ] = partition(
    xPositionClick$,
    // @ts-ignore
    xPos => xPos < window.innerWidth / 2
  );

  clickLeft$.subscribe(() => {
    // @ts-ignore
    box.style.left = `${leftPosition -= MOVE_SPEED}px`;
  });

  clickRight$.subscribe(() => {
    // @ts-ignore
    box.style.left = `${leftPosition += MOVE_SPEED}px`;
  });
}

