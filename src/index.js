import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Flux from '@4geeksacademy/react-flux-dash';
const DEBUG = window.debug || false;
const NOW = () => new Date().getTime();
const SESSION_EVENT = "bc-react-session";
const defaultSession = () => ({
    autenticated: false, 
    access_token: null, 
    user: null,
    timeLeft: null,
    getTimeLeft: () => 0,
    expiration: 86400000, //1 day
    createdAt: null,
    expired: false
});
const log = (w,s) => DEBUG ? console.log(w+"-> CT: "+NOW()+" TP:"+(NOW() - s.createdAt)+" Exp: "+s.expiration+" TL:"+s.timeLeft) : null;
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
        let session = JSON.parse(localStorage.getItem(SESSION_EVENT));
        if(!session) return defaultSession();

        session.getTimeLeft = () => 0;
        if(session.autenticated){
            if(DEBUG && (isNaN(session.createdAt) || session.createdAt == 0 || !session.createdAt)) 
                console.error("Invalid createdAt: ", session.createdAt);
            session.getTimeLeft = () => session.expiration - (NOW() - session.createdAt);
            session.timeLeft = session.getTimeLeft();
            session.expired = (session.timeLeft < 0);
        }
        log('getPressistedState',session);
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

let sessionInterval = null;
let SessionActions = {
    login: (sessionObject) => {
        if(typeof sessionObject.access_token == 'undefined') throw new Error("The Session Object must contain an access_token property");
        sessionObject.autenticated = true;
        sessionObject.createdAt = NOW();
        Flux.dispatchEvent(SESSION_EVENT, Object.assign(defaultSession, sessionObject));
    },
    enforce: function(interval=0){
        const _session = SessionStore.getSession();
        log('checkForTimout',_session);
        if(_session.expired) this.logout();
        if(interval && interval>0){
            if(DEBUG) console.log("every "+interval+" seconds");
            SessionStore.subscribe(SESSION_EVENT, (session) => {
                if(sessionInterval) clearInterval(sessionInterval);
                if(session.autenticated){
                    sessionInterval = setInterval(() => {
                        const session = SessionStore.getSession();
                        log('checkForTimout',session);
                        if(session.expired){
                            if(DEBUG) console.log("Closing session because it expired");
                            this.logout();
                            clearInterval(sessionInterval);
                        } 
                    }, interval);
                    if(DEBUG) console.log("Setting timout ("+sessionInterval+") to close session in "+session.timeLeft+" milliseconds");
                }
            });
        }                
    },
    setUser: (newUser={}) => {
        const session = SessionStore.getSession();
        const user = Object.assign(session.user, newUser);
        Flux.dispatchEvent(SESSION_EVENT, {user});
    },
    logout: () => {
        if(DEBUG) console.log("Logging out...");
        Flux.dispatchEvent(SESSION_EVENT, defaultSession());
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
          render={(props) => (session.autenticated === true && !session.expired)
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
    enforce: SessionActions.enforce,
    setUser: SessionActions.setUser
};
export let PrivateRoute = _PrivateRoute;