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

const token = '<any token that represents the session>';
const user = {
    username: 'alesanchezr',
    id: 2234234,
    //any other info you want to save on the session
}

Session.actions.login({ user: user, access_token: token });
```

#### Retrieve the session on any other moment
```js
import {Session} from 'bc-react-session';
const session = Session.store.getSession();
//retrieve the user
console.log(session.user);
//retrieve the token
console.log(session.access_token);
```

#### Change the session and listen to changes
```js
import {Session} from 'bc-react-session';

// pass a new user object that will be merged with the previous one
Session.actions.setUser({
    id: 2
});

const unsubscribe = Session.onChange((session) => {
  unsubscribe();
  //here is the updated user
  console.log(session.user);
});
```

#### Close the session by doing:
```js
import {Session} from 'bc-react-session';

Session.actions.logout();
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