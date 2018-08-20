/*
TODO: Implement a system varaiable for most of this stuff, such as backend hostname 
*/

import Bcrypt from 'bcryptjs';
import axios from 'axios';

export default class UserService {
    constructor() {
        this.saltRounds = 10;
    }

    encryptPassword(password) {
        return new Promise((resolve, reject) => {
            try {
                Bcrypt.genSalt(this.saltRounds, (err, salt) => {
                    Bcrypt.hash(password, salt, (err, hash) => {
                        resolve(hash);
                    })
                });
            }
            catch(err) {
                reject(err);
            }
        });
        
    }

    login(username, password) {
        return new Promise((resolve, reject) => { 
            axios.get('http://localhost:8080/api/login/', {
                params: {
                    username: username
                }
            })
            .then(res => {
                Bcrypt.compare(password, res.data[0][1].value)
                .then(valid => {
                    sessionStorage.setItem("fullname", res.data[0][0].value);
                    resolve(valid);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
                
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    // TODO: Fix this, it anit a get
    signup(fullname, username, password) {
        return new Promise((resolve, reject) => {
            this.encryptPassword(password)
            .then(hashPass => { 
                axios.get('http://localhost:8080/api/signup/', {
                    params: {
                        fullname: fullname,
                        username: username,
                        hashPass: hashPass
                    }
                })
                .then(res => {
                    console.log(res);
                    resolve(res);
                    sessionStorage.setItem("fullname", res.data.name);
                    
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
            })
            .catch(err => {
                reject(err);
            });
        });
    }
}