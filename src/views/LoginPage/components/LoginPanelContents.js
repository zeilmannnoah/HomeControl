import React from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

export default class LoginPanelContents extends React.Component {
    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkUserAndPass = this.checkUserAndPass.bind(this);

        this.state = {
            username: '',
            password: '',
            disabled: true
        }
    }

    handleUsernameChange(e) {
        this.setState({ 
            username: e.target.value,
        });
        
        this.checkUserAndPass();
    }

    handlePasswordChange(e) {
        this.setState({ 
            password: e.target.value
        });

        this.checkUserAndPass();
    }

    checkUserAndPass() {
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            this.setState({
                disabled: false
            });
        }
    }

    handleSubmit(e) {

    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <h2 className='text-center'>Sign In</h2>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId='usernameControl'>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter username"
                                onChange={this.handleUsernameChange}
                            />
                        </FormGroup>
                        <FormGroup controlId='passwordControl'>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                placeholder="Enter Password"
                                onChange={this.handlePasswordChange}
                            />
                        </FormGroup>
                        <Button 
                            className="center-block" 
                            bsStyle="primary"
                            type="submit"
                            disabled={this.state.disabled}
                           > Primary</Button>
                    </form>
                </Col>
            </Row>
        );
    }
}