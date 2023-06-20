import {ajax} from "rxjs/ajax";
import {catchError, debounceTime, distinctUntilChanged, EMPTY, switchMap} from "rxjs";
import {pluck} from "rxjs/operators";

const BASE_URL = 'https://api.openbrewerydb.org/breweries'

// @ts-ignore
export const breweryTypehead = (ajaxHelper = ajax) => sourceObservable => {
  return sourceObservable.pipe(
    debounceTime(200),
    pluck('target', 'value'),
    distinctUntilChanged(),
    switchMap(searchTerm => {
      return ajaxHelper.getJSON(`${BASE_URL}?by_name=${searchTerm}`)
        .pipe(catchError((() => EMPTY)))
    })
  )
}
