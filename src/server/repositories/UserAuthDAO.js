const Request = require('tedious').Request;
const Connection = require('tedious').Connection;
const sql = require('sql-query');
const Auth = require('../../auth/Auth.json');
const UserAuthDAO = {};

let connection = new Connection(Auth.dbs.USERAUTH),
    sqlQuery = sql.Query('postgresql');

connection.on('connect', err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to DB');
    }
});

UserAuthDAO.retreiveUser = (username) => { 
    let query = sqlQuery.select();

    query = query
        .from('USERPASS')
        .select(['fullname', 'hashpass'])
        .where({ username: username})
        .build();

    return new Promise((resolve, reject) => {
        request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows);
            }
        });
        
        connection.execSql(request);
    });
};

UserAuthDAO.addUser = (fullname, username, hashpass) => { 
    let query = sqlQuery.insert();

    query = query.into('USERPASS').set({
        username: username,
        fullname: fullname,
        hashpass: hashpass
    }).build();

    return new Promise((resolve, reject) => {
        request = new Request(query, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({
                    username: username,
                    name: fullname,
                    passwordHash: hashpass
                });
            }
        });

        connection.execSql(request);
    });
};

module.exports = UserAuthDAO;