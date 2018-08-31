import React from 'react';
import ReactROM from 'react-dom';
import {Session} from 'bc-react-session';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Readme from './README.md';
import 'highlight.js/styles/monokai-sublime.css';
import './styles.css';

import Typography from 'typography';
import altonTheme from 'typography-theme-alton';
altonTheme.baseFontSize = "16px";
const typography = new Typography(altonTheme);
typography.injectStyles();

class App extends React.Component{
    constructor(){
        super();
        const defaultMiliseconds = 60000;
        this.state = {
            expiration: defaultMiliseconds,
            enforce: true,
            withInterval: true,
            interval: 1000,
            username: 'alesanchezr',
            expirationSeconds: defaultMiliseconds / 1000,
            expirationMinutes: defaultMiliseconds / 1000 / 60,
            milliseconds: 0,
            session: Session.getSession()
        };
    }
    
    componentDidMount(){
        Session.onChange((session) => {
          //here is the updated user
          this.setState({ session });
        });
        setInterval(() => this.setState({ 
            milliseconds: this.state.milliseconds + 1
        }),1);
    }
    
    render(){
        const timeLeft = this.state.session.expiration - (new Date().getTime() - this.state.session.createdAt);
        return (<div>
            <div className="alert">
                {(!this.state.session.autenticated) ?
                    <p>Click on "login", refresh the website and the session will remain for {this.state.expirationSeconds} seconds</p>
                    :
                    <div>
                        <small>{this.state.milliseconds} milisec have passed. </small>
                        {(this.state.session.expired) ?
                            <p>The session has expired</p>
                            :
                            <p>In {timeLeft} milisec the session will expire.</p>
                        }
                    </div>
                }
            </div>
            <div className="demo">
                <div className="container">
                    <div className="left">
                        <h2>Live session object:</h2>
                        <SessionBox session={this.state.session} />
                    </div>
                    <div className="right">
                        <p>
                            Expiration:
                            <input type="text" value={this.state.expiration} onChange={(e) => this.setState({
                                expiration: e.target.value,
                                expirationSeconds: parseInt(e.target.value,10) / 1000,
                                expirationMinutes: parseInt(e.target.value,10) / 1000 / 60
                            })} />
                            &nbsp;milisec={this.state.expirationSeconds}sec={Math.round(this.state.expirationMinutes,2)}min
                        </p>
                        <p>
                            Username: <input type="text" value={this.state.username} onChange={(e) => this.setState({
                                username: e.target.value,
                            })} />
                        </p>
                        <p>
                            <input type="checkbox" checked={this.state.enforce} onChange={(e) => this.setState({
                                enforce: e.target.checked,
                            })} />
                            Enforce on refresh: 
                            {(this.state.enforce) ?
                                <span>
                                    <br />
                                    <input type="checkbox" checked={this.state.withInterval} onChange={(e) => this.setState({
                                        withInterval: e.target.checked,
                                        interval: e.target.checked ? 1000 : 0
                                    })} />
                                    and also every
                                    <input type="text" value={this.state.interval} onChange={(e) => this.setState({
                                        interval: e.target.value,
                                    })} /> milisec <br />
                                </span>:''
                            }
                            <small>Will automatically close the session (even without website refresh)</small>
                        </p>
                    </div>
                    <div className="button-bar">
                        <button className="green" onClick={() => {
                            console.log("Login...");
                            if(this.state.enforce) Session.enforce((this.state.withInterval) ? this.state.interval : 0);
                            Session.login({
                                user: this.state.username,
                                access_token: '12edWE3Eddew35gyyUjhre5DEWd1Sfd6t@!dfRTgertg',
                                expiration: this.state.expiration
                            });
                            this.setState({ milliseconds: 0 });
                        }
                            
                        }>Login</button>
                        <button className="blue" onClick={() => Session.logout()}>Logout</button>
                    </div>
                </div>
            </div>
            <div className="container wide">
                <Readme />
            </div>
        </div>);
    }
}
const SessionBox = ({session}) => (<div className="session-box">
    {(session) ?
        <SyntaxHighlighter language='json'>{JSON.stringify(session, null, "\t")}</SyntaxHighlighter>
        :
        <p>No session</p>
    }
</div>)

ReactROM.render(<App />, document.querySelector('root'));