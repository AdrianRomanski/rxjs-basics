import { add } from '../add'
import {of} from "rxjs";

describe('A suite is just a function', () => {
  it('and so is a spec', () => {
    const r: number = add(1, 2)
    of(1,2,3,4).subscribe(console.log);
    expect(r).toBe(3)
  })
})
