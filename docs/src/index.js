import React from 'react';
import ReactROM from 'react-dom';
import {Session} from 'bc-react-session';
import SyntaxHighlighter from 'react-syntax-highlighter';
import 'highlight.js/styles/monokai-sublime.css';
import './styles.css';
import  Loadable  from 'react-loadable';

import Typography from 'typography';
import altonTheme from 'typography-theme-alton';
altonTheme.baseFontSize = "16px";
const typography = new Typography(altonTheme);
typography.injectStyles();

class App extends React.Component{
    constructor(){
        super();
        const session = Session.getSession();
        const defaultMiliseconds = 5000;
        this.state = {
            expiration: defaultMiliseconds,
            sessionName: "sample-session",
            enforce: (session.payload.destroy === true),
            readme: null,
            username: 'alesanchezr',
            expirationSeconds: defaultMiliseconds / 1000,
            expirationMinutes: defaultMiliseconds / 1000 / 60,
            milliseconds: 0,
            session 
        };
    }
    
    componentDidMount(){
        this.setState({
            readme: Loadable({
              loader: () => import('./README.md'),
              loading: () => 'Loading readme'
            })
        });
        Session.onChange((session) => {
          //here is the updated user
          this.setState({ session });
        });
        setInterval(() => this.setState({ 
            milliseconds: this.state.milliseconds + 1
        }),1);
        
        if(this.state.session.active)  Session.onExpiration((_session) => {
            this.setState({ session: _session });
            if(_session.payload.destroy || null) Session.destroy();
        });

        const _s = Session.get(this.state.sessionName);
        if(_s) this.setState({ session: _s });
    }
    
    render(){
        const Readme = this.state.readme;
        const timeLeft = this.state.session.expiration - (new Date().getTime() - this.state.session.createdAt);
        return (<div>
            <div className="alert">
                {(!this.state.session.active) ?
                    <p>Click on "Start Session", refresh the website and the session will remain for {this.state.expirationSeconds} seconds</p>
                    :
                    <div>
                        <small>{this.state.milliseconds} milisec have passed since reload. </small>
                        {(this.state.session.expired) ?
                            <p>The session has expired {timeLeft*-1} milisec ago</p>
                            :
                            <p>In {timeLeft} milisec the session will expire.</p>
                        }
                    </div>
                }
            </div>
            <div className="demo">
                <div className="container">
                    <div className="left">
                        <h2>
                            Live session object:
                            {(this.state.session.expired) ? 
                                <small>Expired</small>:''
                            }
                        </h2>
                        <SessionBox session={this.state.session} />
                    </div>
                    <div className="right">
                        <p>
                            Expiration:
                            <input type="text" value={this.state.expiration} onChange={(e) => this.setState({
                                expiration: e.target.value,
                                expirationSeconds: parseInt(e.target.value,10) / 1000,
                                expirationMinutes: parseInt(e.target.value,10) / 1000 / 60
                            })} />milisec
                            <span> ({this.state.expirationSeconds}s)</span>
                            { (this.state.expirationMinutes >= 1) ? (<span> sec{Math.round(this.state.expirationMinutes,2)}min</span>) : '' }
                        </p>
                        <p>
                            Username: <input type="text" value={this.state.username} onChange={(e) => this.setState({
                                username: e.target.value,
                            })} />
                        </p>
                        <p>
                            Session Name: <input type="text" value={this.state.sessionName} onChange={(e) => this.setState({
                                sessionName: e.target.value,
                            })} />
                            <br />
                            <small>Use different names to avoid coflicts if several websites use this library on the same browser</small>
                        </p>
                        <p>
                            Destroy on expiration: 
                            <input type="checkbox" checked={this.state.enforce} onChange={(e) => this.setState({
                                enforce: e.target.checked,
                            })} />
                            <br />
                            <small>Will destroy the session if it expires</small>
                        </p>
                    </div>
                    <div className="button-bar">
                        <button className="green" onClick={() => {
                            console.log("start session...", this.state.expiration);
                            Session.start(this.state.sessionName, {
                                payload: {
                                    user: this.state.username,
                                    destroy: this.state.enforce
                                },
                                expiration: this.state.expiration
                            });
                            Session.onExpiration((session) => {
                                this.setState({ session: Session.get() });
                                if(this.state.enforce){
                                    Session.destroy();
                                }
                            });
                            this.setState({ milliseconds: 0 });
                        }
                            
                        }>Start or retrive Session</button>
                        <button className="blue" onClick={() => Session.destroy()}>Destroy Session</button>
                    </div>
                </div>
            </div>
            <div className="container wide">
                {(this.state.readme) ? <Readme /> : ''}
            </div>
        </div>);
    }
}
const SessionBox = ({session}) => (<div className={"session-box "+(session.expired ? 'expired':'')}>
    {(session) ?
        <SyntaxHighlighter language='json'>{JSON.stringify(session, null, "\t")}</SyntaxHighlighter>
        :
        <p>No session</p>
    }
</div>)

ReactROM.render(<App />, document.querySelector('root'));