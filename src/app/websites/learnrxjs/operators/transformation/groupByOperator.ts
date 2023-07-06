/** Group into observables based on provided value.
 *
 */
import {concatMap, exhaustMap, from, groupBy, mergeMap, of, switchMap, toArray, zip} from "rxjs";


export function groupByOperator(): void {
  example2();
}

function example1(): void {
  const people = [
    { name: 'Sue', age: 25 },
    { name: 'Joe', age: 30 },
    { name: 'Frank', age: 25 },
    { name: 'Sarah', age: 35 }
  ];
  //emit each person
  const source = from(people);
  //group by age
  const example = source.pipe(
    groupBy(person => person.age),
    // return each item in group as array
    mergeMap(group => group.pipe(toArray()))
  );
  /*
    output:
    [{age: 25, name: "Sue"},{age: 25, name: "Frank"}]
    [{age: 30, name: "Joe"}]
    [{age: 35, name: "Sarah"}]
  */
  const subscribe = example.subscribe(val => console.log(val));
}

function example2(): void {
  const people = [
    { name: 'Sue', age: 25 },
    { name: 'Joe', age: 30 },
    { name: 'Frank', age: 25 },
    { name: 'Sarah', age: 35 }
  ];

  from(people)
    .pipe(
      groupBy(
        // key
        person => person.age,
        // element
        p => p.name
      ),
      // mergeMap(group => group.pipe(toArray()))

      mergeMap(group => zip(of(group.key), group.pipe(toArray())))
    )
    .subscribe(console.log);
}
 
0
