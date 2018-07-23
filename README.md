# React Session Management

Create and maintain a sessions in react, compatible with React Router (login/logout) and sync with the localstorage

## Installation

```
$ npm i --save @breathecode/react-session
```

## Usage

#### Open a session by doing:
```js
import {Session} from '@breathecode/react-session';

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
import {Session} from '@breathecode/react-session';
const session = Session.store.getSession();
//retrieve the user
console.log(session.user);
//retrieve the token
console.log(session.access_token);
```

#### Close the session by doing:
```js
import {Session} from '@breathecode/react-session';

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