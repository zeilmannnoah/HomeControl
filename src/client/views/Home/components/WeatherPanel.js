import React from 'react';
import {Row, Col, Panel, Glyphicon } from 'react-bootstrap';
import WeatherService from '../../../services/WeatherService.js';
import MapsService from '../../../services/MapsService.js';
import LoadingSvg from '../../../imgs/dotsLoading.svg';
import './WeatherPanel.css'


export default class WeatherPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherData: null,
            locationData: null,
            offline : null 
        }

        this.WeatherService = new WeatherService();
        this.MapsService = new MapsService();
        this.setData = this.setData.bind(this);

        

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position);
                this.setData({lat: position.coords.latitude, long: position.coords.longitude});
            });
        }
    }

    setData(location) {
        let weather;
        this.WeatherService.fetchWeather(location)
        .then(data => {
            weather = data;
        })
        .catch(err => {
            console.log(err);
            this.setState({
                offline: err
            });
        })
        .finally(() => {
            console.log(weather);
            this.MapsService.getLocationInfo(location)
            .then(location => {
                console.log(location);
                this.setState({
                    weatherData: weather,
                    locationData: location
                });
            })
            .catch(err => {
                console.log(err);
            });
        });
    }

    getImagePath() {
        return require('../../../imgs/weather/' + this.state.weatherData.icon + '.svg');
    }

    render() {
        if (this.state.offline) {
             return (
                <Panel className='weather-panel'>
                    <Panel.Heading className='weather-panel-heading'>
                        <h1 className='text-center'>{this.state.offline}</h1>
                    </Panel.Heading>
                    <Panel.Body><a>Access Weather Settings<Glyphicon className='pull-right top-3' glyph='circle-arrow-right'/></a></Panel.Body>
                </Panel>
            );
        }
        else if(!this.state.weatherData) {
            return (
                <Panel className='weather-panel'>
                    <Panel.Heading className='weather-panel-heading'>
                        <img className="loading center-block" src={LoadingSvg}/>
                    </Panel.Heading>
                </Panel>
            );
        }

        
        return (
            <Panel className='weather-panel'>
                <Panel.Heading className='weather-panel-heading'>
                    <Row>
                        <Col md={6} className='padding-left-10'>
                            <img className='weather-icon' src={this.getImagePath()}/>
                        </Col>
                        <Col md={6} className>
                            <Row>
                                <Col md={12}>
                                    <h1 className='pull-right degree'>{this.state.weatherData.weather.temp}&#8457;</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                <Panel.Title componentClass="h3" className='pull-right desc'>{this.state.weatherData.desc.ext}</Panel.Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Panel.Title componentClass="h3" className='pull-right desc'>
                                        {this.state.locationData.results.filter(i => i.types.includes("locality") && i.types.includes("political"))[0].formatted_address}
                                    </Panel.Title>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Panel.Heading>
                <Panel.Body><a>Access Weather<Glyphicon className='pull-right top-3' glyph='circle-arrow-right'/></a></Panel.Body>
            </Panel>
        );
    }
}