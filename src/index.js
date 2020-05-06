import React from 'react';
import EventEmitter from 'events';
import { Route, Redirect } from 'react-router-dom';
import { Dispatcher } from 'flux';

const dispatcher = new Dispatcher();

const DEBUG = false;
const NOW = () => new Date().getTime();

export const defaultSession = (data) => ({
    active: false, 
    name: null,
    payload: {},
    timeLeft: null,
    getTimeLeft: () => 0,
    expiration: 86400000, //1 day
    createdAt: null,
    expired: false,
    ...data
});
const log = (w,s) => DEBUG ? console.log(w+"-> CT: "+NOW()+" TP:"+(NOW() - s.createdAt)+" Exp: "+s.expiration+" TL:"+s.timeLeft) : null;
class _SessionStore extends EventEmitter{

    constructor(){
        super();
        this.sessionName = null;
        dispatcher.register(this.setPersistedState.bind(this));
    }
    setPersistedState(data){
        if(typeof(data.name) === "string") this.sessionName = data.name;
        const session = this.getSession();
        
        const newState = Object.assign(session || {}, data);
        localStorage.setItem(this.sessionName, JSON.stringify(newState));
        
        this.emit('session-change', newState);
        return newState;
    }
    
    getPersistedState(){
        
        if(!this.sessionName) console.error("React Session: Error! You need to specity a session name");

        let session = JSON.parse(localStorage.getItem(this.sessionName));
        if(!session) return defaultSession({ name: this.sessionName});

        
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
    getSession(session_name=null){
        if(session_name) this.sessionName = session_name;
        return this.getPersistedState();
    }
    
}
let SessionStore = new _SessionStore();

let SessionActions = {
    start: (name, sessionObject={}) => {
        dispatcher.dispatch({ 
            ...defaultSession, 
            ...sessionObject, 
            name, 
            active: true, 
            createdAt: NOW(), 
        });
    },
    onExpiration: function(callback){
        const session = SessionStore.getSession();
        
        if(!session.active) throw new Error('You have to start a the session before listening to its expiration');
        
        if(session.expired) callback(session);
        else setTimeout(() => callback(SessionStore.getSession()), session.timeLeft);
        
        log("Setting timout to monitor session in "+session.timeLeft+" milliseconds", session);
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
    destroy: (_name=null) => {
        const session = SessionStore.getSession(_name);
        log(`Session ${session.name} destroyed...`, session);
        dispatcher.dispatch(defaultSession({ name: session.name }));
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
    SessionStore.on('session-change', func);
    return () => SessionStore.removeListener('session-change', func);
};
export let Session = { 
    store: SessionStore, 
    get: (...params) => SessionStore.getSession(...params), 
    onChange,
    actions: SessionActions,
    onExpiration: SessionActions.onExpiration,
    setPayload: SessionActions.setPayload,
    getPayload: SessionActions.getPayload,
    start: SessionActions.start,
    destroy: SessionActions.destroy,
    //deprecated
    getSession: (...params) => SessionStore.getSession(...params), 
    login: SessionActions.start,
    logout: SessionActions.destroy,
    setUser: SessionActions.setUser
};
export let PrivateRoute = _PrivateRoute;