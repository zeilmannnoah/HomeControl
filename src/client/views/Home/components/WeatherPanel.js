import React from 'react';
import {Row, Col, Panel } from 'react-bootstrap';
import WeatherService from '../../../services/WeatherService.js';
import './WeatherPanel.css'


export default class WeatherPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }

        this.WeatherService = new WeatherService();
        this.setData = this.setData.bind(this);

        this.setData();
    }

    setData() {
        this.WeatherService.fetchWeather()
            .then(data => {
                console.log(data);
                this.setState({
                    data: data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    getImagePath() {
        return this.state.data ? require('../../../imgs/weather/' + this.state.data.icon + '.svg') : require('../../../imgs/dotsLoading.svg');
    }

    render() {
        
        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <Row>
                        <Col md={6}>
                            <img className={this.state.data ? 'weather-icon' : "loading center-block"} src={this.getImagePath()}/>
                        </Col>
                        <Col md={6}>
                            <h1 className='pull-right'>{this.state.data !== null ? this.state.data.weather.temp : ''}</h1>
                            <Panel.Title componentClass="h3" className='pull-right'>{this.state.data !== null ? this.state.data.desc.ext : ''}</Panel.Title>
                        </Col>
                    </Row>
                </Panel.Heading>
                <Panel.Body>{this.state.data !== null ? this.state.data.name : ''}</Panel.Body>
            </Panel>
        );
    }
}