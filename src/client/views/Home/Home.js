import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Nav, Navbar, NavDropdown, NavItem, MenuItem, Glyphicon, InputGroup, FormControl, PageHeader, Panel} from 'react-bootstrap';
import UserService from '../../services/UserService.js';
import WeatherPanel from './components/WeatherPanel.js';
import LightPanel from './components/LightPanel.js';
import Panel3 from './components/CalendarPanel.js';
import Panel4 from './components/Panel4.js';
import './Home.css';

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
            <Grid fluid>
                <Row>
                    <Navbar collapseOnSelect staticTop fluid>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a onClick={this.handleHome}>Home Control v0.1</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Nav className='pull-right'>
                            <NavDropdown eventKey={1} title={[this.state.fullname+" ", <Glyphicon glyph='user' key='userGlphy'/>]} id='user-drop'>
                                <MenuItem eventKey={1.1} onClick={this.handleLogout}>Logout</MenuItem>
                                <MenuItem eventKey={1.2}>Settings</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar>
                </Row>
                <Row>
                    <Col md={2} id='sidebar' className='fluid'>
                        <InputGroup id="search">
                            <FormControl type='text' placeholder="Search..."/>
                            <InputGroup.Addon><Glyphicon glyph='search' /></InputGroup.Addon>
                        </InputGroup>
                        <Nav stacked>
                            <NavItem className='sidebar-option' eventKey={2}>
                                My PC
                            </NavItem>
                            <NavItem className='sidebar-option' eventKey={3}>
                                Air Conditioning
                            </NavItem>
                            <NavItem className='sidebar-option' eventKey={4}>
                                Weather Forecast
                            </NavItem>
                            <NavItem className='sidebar-option' eventKey={3}>
                                Lights
                            </NavItem>
                            <NavItem className='sidebar-option' eventKey={3}>
                                Calander
                            </NavItem>
                            <NavItem className='sidebar-option' eventKey={5}>
                                Blackboard
                            </NavItem>
                            <NavItem className='sidebar-option' eventKey={6}>
                                My Missouri State
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col md={10}>
                        <Row>
                            <Col md={12}>
                                <PageHeader id='dashboard'>Dashboard</PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <WeatherPanel/>
                            </Col>
                            <Col md={3}>
                                <LightPanel/>
                            </Col>
                            <Col md={3}>
                                <Panel3 />
                            </Col>
                            <Col md={3}>
                                <Panel4 />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}