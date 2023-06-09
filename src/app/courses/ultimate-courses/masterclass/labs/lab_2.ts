import {BehaviorSubject, distinctUntilKeyChanged, map, scan, Subject} from "rxjs";

export function lab_2() {

}

export class ObservableStore {
    private _store: BehaviorSubject<any>;
    private _stateUpdate = new Subject();

    // @ts-ignore
    constructor(initialState) {
        this._store = new BehaviorSubject(initialState);
        this._stateUpdate.pipe(
            /*
             * Accumulate state over time using scan.
             * For this example we will just merge our current state
             * with updated state and emit the result, however
             * this could be any reducer / pattern you wish to follow.
             */
            scan((current, updated) => {
                return { ...current, updated }
            }, initialState)
        ).subscribe(this._store);
    }

    /*
     * Select a slice of state based on key.
     */
    selectState(key: string) {
        return this._store.pipe(
            distinctUntilKeyChanged(key),
            map(state => state[key])
        );
    }

    /*
     * Update state with new object to merge.
     */
    updateState(newState: object) {
        this._stateUpdate.next(newState);
    }

    /*
     * Subscribe to any store state changes.
     */
    stateChanges() {
        return this._store.asObservable();
    }
}