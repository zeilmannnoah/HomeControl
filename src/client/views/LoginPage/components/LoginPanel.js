import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Button, Glyphicon } from 'react-bootstrap';
import UserService from '../../../services/UserService.js';
import ajaxLoading from '../../../imgs/ajaxLoading.svg';
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
            form: {
                username: '',
                fullname: '',
                password: '',
                check: '',
            },
            disabled: true,
            fetching: false,
            signup: false,
            redirect: {
                authenticated: false
            }
        };
    }

    handleFullnameChange(e) {
        this.setState({ 
            form: { fullname: e.target.value,
                    username: this.state.form.username,
                    password: this.state.form.password,
                    check: this.state.form.check }
        }, this.checkSignup());
    }

    handleUsernameChange(e) {
        this.setState({ 
            form: { username: e.target.value,
                fullname: this.state.form.fullname,
                password: this.state.form.password,
                check: this.state.form.check  }
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
            form: { password: e.target.value,
                    fullname: this.state.form.fullname,
                    username: this.state.form.username,
                    check: this.state.form.check  }
        }, () => {
            if (this.state.signup) {
                this.checkSignup();
            }
            else {
                this.checkUserAndPass();
            }
        });
    }

    handleCheckChange(e) {
        this.setState({ 
            form: { 
                check: e.target.value,
                fullname: this.state.form.fullname,
                password: this.state.form.password,
                username: this.state.form.username  
            }
        }, this.checkSignup());
    }

    handleSignup(e) {
        e.preventDefault();
        if (this.state.signup) {
            this.setState({ 
                signup: !this.state.signup,
                form: { 
                    check: '',
                    fullname: '',
                    password: '',
                    username: ''  
                }
            });
        }
        else {
            this.setState({ 
                signup: !this.state.signup,
                form: { 
                    check: '',
                    fullname: '',
                    password: '',
                    username: ''  
                }
            });
        }
    }

    checkUserAndPass() {
        if (this.state.form.username.length != 0 && this.state.form.password.length != 0) {
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

    checkSignup() {
        if (this.state.form.username.length != 0 && this.state.form.password.length != 0 && this.state.form.check.length != 0) {
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
                                    <FormGroup controlId='fullnameControl'>
                                        <ControlLabel>Full Name</ControlLabel>
                                        <FormControl
                                            type='text'
                                            placeholder='Enter fullname'
                                            value={this.state.form.fullname}
                                            onChange={this.handleFullnameChange}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId='usernameControl'>
                                        <ControlLabel>Username</ControlLabel>
                                        <FormControl
                                            type='text'
                                            placeholder='Enter username'
                                            value={this.state.form.username}
                                            onChange={this.handleUsernameChange}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId='passwordControl'>
                                        <ControlLabel>Password</ControlLabel>
                                        <FormControl
                                            type='password'
                                            placeholder='Enter Password'
                                            value={this.state.form.password}
                                            onChange={this.handlePasswordChange}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId='checkControl'>
                                        <ControlLabel>Confirm Password</ControlLabel>
                                        <FormControl
                                            type='password'
                                            placeholder='Confirm Password'
                                            value={this.state.form.check}
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
                                        className='center-block' 
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
                                <FormGroup controlId='usernameControl'>
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl
                                        type='text'
                                        placeholder='Enter username'
                                        value={this.state.form.username}
                                        onChange={this.handleUsernameChange}
                                    />
                                </FormGroup>
                                <FormGroup controlId='passwordControl'>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl
                                        type='password'
                                        placeholder='Enter Password'
                                        value={this.state.form.password}
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
                                    id='forgot-btn'
                                    className='center-block' 
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