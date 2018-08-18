import Auth from './auth.json';
import axios from 'axios';

export default class WeatherService {
    constructor() {
        this.apikey = Auth.keys.weather;
    }

    fetchWeather(when) {
        if (!when) {
        	axios.get(`api.openweathermap.org/data/2.5/weather?lat=37.22&lon=-93.3&appid=${this.apikey}`)
        	.then(data => {
        		console.log(data);
        	})
        	.catch(err => {
        		console.log(err);
        	});
        }
    }
}