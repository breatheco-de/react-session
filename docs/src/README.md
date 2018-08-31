# React Session Management

Create and maintain persisten login sessions on the browser (even if the website is refreshed).
Checkout the [live demo](https://breatheco-de.github.io/react-session/).
> Note: Extremely easy integration with [React Router](https://github.com/ReactTraining/react-router).

## Installation

```
$ npm i --save bc-react-session
```

## Usage

1) Open a session by doing `Session.login();`:

```js
import {Session} from 'bc-react-session';

Session.login({ 
	user: {
	    //any info you want to save on the user session
	},
	access_token: '<any token that represents the session in the backend API>', 
	expiration: 86400000; // in milliseconds, optional, defaults to 1 day
});
```

2) Close the session by doing `Session.logout();`:
```js
import {Session} from 'bc-react-session';

Session.logout();
```

3) Retrieve the session from anywhere
```js
import {Session} from 'bc-react-session';
const session = Session.getSession();
console.log(session.user, session.access_token);
```

## That is it!!

### Some other functionalities:

1. Listen to session changes
```js
// listen to session changes
const unsubscribe = Session.onChange((session) => {
  console.log(session);
  
  if(session.expired) console.log('The session has expired')
  if(session.autenticated) console.log('No one has logged in')
  
});
 
 //unsubscribe to session changes if needed
unsubscribe();
```

2. Enforce the session for automatic logout (even without refresh)
```js
// you need to enforce before calling the login method.
Session.enforce();

//you can also specify if you want to check for session expiration every X amount of miliseconds
Session.enforce(600000); //check every 10 minutes

```

3. Change reset the session user whenever you want
```js
import {Session} from 'bc-react-session';

// pass a new user object that will be merged with the previous one
Session.setUser({
    username: 'alejo'
});
```

4. Check session expiration
```
const session = Session.getSession();
console.log(session.expired); // boolean
```

5. Make a Private Route using react router

The library brings a component called `<PrivateRoute />` to make your routes private without any extra code.

```jsx
<BrowserRouter>
    <div>
        <PrivateRoute exact path='/profile' component={PrivateLayout} />
    </div>
</BrowserRouter>
```