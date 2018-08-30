import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Flux from '@4geeksacademy/react-flux-dash';
const NOW = new Date().getTime();

const SESSION_EVENT = "user_session";
const defaultSession = {
    autenticated: false, 
    access_token: null, 
    user: null
}
class _SessionStore extends Flux.DashStore{
    constructor(){
        super();
        // Or Declare an event with some transformation logic
        this.addEvent(SESSION_EVENT, this._sessionTransformer.bind(this));
    }
    setPersistedState(data, expiration=86400000){
        data.expiration = data.expiration || expiration;
        const session = this.getSession();
        const newState = Object.assign(session || {}, data);
        localStorage.setItem(SESSION_EVENT, JSON.stringify(newState));
        return newState;
    }
    getPersistedState(){
        let session = JSON.parse(localStorage.getItem(SESSION_EVENT));
        let timeLeft = session.expiration - (NOW - session.createdAt);
        
        //if the session has expired
        if(timeLeft <= 0){
            localStorage.setItem(SESSION_EVENT, JSON.stringify(defaultSession));
        }
            
        session.timeLeft = timeLeft;
        session.expired = (timeLeft <= 0);
        return session;
    }
    _sessionTransformer(data){
        let session = this.getPersistedState();
        
        if(!session) return this.setPersistedState(data);
        else return this.setPersistedState(Object.assign(session, data));
    }
    getSession(){
        return this.getPersistedState();
    }
    
}
let SessionStore = new _SessionStore();
let SessionActions = {
    login: (sessionObject) =>{
        if(typeof sessionObject.access_token == 'undefined') throw new Error("The Session Object must contain an access_token property");
        sessionObject.autenticated = true;
        sessionObject.createdAt = NOW;
        Flux.dispatchEvent(SESSION_EVENT, sessionObject);
    },
    setUser: (newUser={}) => {
        const session = SessionStore.getSession();
        const user = Object.assign(session.user, newUser);
        Flux.dispatchEvent(SESSION_EVENT, {user});
    },
    logout: () => {
        Flux.dispatchEvent(SESSION_EVENT, defaultSession);
    }
};

const _PrivateRoute = function(props){
    const Component = props.component;
    var rest = Object.assign({}, props);
    delete rest.component;
    let session = SessionStore.getSession();
    return(
        <Route
          {...rest}
          render={(props) => session.autenticated === true
            ? <Component {...rest} {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    );
};
// _PrivateRoute.propTypes = {
//     component: PropTypes.oneOfType([
//       PropTypes.func,
//       PropTypes.object
//     ]),
//     location: PropTypes.object
// };

const onChange = (func) => {
    return SessionStore.subscribe(SESSION_EVENT, func);
};
export let Session = { 
    store: SessionStore, 
    getSession: () => SessionStore.getSession(), 
    onChange,
    actions: SessionActions,
    login: SessionActions.login,
    logout: SessionActions.logout,
    setUser: SessionActions.setUser
};
export let PrivateRoute = _PrivateRoute;