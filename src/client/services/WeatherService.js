import Auth from '../../auth/Auth.json';
import axios from 'axios';

export default class WeatherService {
    constructor() {
        this.apikey = Auth.apis.weather.key;

        this.neutralIcons = ['03d', '03n', '04d', '04n', '50d', '50n'];
    }

    fetchWeather(when) {
        if (!when) {
        	return new Promise((resolve, reject) => {
                axios.get('http://api.openweathermap.org/data/2.5/weather', {
                    params: {
                        lat: 37.22,
                        lon: -93.3,
                        units:'imperial',
                        appid: this.apikey
                    }
                })
                .then(res => {
                    console.log(res);
                    resolve({
                        name: res.data.name,
                        icon: this.neutralIcons.includes(res.data.weather[0].icon) ? res.data.weather[0].icon.replace(/[^0-9]/, "") : res.data.weather[0].icon,
                        desc: {
                            ext: res.data.weather[0].description.split(' ').map(i => i[0].toUpperCase() + i.slice(1)).join(' '),
                            min: res.data.weather[0].main
                        },
                        weather: {
                            humidity: res.data.main.humidity,
                            pressure: res.data.main.pressure,
                            temp: res.data.main.temp,
                            temp_max: res.data.main.temp_max,
                            temp_min: res.data.main.temp_min,
                            wind: res.data.wind,
                            sunrise: new Date(1000 * res.data.sys.sunrise),
                            setset: new Date(1000 * res.data.sys.sunset)
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                });
            });
        }
    }
}