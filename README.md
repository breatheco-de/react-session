# React Session Management

Create and maintain persisten login sessions on the browser (even if the website is refreshed).
> Note: Extremely easy integration with [React Router](https://github.com/ReactTraining/react-router).

## Installation

```
$ npm i --save bc-react-session
```

## Usage

#### Open a session by doing `Session.login({ user, access_token });`:
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
Note: If the session has expired, the session user will be set to null

#### Retrieve the session from anywhere
```js
import {Session} from 'bc-react-session';
const session = Session.getSession();
//retrieve the user, access_token or anything else
console.log(session.user, session.access_token);
```

#### Listen to session changes
```js
// listen to session changes
const unsubscribe = Session.onChange((session) => {
  console.log(session);
  
  if(session.expired) console.log('The session has expired')
  if(session.autenticated) console.log('No one is autenticated')
  
  //unsubscribe to session changes if needed
  unsubscribe();
});
```

#### Change reset the session user whenever you want
```js
import {Session} from 'bc-react-session';

// pass a new user object that will be merged with the previous one
Session.setUser({
    username: 'alejo'
});
```

#### Close the session by doing:
```js
import {Session} from 'bc-react-session';

Session.logout();
```

#### Check session expiration
```
console.log(Session.getSession());
/*
 Will output something like this
 
{
	"autenticated": true,
	"access_token": "123123",
	"expiration": 10000,
	"user": "mario",
	"createdAt": 1535650896823, // read-only
	"timeLeft": 232323, // read-only, how much miliseconds are left in the session
	"expired": false // react-only
}
*/
```

#### Make a Private Route using react router

The library brings a component called PrivateRoute to make your routs private automatically.

```html
<BrowserRouter>
    <div>
        <Switch>
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/profile' component={PrivateLayout} />
        </Switch>
    </div>
</BrowserRouter>
```
