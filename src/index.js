import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './views/LoginPage/LoginPage.js';
import Home from './views/Home/Home.js';
import './index.css';

class HomeControl extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' render={(props) => {
                        return <LoginPage {...props} />;
                    }} />
                    <Route path='/home' render={(props) => {
                        return <Home {...props} />;
                    }} />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<HomeControl/>, document.getElementById('root'));