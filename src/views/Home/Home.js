import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Nav, Navbar, NavDropdown, NavItem, MenuItem, Glyphicon, InputGroup, FormControl } from 'react-bootstrap';
import UserService from '../../services/UserService.js';
import './Home.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleHome = this.handleHome.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.UserService = new UserService();

        this.state = {
            fullname: sessionStorage.getItem("fullname"),
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
                        <NavDropdown eventKey={1} title={[this.state.fullname+" ", <Glyphicon glyph='user' key='userGlphy'/>]} id='user-drop'>
                            <MenuItem eventKey={1.1} onClick={this.handleLogout}>Logout</MenuItem>
                            <MenuItem eventKey={1.2}>Settings</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <Col md={2} id='sidebar'>
                    <InputGroup id="search">
                        <FormControl type='text'/>
                        <InputGroup.Addon><Glyphicon glyph='search' /></InputGroup.Addon>
                    </InputGroup>
                    <Nav stacked>
                        <NavItem className='sidebar-option' eventKey={1} href="/home">
                            NavItem 1 content
                        </NavItem>
                        <NavItem className='sidebar-option' eventKey={2} title="Item">
                            NavItem 2 content
                        </NavItem>
                        <NavItem className='sidebar-option' eventKey={3} disabled>
                            NavItem 3 content
                        </NavItem>
                    </Nav>
                </Col>
            </div>
        );
    }
}