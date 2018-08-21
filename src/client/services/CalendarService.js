import Auth from '../../auth/Auth.json';
import axios from 'axios';

export default class CalendarService {
    constructor() {
        this.state = {

        };
    }

    getEvents() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8080/api/getEvents')
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                if (err.request.status === 0) {
                    reject('A connection could not be established');
                }
                else {
                    reject(err);
                }
            });
        });
    }

}