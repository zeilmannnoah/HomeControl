import React from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class LoginPanelContents extends React.Component {
    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleUsernameChange(e) {
        this.setState({ 
            username: e.target.value,
            password: this.state.password
        });
    }

    handlePasswordChange(e) {
        this.setState({ 
            username: this.state.username,
            password: e.target.value 
        });
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <h2 className='text-center'>Sign In</h2>
                    <form>
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
                    </form>
                </Col>
            </Row>
        );
    }
}