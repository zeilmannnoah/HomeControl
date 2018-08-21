import React from 'react';
import { Panel, Col, Row, Glyphicon } from 'react-bootstrap';
import LightService from '../../../services/LightService.js';
import LoadingSvg from '../../../imgs/dotsLoading.svg';
import './LightPanel.css'

export default class LightPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            info: null,
            powerState: null,
            powerStateText: null,
            offline: null
        }
        this.setData = this.setData.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.LightService = new LightService();

        this.setData();
    }

    setData() {
        this.LightService.getDevices()
        .then(data => {
            this.setState({
                info: data[0].info,
                powerState: data[0].state,
                powerStateText: (data[0].state ? 'On' : 'Off')
            });
        })
        .catch(err => {
            console.log(err);
            this.setState({
                offline: err
            });
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
        if (this.state.offline) {
            return (
                <Panel className='light-panel'>
                    <Panel.Heading className='light-panel-heading'>
                        <h1 className='text-center'>{this.state.offline}</h1>
                    </Panel.Heading>
                    <Panel.Body><a>Access Lights Settings<Glyphicon className='pull-right top-3' glyph='circle-arrow-right'/></a></Panel.Body>
                </Panel>
            );
        }
        else if (this.state.powerState === null) {
            return (
                <Panel className='light-panel'>
                    <Panel.Heading className='light-panel-heading'>
                        <img className={"loading center-block"} src={LoadingSvg}/>
                    </Panel.Heading>
                </Panel>
            );
        }

        return (
            <Panel className='light-panel'>
                <Panel.Heading className='light-panel-heading'>
                    <Row>
                        <Col md={5}>
                            <label className="switch">
                                <input type="checkbox" checked={this.state.powerState} onChange={this.handleCheck}/>
                                <span className="slider round"></span>
                            </label>
                        </Col>
                        <Col md={7}>
                            <Row>
                                <Col md={12}>
                                    <h1 className='pull-right'>{this.state.powerStateText}</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Panel.Title componentClass="h3" className='pull-right'>{this.state.info.alias}</Panel.Title>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Panel.Heading>
                <Panel.Body><a>Access Lights<Glyphicon className='pull-right top-3' glyph='circle-arrow-right'/></a></Panel.Body>
            </Panel>
        );
    }
}