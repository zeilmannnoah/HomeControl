import React from 'react';
import { Panel } from 'react-bootstrap';
import WeatherService from '../../../services/WeatherService.js';
import './WeatherPanel.css'


export default class WeatherPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weathercode: null
        }

        this.WeatherService = new WeatherService();
        this.setWeather = this.setWeather.bind(this);

        this.setWeather();
    }

    setWeather() {
        this.WeatherService.fetchWeather()
            .then(data => {
                this.setState({
                    weather: data
                });

                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    getImagePath() {
        return this.state.weather ? require('../../../imgs/weather/' + this.state.weather.icon + '.svg') : require('../../../imgs/ajaxLoading.svg');
    }

    render() {
        

        return (
            <Panel bsStyle="primary">
                <Panel.Heading>
                    <img id='weather-icon' src={this.getImagePath()}/>
                    <Panel.Title componentClass="h3">Panel heading</Panel.Title>
                </Panel.Heading>
                <Panel.Body>Panel content</Panel.Body>
            </Panel>
        );
    }
}