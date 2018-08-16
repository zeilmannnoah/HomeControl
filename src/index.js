import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './views/LoginPage/LoginPage.js';

class HomeControl extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' render={(props) => {
                        return <LoginPage/>;
                    }} />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<HomeControl/>, document.getElementById('root'));