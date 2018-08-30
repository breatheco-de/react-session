import React from 'react';
import ReactROM from 'react-dom';
import {Session} from 'bc-react-session';
class App extends React.Component{
    constructor(){
        super();
        this.state = {
            session: Session.store.getSession()
        };
    }
    
    componentDidMount(){
        Session.onChange((session) => {
          //here is the updated user
          this.setState({session});
          console.log(session.user);
        });
    }
    
    render(){
        return (<div>
                {(this.state.session) ?
                    <pre>
                        {JSON.stringify(this.state.session, null, "\t")}
                    </pre>
                    :
                    <p>No session</p>
                }
            <button onClick={() => Session.login({
                user: 'mario',
                access_token: '123123',
                expiration: 10000
            })}>Login</button>
            <button onClick={() => Session.logout()}>Logout</button>
        </div>);
    }
}

ReactROM.render(<App />, document.querySelector('root'));