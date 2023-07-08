/**
 * Select property to emit.
 */
import {from, pluck} from "rxjs";

export function pluckOperator(): void {

}

// Example 1: Pluck object property
function example1(): void {
  const source = from([
    { name: 'Joe', age: 30 },
    { name: 'Sarah', age: 35 }
  ]);
  //grab names
  const example = source.pipe(pluck('name'));
  //output: "Joe", "Sarah"
  const subscribe = example.subscribe(val => console.log(val));
}

// Example 2: Pluck nested properties
function example2(): void {
  const source = from([
    { name: 'Joe', age: 30, job: { title: 'Developer', language: 'JavaScript' } },
    //will return undefined when no job is found
    { name: 'Sarah', age: 35 }
  ]);
//grab title property under job
  const example = source.pipe(pluck('job', 'title'));
//output: "Developer" , undefined
  const subscribe = example.subscribe(val => console.log(val));
}
