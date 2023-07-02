/**
 * Emits items emitted that are distinct based on any previously emitted item.
 */
import {distinct, from, of} from "rxjs";


export function distinctOperator(): void {
  example2();
}

// Example 1: distinct without selector
function example1(): void {
  of(1, 2, 3, 4, 5, 1,2, 3, 4, 5, 6)
    .pipe(distinct())
    // OUTPUT: 1,2,3,4,5
    .subscribe(console.log);
}

// Example 2: distinct without selector
function example2(): void {
  const obj1 = { id: 3, name: 'name 1' };
  const obj2 = { id: 4, name: 'name 2' };
  const obj3 = { id: 3, name: 'name 3' };
  const vals = [obj1, obj2, obj3];

  from(vals)
    .pipe(distinct(e => e.id))
    .subscribe(console.log);
}
