import axios from 'axios';
import Auth from '../../auth/Auth.json'

export default class MapsService {
    constructor() {
    }

    getLocationInfo(location) {
        return new Promise((resolve, reject) => {
            axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    latlng: location.lat + ',' + location.long,
                    key: Auth.apis.google.maps.key
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