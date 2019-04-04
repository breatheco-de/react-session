<p align="center">
  <img src="https://assets.breatheco.de/apis/img/images.php?blob&random&cat=icon&tags=breathecode,128">
</p>

<p>
    <h2 align="center"> React Session Management </h2>
</p>

[![Maintenance](https://img.shields.io/badge/Maintained-yes-green.svg)](https://GitHub.com/breatheco-de/react-session.js/graphs/commit-activity)
[![Tests](https://api.travis-ci.org/breatheco-de/react-session.svg?branch=master)](https://travis-ci.org/breatheco-de/react-session)
[![npm](https://img.shields.io/npm/v/bc-react-session.svg)](https://www.npmjs.com/package/bc-react-session)
[![npm](https://img.shields.io/npm/dm/bc-react-session.svg)](https://www.npmjs.com/package/bc-react-session)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/breatheco-de/react-session/blob/master/LICENSE)


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

Session.start({ 
	payload: {
	    // (optional) any info you want to save on the persisten session
	},
	expiration: 86400000; // (optional) defaults to 1 day
});
```

2) Close the session by doing `Session.destroy();`:
```js
import {Session} from 'bc-react-session';

Session.destroy();
```

3) Retrieve the session and payload from anywhere
```js
import {Session} from 'bc-react-session';

const session = Session.get();
const { payload } = Session.get();

console.log(session.isValid); // will be true if is not expired or innactive
console.log(payload); // anything you have set on the session payload is stored here

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

2. Wait for session expiration callback
```js
// you need to enforce before calling the login method.
Session.onExpiration((session) => session.destroy()); //you can destroy the session if it expires
```

3. Change reset the session payload whenever you want
```js
import {Session} from 'bc-react-session';

// pass a new username that will override previous one (if any)
Session.setPayload({
    username: 'alesanchezr'
});
```

4. Check session expiration
```
const session = Session.get();
console.log(session.expired); // boolean
```

5. Make a Private Route using react router

The library brings a component called `<PrivateRoute />` to make your routes private without any extra code.

```jsx
import {PrivateRoute} from 'bc-react-session';

<BrowserRouter>
    <div>
        <PrivateRoute exact path='/profile' component={PrivateLayout} />
    </div>
</BrowserRouter>
```
