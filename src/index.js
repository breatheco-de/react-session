import React from 'react';
import EventEmitter from 'events';
import { Route, Redirect } from 'react-router-dom';
import { Dispatcher } from 'flux';

const dispatcher = new Dispatcher();

const DEBUG = window.debug || false;
const NOW = () => new Date().getTime();
const SESSION_EVENT = "bc-react-session";
export const defaultSession = () => ({
    active: false, 
    payload: {},
    timeLeft: null,
    getTimeLeft: () => 0,
    expiration: 86400000, //1 day
    createdAt: null,
    expired: false
});
const log = (w,s) => DEBUG ? console.log(w+"-> CT: "+NOW()+" TP:"+(NOW() - s.createdAt)+" Exp: "+s.expiration+" TL:"+s.timeLeft) : null;
class _SessionStore extends EventEmitter{

    constructor(){
        super();
        dispatcher.register(this.setPersistedState.bind(this));
    }
    setPersistedState(data){
        const session = this.getSession();
        const newState = Object.assign(session || {}, data);
        localStorage.setItem(SESSION_EVENT, JSON.stringify(newState));
        
        this.emit(SESSION_EVENT, newState);
        return newState;
    }
    
    getPersistedState(){
        let session = JSON.parse(localStorage.getItem(SESSION_EVENT));
        if(!session) return defaultSession();

        session.getTimeLeft = () => 0;
        if(session.active){
            if(DEBUG && (isNaN(session.createdAt) || session.createdAt == 0 || !session.createdAt)) 
                console.error("Invalid createdAt: ", session.createdAt);
            session.getTimeLeft = () => session.expiration - (NOW() - session.createdAt);
            session.timeLeft = session.getTimeLeft();
            session.expired = (session.timeLeft < 0);
        }
        
        session.isValid = (!session.expired && session.active);
        log('getPressistedState',session);
        return session;
    }
    getSession(){
        return this.getPersistedState();
    }
    
}
let SessionStore = new _SessionStore();

let sessionInterval = null;
let SessionActions = {
    start: (sessionObject) => {
        sessionObject.active = true;
        sessionObject.createdAt = NOW();
        dispatcher.dispatch(Object.assign(defaultSession, sessionObject));
    },
    onExpiration: function(callback){
        const session = SessionStore.getSession();
        
        if(!session.active) throw new Error('You have to start a the session before listening to its expiration');
        
        if(session.expired) callback(session);
        else setTimeout(() => callback(SessionStore.getSession()), session.timeLeft);
        
        log("Setting timout to monitor session in "+session.timeLeft+" milliseconds");
    },
    setPayload: (newPayload={}) => {
        const session = SessionStore.getSession();
        const payload = Object.assign(session.payload, newPayload);
        dispatcher.dispatch({ payload });
    },
    getPayload: () => {
        const session = SessionStore.getSession();
        return (session) ? session.payload : null;
    },
    setUser: (newUser={}) => {
        console.warn("React-Session: The setUser function is deprecated, use setPayload instead.");
        const session = SessionStore.getSession();
        const user = Object.assign(session.user, newUser);
        dispatcher.dispatch({user});
    },
    destroy: () => {
        if(DEBUG) console.log("Session destroyed...");
        dispatcher.dispatch(defaultSession());
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
          render={(props) => (session.active)
            ? <Component {...rest} {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    );
};

const onChange = (func) => {
    SessionStore.on(SESSION_EVENT, func);
    return () => SessionStore.removeListener(SESSION_EVENT, func);
};
export let Session = { 
    store: SessionStore, 
    get: () => SessionStore.getSession(), 
    onChange,
    actions: SessionActions,
    onExpiration: SessionActions.onExpiration,
    setPayload: SessionActions.setPayload,
    getPayload: SessionActions.getPayload,
    start: SessionActions.start,
    destroy: SessionActions.destroy,
    //deprecated
    getSession: () => SessionStore.getSession(), 
    login: SessionActions.start,
    logout: SessionActions.destroy,
    setUser: SessionActions.setUser
};
export let PrivateRoute = _PrivateRoute;