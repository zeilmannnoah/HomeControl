import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Nav, Navbar, NavDropdown, NavItem, MenuItem, Glyphicon, InputGroup, FormControl, PageHeader, Panel} from 'react-bootstrap';
import UserService from '../../services/UserService.js';
import WeatherService from '../../services/WeatherService.js';
import './Home.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleHome = this.handleHome.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        this.UserService = new UserService();
        this.WeatherService = new WeatherService();

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

        this.WeatherService.fetchWeather();

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
                    <Col md={3} className='fluid'>
                        <Col md={11} id='sidebar' className='fluid'>
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
                                <NavItem className='sidebar-option' eventKey={5}>
                                    Blackboard
                                </NavItem>
                                <NavItem className='sidebar-option' eventKey={6}>
                                    My Missouri State
                                </NavItem>
                            </Nav>
                        </Col>
                    </Col>
                    <Col md={9}  id='main-col'>
                        <Row>
                            <Col className='fluid' md={12}>
                                <PageHeader id='dashboard'>Dashboard</PageHeader>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <Panel bsStyle="primary">
                                    <Panel.Heading>
                                        <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body><a href='google.com'>Panel content</a></Panel.Body>
                                </Panel>
                            </Col>
                            <Col md={3}>
                                <Panel bsStyle="success">
                                    <Panel.Heading>
                                        <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>Panel content</Panel.Body>
                                </Panel>
                            </Col>
                            <Col md={3}>
                                <Panel bsStyle="info">
                                    <Panel.Heading>
                                        <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body>Panel content</Panel.Body>
                                </Panel>
                            </Col>
                            <Col md={3}>
                                <Panel bsStyle="warning">
                                    <Panel.Heading>
                                        <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                                    </Panel.Heading>
                                <Panel.Body>Panel content</Panel.Body>
                                </Panel>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}