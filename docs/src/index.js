import React from 'react';
import ReactROM from 'react-dom';
import {Session} from 'bc-react-session';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';
import './styles.css';
class App extends React.Component{
    constructor(){
        super();
        this.state = {
            expiration: 10000,
            username: 'alesanchezr',
            expirationSeconds: 10,
            milliseconds: 0,
            session: Session.getSession()
        };
    }
    
    componentDidMount(){
        Session.onChange((session) => {
          //here is the updated user
          this.setState({ session });
          console.log(session);
        });
        Session.actions.checkForTimout();
        setInterval(() => this.setState({milliseconds: this.state.milliseconds+1}),1);
    }
    
    render(){
        
        return (<div>
            <div className="alert">
                {(!this.state.session.autenticated) ?
                    <p>Click on "login", refresh the website and the session will remain for {this.state.expirationSeconds} seconds</p>
                    :
                    <div>
                        <small>{this.state.milliseconds} seconds have passed. </small>
                        <p>In {parseInt(this.state.session.timeLeft || 0,10)} milliseconds the session will expire.</p>
                    </div>
                }
            </div>
            <div className="container">
                <h2>This is the current session object:</h2>
                <SessionBox session={this.state.session} />
                <form>
                    <p>
                        Expiration:
                        <input type="text" value={this.state.expiration} onChange={(e) => this.setState({
                            expiration: e.target.value,
                            expirationSeconds: parseInt(e.target.value,10) / 1000
                        })} />
                        &nbsp;milliseconds = {this.state.expirationSeconds} sec
                    </p>
                    <p>
                        Username: <input type="text" value={this.state.username} onChange={(e) => this.setState({
                            username: e.target.value,
                        })} />
                    </p>
                </form>
                <div className="button-bar">
                    <button className="green" onClick={() => Session.login({
                        user: this.state.username,
                        access_token: '123123',
                        expiration: this.state.expiration
                    })}>Login</button>
                    <button className="blue" onClick={() => Session.logout()}>Logout</button>
                </div>
            </div>
        </div>);
    }
}
const SessionBox = ({session}) => (<div className="session-box">
    {(session) ?
        <SyntaxHighlighter language='json' style={docco}>{JSON.stringify(session, null, "\t")}</SyntaxHighlighter>
        :
        <p>No session</p>
    }
</div>)

ReactROM.render(<App />, document.querySelector('root'));