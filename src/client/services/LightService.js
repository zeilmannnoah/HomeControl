import axios from 'axios';

export default class LightService {
    constructor() {
    }

    getDevices() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8080/api/getDevices/')
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    toggleDevice(deviceId) {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8080/api/toggleDevice/', {
                params: {
                    deviceId: deviceId
                }
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
        });
    }
}