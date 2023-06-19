import { TestScheduler } from 'rxjs/testing';

describe('getting started with RxJS testing with marbles', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) =>
            expect(actual).toEqual(expected)
        );
    });

  it('should live', () => {
  })
});
