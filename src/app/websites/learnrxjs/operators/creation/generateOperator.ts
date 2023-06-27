/**Generates an observable sequence by running a state-driven loop
 * producing the sequence's elements, using the specified scheduler
 * to send out observer messages.
 */
import {generate} from "rxjs";
import {GenerateBaseOptions, GenerateOptions} from "rxjs/internal/observable/generate";

export function generateOperator(): void {
  example2();
}

//Example 1: Generate
function example1(){
  generate(
    // initial state
    2,
    // condition
    x => x <= 8,
    // iterate
    x => x + 3
  ).subscribe(console.log);
}

function example2(){
  // const options: GenerateOptions<number, string> = {
  //   initialState: 2,
  //   condition: x => x <= 38,
  //   iterate: x => x + 3,
  //   resultSelector: x => '.'.repeat(x)
  // }

  generate(
    {
      initialState: 2,
      condition: x => x <= 38,
      iterate: x => x + 3,
      resultSelector: ((x: number) => '.'.repeat(x))
    }
  ).subscribe(console.log);
}
