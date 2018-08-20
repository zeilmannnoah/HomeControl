const Config = require('../../auth/Settings');
const Calendar = require('node-google-calendar');

let CalendarAPI = {},
    calendar = new Calendar(Config),
    params = {
        showHidden: true
    };  

CalendarAPI.listCalendars = () => {
    calendar.CalendarList.list(params)
    .then(resp => {
        console.log(resp);
        params = {
            scope: {
                type: 'user',
                value: 'zeilmannnoah@gmail.com'
            },
            role: 'owner'
        };
        calendar.Acl.insert("zeilmannnoah@gmail.com", params)
        .then(resp => {
            console.log(resp);
        }).catch(err => {
            console.log(err.message);
        });
     }).catch(err => {
        console.log(err.message);
    });
}



module.exports = CalendarAPI;