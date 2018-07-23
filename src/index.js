import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Flux from '@4geeksacademy/react-flux-dash';

const SESSION_EVENT = "user_session";
class _SessionStore extends Flux.DashStore{
    constructor(){
        super();
        // Or Declare an event with some transformation logic
        this.addEvent(SESSION_EVENT, this._sessionTransformer.bind(this));
    }
    setPersistedState(data){
        const session = this.getSession();
        const newState = Object.assign(session || {}, data);
        localStorage.setItem(SESSION_EVENT, JSON.stringify(newState));
        return newState;
    }
    getPersistedState(){
        let persistedState = JSON.parse(localStorage.getItem(SESSION_EVENT));
        return persistedState;
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
        Flux.dispatchEvent(SESSION_EVENT, sessionObject);
            
        window.location.href="/";
    },
    logout: () => {
        Flux.dispatchEvent(SESSION_EVENT, { 
            autenticated: false,
            access_token: null
        });
        window.location.href="/login";
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
_PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object
    ]),
    location: PropTypes.object
};

export let Session = { 
    store: SessionStore, 
    actions: SessionActions
};
export let PrivateRoute = _PrivateRoute;