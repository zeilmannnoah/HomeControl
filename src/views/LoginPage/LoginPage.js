import React from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap';
import LoginPanel from './components/LoginPanel.js'
import './LoginPage.css';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleFailure = this.handleFailure.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);

        this.state = {
            alertStyle: "invisible"
        }
    }

    handleFailure() {
        this.setState({
            alertStyle: ""
        });

    }

    dismissAlert() {
        this.setState({
            alertStyle: "invisible"
        })
    }

    render() {

        return (
            <Grid className='center-vertically'>
                <Row>
                    <Col md={4} mdOffset={4} >
                        <Alert 
                            bsStyle='danger' 
                            className={this.state.alertStyle}
                            onDismiss={this.dismissAlert}
                        >
                            <strong>Username and password not found!</strong> Please try again.
                        </Alert>
                        <LoginPanel onFailuire={this.handleFailure}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}