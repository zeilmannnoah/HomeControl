import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Panel, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import UserService from '../../../services/UserService.js';
import ajaxLoading from '../../../imgs/ajaxLoading.svg';

export default class LoginPanel extends React.Component {
    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkUserAndPass = this.checkUserAndPass.bind(this);
        this.onFailuire = this.onFailuire.bind(this);
        this.UserService = new UserService();

        this.state = {
            username: '',
            password: '',
            disabled: true,
            authenticated: false,
            fetching: false,
        };
    }

    handleUsernameChange(e) {
        this.setState({ 
            username: e.target.value,
        }, () => {
            this.checkUserAndPass();
        });
        
    }

    handlePasswordChange(e) {
        this.setState({ 
            password: e.target.value
        }, () => {
            this.checkUserAndPass();
        });
    }

    checkUserAndPass() {
        if (this.state.username.length != 0 && this.state.password.length != 0) {
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

        this.UserService.login(e.target[0].value, e.target[1].value)
        .then(() => {
            this.setState({
                authenticated: true
            });
        })
        .catch(err => {
            this.setState({
                authenticated: false,
                fetching: false
            });
            this.onFailuire();
        })
    }

    onFailuire (e) {
        this.props.onFailuire();
    };

    render() {
        if (this.state.authenticated) {
            return <Redirect to='/Home'/>;
        }

        if (this.state.fetching) {
            return (
                <Panel id='login-panel'>
                    <Panel.Body>
                        <Row>
                            <Col md={12}>
                                <h2 className='text-center'>Home Control</h2>
                                <img className='center-block' src={ajaxLoading} />
                            </Col>
                        </Row>
                    </Panel.Body>
                </Panel>
            )
        }

        return (
            <Panel id='login-panel'>
                <Panel.Body>
                    <Row>
                        <Col md={12}>
                            <h2 className='text-center'>Home Control</h2>
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId='usernameControl'>
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl
                                        type='text'
                                        placeholder='Enter username'
                                        value={this.state.username}
                                        onChange={this.handleUsernameChange}
                                    />
                                </FormGroup>
                                <FormGroup controlId='passwordControl'>
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
                                    id='forgot-btn'
                                    className='center-block' 
                                    bsStyle='link'
                                    >Forgot Password</Button>
                            </form>
                        </Col>
                    </Row>
                </Panel.Body>
            </Panel>
        );
    }
}