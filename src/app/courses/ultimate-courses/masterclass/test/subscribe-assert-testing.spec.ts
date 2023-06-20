import {catchError, map, mergeMap, of, toArray} from "rxjs";
import {delay} from "rxjs/operators";

describe('subscribe & assert testing in RxJS', () => {

  it('should compare each emitted value', () => {
    const source$ = of(1,2,3);
    const final$ = source$.pipe(
      map(val => val * 10),
      toArray()
    );

    const expected = [10,20,30];

    final$.subscribe(value => {
      expect(value).toEqual(expected);
    })
  })

  it('should let you test async operations with done callback', (done) => {
    const source$ = of('Ready', 'Set', 'Go!')
      .pipe(
        mergeMap((message,index) => {
          return of(message).pipe(
            delay(index * 1000)
          )
        })
      );

    const expected: string[] = ['Ready', 'Set', 'Go!'];
    let index = 0;

    source$.subscribe(value => {
      expect(value).toEqual(expected[index]);
      index++;
    }, null, done)
  })

  it('should let you test errors and error messages', () => {
    const source$ = of(
      {first: 'Brain', last: 'Smith'}, null).pipe(
        // @ts-ignore
        map(o => `${o.first} ${o.last}`),
        catchError(() => {
          throw 'Invalid Response'
        })
    );

    const expected = ['Brain Smith', 'Invalid Response'];

    source$.subscribe({
      next: value => {
        expect(value).toEqual(expected[0])
      },
      error: err => {
        expect(err).toEqual(expected[1])
      }
    });
  })
})
