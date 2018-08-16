import React from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import LoginPanelContents from './components/LoginPanelContents.js'
import './LoginPage.css';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid id='login-grid'>
                <Row>
                    <Col md={4} mdOffset={4}>
                        <Panel id='login-panel'>
                            <Panel.Body>
                                <LoginPanelContents/>
                            </Panel.Body>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}