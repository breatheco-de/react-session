```
Note: This package is experimental, I'm working on making it a lot lighter by removing some dependencies out of the bundle.
```

# React Session Management

Create and maintain a sessions in react, compatible with React Router (login/logout) and sync with the localstorage

## Installation

```
$ npm i --save bc-react-session
```

## Usage

#### Open a session by doing:
```js
import {Session} from 'bc-react-session';

const access_token = '<any token that represents the session in your api>';

const user = {
    //any info you want to save on the user session
}

const expiration = 86400000; //in milliseconds, optional, defaults to 1 day

Session.actions.login({ user, access_token, expiration });
```

#### Retrieve the session on any other moment
```js
import {Session} from 'bc-react-session';
const session = Session.getSession();
//retrieve the user or the token
console.log(session.user, session.access_token);
```

#### Change the session and/or listen to changes
```js
import {Session} from 'bc-react-session';

// pass a new user object that will be merged with the previous one
Session.setUser({
    username: 'alejo'
});

// listen to session changes
const unsubscribe = Session.onChange((session) => {
  //here is the updated user
  console.log(session.user);
  
  if(session.expired) console.log('The session has expired')
  if(session.autenticated) console.log('No one is autenticated')
  
  //unsibscribe to session changes if needed
  unsubscribe();
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