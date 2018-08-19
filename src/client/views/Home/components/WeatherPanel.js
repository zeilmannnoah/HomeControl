import React from 'react';
import {Row, Col, Panel } from 'react-bootstrap';
import WeatherService from '../../../services/WeatherService.js';
import LoadingSvg from '../../../imgs/dotsLoading.svg';
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
        return require('../../../imgs/weather/' + this.state.data.icon + '.svg');
    }

    render() {
        if(!this.state.data) {
            return (
            <Panel bsStyle="primary">
                <Panel.Heading className='weather-panel'>
                    <img className="loading center-block" src={LoadingSvg}/>
                </Panel.Heading>
                <Panel.Body></Panel.Body>
            </Panel>
            );
        }

        
        return (
            <Panel bsStyle="primary" >
                <Panel.Heading className='weather-panel'>
                    <Row>
                        <Col md={6} className='padding-left-10'>
                            <img className='weather-icon' src={this.getImagePath()}/>
                        </Col>
                        <Col md={6} className>
                            <h1 className='pull-right degree'>{this.state.data.weather.temp}&#8457;</h1>
                            <Panel.Title componentClass="h3" className='pull-right desc'>{this.state.data.desc.ext}</Panel.Title>
                        </Col>
                    </Row>
                </Panel.Heading>
                <Panel.Body>{this.state.data.name}</Panel.Body>
            </Panel>
        );
    }
}