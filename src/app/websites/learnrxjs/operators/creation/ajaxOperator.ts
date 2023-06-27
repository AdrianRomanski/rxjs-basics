/**Create an observable for an Ajax request with either a request object
 * with url, headers, etc or a string for a URL.
 *
 */
import {ajax} from "rxjs/ajax";

export function ajaxOperator(): void {
  example4();
}

// Example 1: Observable that emits the response object that is being returned from the request.
function example1(): void {
  const githubUsers = `https://api.github.com/users?per_page=2`;

  const users = ajax(githubUsers);

  const subscribe = users.subscribe(
    res => console.log(res),
    err => console.error(err)
  );
}

// Example 2: Observable that emits only the json key of the response object that is being returned from the request.
function example2(): void {
  const githubUsers = `https://api.github.com/users?per_page=2`;

  const users = ajax.getJSON(githubUsers);

  const subscribe = users.subscribe(
    res => console.log(res),
    err => console.error(err)
  );
}

// Example 3: Observable that emits the error object that is being returned from the request.
function example3(): void {
  const githubUsers = `https://api.github.com/error`;

  const users = ajax.getJSON(githubUsers);

  const subscribe = users.subscribe(
    res => console.log(res),
    err => console.error(err)
  );
}

// Example 4: Ajax operator with object as input.
function example4(): void {
  const githubUsers = `https://api.github.com/error`;

  const users = ajax({
    url: githubUsers,
    method: 'GET',
    headers: {
      /*some headers*/
    },
    body: {
      /*in case you need a body*/
    }
  });

  const subscribe = users.subscribe(
    res => console.log(res),
    err => console.error(err)
  );
}
