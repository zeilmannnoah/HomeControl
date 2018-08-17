/*
This is a really simple mock of the user service I plan to implement
*/
//import Bcrypt from 'bcrypt';

export default class UserService {
    constructor() {
        this.fakeTable = [{username: 'nzeilmann', password: 'password', fullName:'Noah Zeilmann'}];
        this.saltRounds = 1000

        //encryptPassword = encryptPassword.bind(this);
    }

    addNewUser(username, encryptedPassword) {
        this.fakeTable.push({username: username, password: encryptedPassword});
    }

    /*
    encryptPassword(password) {
        Bcrypt.genSalt(this.saltRounds, (err, salt) => {
            Bcrypt.hash(password, salt, (err, hash) => {
                console.log(hash);
            })
        });
    }
    */

    login(username, password) {
        // Add fake delay

        return new Promise((resolve, reject) => {
            setTimeout(() => {          
                if (this.fakeTable.filter(el => el.username === username && el.password === password).length === 1) {
                    resolve(true);
                }
                else {
                    reject("User not found");
                }
            }, 1000);
        });
        
    }
}