import axios from 'axios';

export default class LightService {

    getDevices() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8080/api/getDevices')
            .then(res => {
                if (res.data.length === 0) {
                    reject('No Devices found');
                }
                resolve(res.data);
            })
            .catch(err => {
                if (err.request.status === 0 ) {
                    reject("A connection could not be established");
                }
                else {
                    reject(err.code);
                }
            });
        });
    }

    toggleDevice(deviceId) {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8080/api/toggleDevice', {
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