import React from 'react';
import { Redirect } from 'react-router-dom';
import { Panel, Col, Row} from 'react-bootstrap';
import LightService from '../../../services/LightService.js';
import LoadingSvg from '../../../imgs/dotsLoading.svg';
import './LightPanel.css'

export default class LighPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            info: null,
            powerState: null,
            powerStateText: null
        }
        this.setData = this.setData.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.LightService = new LightService();

        this.setData();
    }

    setData() {
        this.LightService.getDevices()
        .then(data => {
            console.log(data)
            this.setState({
                info: data[0].info,
                powerState: data[0].state,
                powerStateText: (data[0].state ? 'On' : 'Off')
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    handleCheck() {
        this.setState({
            powerState: !this.state.powerState
        });

        this.LightService.toggleDevice(this.state.info.deviceId)
        .then(res => {
            this.setState({
                powerStateText: res ? 'On' : 'Off'
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({
                powerState: !this.state.powerState
            });
        });
    }

    render() {
        if (this.state.powerState === null) {
            return (
                <Panel className='light-panel'>
                    <Panel.Heading className='light-panel-heading'>
                        <img className={"loading center-block"} src={LoadingSvg}/>
                    </Panel.Heading>
                    <Panel.Body></Panel.Body>
                </Panel>
            );
        }

        return (
            <Panel className='light-panel'>
                <Panel.Heading className='light-panel-heading'>
                    <Row>
                        <Col md={6}>
                                <label className="switch">
                                    <input type="checkbox" checked={this.state.powerState} onChange={this.handleCheck}/>
                                    <span className="slider"></span>
                                </label>
                        </Col>
                        <Col md={6}>
                            <h1>{this.state.powerStateText}</h1>
                        </Col>
                    </Row>
                </Panel.Heading>
                <Panel.Body>{this.state.info.alias}</Panel.Body>
            </Panel>
        );
    }
}