import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Nav, Navbar, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import './Home.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleHome = this.handleHome.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            fullname: null,
            redirect: {
                home: false,
                logout: false
            }
        }
    }

    handleHome() {
        if (this.props.location.pathname !== '/home') {
            this.setState({redirect: {home: true}});
        }
    }

    handleLogout() {
        this.setState({redirect: {logout: true}});
    }

    render() {
        if (this.state.redirect.home) {
            return <Redirect to='/home'/>;
        }
        if (this.state.redirect.logout) {
            return <Redirect to='/'/>;
        }

        return (
            <div id='wrapper'>
                <Navbar collapseOnSelect staticTop fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a onClick={this.handleHome}>Home Control v1.0</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav className='pull-right'>
                        <NavDropdown eventKey={1} title={['User Name ', <Glyphicon glyph='user' key='userGlphy'/>]} id='user-drop'>
                            <MenuItem eventKey={1.1} onClick={this.handleLogout}>Logout</MenuItem>
                            <MenuItem eventKey={1.2}>Settings</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}