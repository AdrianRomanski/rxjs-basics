/** Emit numbers in sequence based on provided timeframe.
 *
 */
import {interval} from "rxjs";


export function intervalOperator(): void {
  //emit value in sequence every 1 second
  const source = interval(1000);
  //output: 0,1,2,3,4,5....
  const subscribe = source.subscribe(val => console.log(val));
}
