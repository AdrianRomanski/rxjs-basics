/** Turn notification objects into notification values.
 *
 */
import {dematerialize, from, Notification} from 'rxjs';

export function dematerializeOperator(): void {
  //emit next and error notifications
  const source = from([
    Notification.createNext('SUCCESS!'),
    Notification.createError('ERROR!')
  ]).pipe(
    //turn notification objects into notification values
    dematerialize()
  );

//output: 'NEXT VALUE: SUCCESS' 'ERROR VALUE: 'ERROR!'
  const subscription = source.subscribe({
    next: val => console.log(`NEXT VALUE: ${val}`),
    error: val => console.log(`ERROR VALUE: ${val}`)
  });
}
