import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Button, Glyphicon } from 'react-bootstrap';
import UserService from '../../../services/UserService.js';
import ajaxLoading from '../../../imgs/squaresLoading.svg';
import './loginPanel.css';

export default class LoginPanel extends React.Component {
    constructor(props) {
        super(props);

        this.handleFullnameChange = this.handleFullnameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.checkUserAndPass = this.checkUserAndPass.bind(this);
        this.checkSignup = this.checkSignup.bind(this);
        this.onFailuire = this.onFailuire.bind(this);
        this.UserService = new UserService();

        this.state = {
            username: '',
            fullname: '',
            password: '',
            check: '',
            disabled: true,
            redirect: {
                authenticated: false
            }
        };
    }

    // Login

    handleUsernameChange(e) {
        this.setState({ 
            username: e.target.value
        }, () => {
            if (this.state.signup) {
                this.checkSignup();
            }
            else {
                this.checkUserAndPass();
            }
        });
        
    }

    handlePasswordChange(e) {
        this.setState({ 
            password: e.target.value
        }, () => {
            if (this.state.signup) {
                this.checkSignup();
            }
            else {
                this.checkUserAndPass();
            }
        });
    }

    usernameValidationState() {
        const length = this.state.username.length;
        
        if (length === 0){
            return null;
        }
        else if (length > 7){
            return 'success';
        }
        else {
            return 'error';
        }
    }

    passwordValidationState() {
        const length = this.state.password.length;
        
        if (length === 0){
            return null;
        }
        else if (length > 7){
            return 'success';
        }
        else {
            return 'error';
        }
    }

    checkUserAndPass() {
        if (this.usernameValidationState() === 'success' && this.passwordValidationState() === 'success') {
            this.setState({
                disabled: false
            });
        }
        else {
            this.setState({
                disabled: true
            });
        }
    }

    // Sign Up

    handleFullnameChange(e) {
        this.setState({ 
            fullname: e.target.value
        }, () => {
            this.checkSignup();
        });
    }

    handleCheckChange(e) {
        this.setState({ 
           check: e.target.value
        }, () => {
            this.checkSignup();
        });
    }
 
    nameValidationState() {
        const length = this.state.fullname.length;

        if (length === 0){
            return null;
        }
        else if (length > 3){
            return 'success';
        }
        else {
            return 'error';
        }
    }

    checkValidationState() {
        const length = this.state.check.length;

        if (length === 0){
            return null;
        }
        else if (length > 7  && this.state.password === this.state.check){
            return 'success';
        }
        else {
            return 'error';
        }
    }

    checkSignup() {
        if (this.state.username.length > 7 && this.state.fullname.length > 7 
            && this.state.password.length > 7 && this.state.check.length > 7  && this.state.password === this.state.check) {
            this.setState({
                disabled: false
            });
        }
        else {
            this.setState({
                disabled: true
            });
        }
    }

    handleSignup(e) {
        e.preventDefault();
        if (this.state.signup) {
            this.setState({ 
                signup: !this.state.signup,
                check: '',
                fullname: '',
                password: '',
                username: ''
            });
        }
        else {
            this.setState({ 
                signup: !this.state.signup,
                check: '',
                fullname: '',
                password: '',
                username: ''
            });
        }
    }

    // Common

    handleSubmit(e) {
        e.preventDefault();
        
        this.setState({
            fetching: true
        });

        if (this.state.signup) {
            this.UserService.signup(e.target[0].value, e.target[1].value, e.target[2].value)
            .then((res) => {
                this.setState({
                    redirect: { authenticated: true }
                });
            })
            .catch(err => {
                this.setState({
                    redirect: { authenticated: false },
                    fetching: false
                });
                this.onFailuire();
            });
        }
        else {
            this.UserService.login(e.target[0].value, e.target[1].value)
            .then((res) => {
                if (res) {
                    this.setState({
                        redirect: { authenticated: true }
                    });
                }
                else {
                    this.setState({
                        redirect: { authenticated: false },
                        fetching: false
                    });
                    this.onFailuire();
                }
            })
            .catch(err => {
                this.setState({
                    redirect: { authenticated: false },
                    fetching: false
                });
                this.onFailuire();
            });
        }
    }

    onFailuire (e) {
        this.props.onFailuire();
    };

    render() {
        if (this.state.redirect.authenticated) {
            return <Redirect to='/Home'/>;
        }

        if (this.state.fetching) {
            return (
                <Panel id='login-panel'>
                    <Panel.Body>
                        <Row>
                            <Col md={12}>
                                <h2 className='text-center'>Home Control <Glyphicon glyph='home'/></h2>
                                <img className='center-block' src={ajaxLoading} />
                            </Col>
                        </Row>
                    </Panel.Body>
                </Panel>
            )
        }

        if (this.state.signup) {
            return (
                <Panel id='login-panel'>
                    <Panel.Body>
                        <Row>
                            <Col md={12}>
                                <h2 className='text-center'>Signup <Glyphicon glyph='home'/></h2>
                                <form onSubmit={this.handleSubmit} onChange={this.test}>
                                    <FormGroup controlId='fullnameControl' validationState={this.nameValidationState()}>
                                        <ControlLabel>Full Name</ControlLabel>
                                        <FormControl
                                            type='text'
                                            placeholder='Enter full name'
                                            value={this.state.fullname}
                                            onChange={this.handleFullnameChange}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId='usernameControl' validationState={this.usernameValidationState()}>
                                        <ControlLabel>Username</ControlLabel>
                                        <FormControl
                                            type='text'
                                            placeholder='Enter username'
                                            value={this.state.username}
                                            onChange={this.handleUsernameChange}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId='passwordControl' validationState={this.passwordValidationState()}>
                                        <ControlLabel>Password</ControlLabel>
                                        <FormControl
                                            type='password'
                                            placeholder='Enter Password'
                                            value={this.state.password}
                                            onChange={this.handlePasswordChange}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId='checkControl' validationState={this.checkValidationState()}>
                                        <ControlLabel>Confirm Password</ControlLabel>
                                        <FormControl
                                            type='password'
                                            placeholder='Confirm Password'
                                            value={this.state.check}
                                            onChange={this.handleCheckChange}
                                        />
                                    </FormGroup>
                                    <Button 
                                        className='center-block' 
                                        bsStyle='primary'
                                        type='submit'
                                        bsSize='large'
                                        block
                                        disabled={this.state.disabled}
                                    >Sign up</Button>
                                    <Button 
                                        className='center-block margin-top-10' 
                                        bsStyle='link'
                                        onClick={this.handleSignup}
                                    >Return to login</Button>
                                </form>
                            </Col>
                        </Row>
                    </Panel.Body>
                </Panel>
            );
        }

        return (
            <Panel id='login-panel'>
                <Panel.Body>
                    <Row>
                        <Col md={12}>
                            <h2 className='text-center'>Home Control <Glyphicon glyph='home'/></h2>
                            <form onSubmit={this.handleSubmit} onChange={this.test}>
                                <FormGroup controlId='usernameControl' validationState={this.usernameValidationState()}>
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl
                                        type='text'
                                        placeholder='Enter username'
                                        value={this.state.username}
                                        onChange={this.handleUsernameChange}
                                    />
                                </FormGroup>
                                <FormGroup controlId='passwordControl' validationState={this.passwordValidationState()}>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl
                                        type='password'
                                        placeholder='Enter Password'
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                    />
                                </FormGroup>
                                <Button 
                                    className='center-block' 
                                    bsStyle='primary'
                                    type='submit'
                                    bsSize='large'
                                    block
                                    disabled={this.state.disabled}
                                >Sign In</Button>
                                <Button 
                                    className='center-block margin-top-10' 
                                    bsStyle='link'
                                    >Forgot Password</Button>
                                <Button 
                                    className='center-block' 
                                    bsStyle='link'
                                    onClick={this.handleSignup}
                                    >Sign Up</Button>
                            </form>
                        </Col>
                    </Row>
                </Panel.Body>
            </Panel>
        );
    }
}