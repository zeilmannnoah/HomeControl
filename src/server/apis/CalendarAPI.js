const Config = require('../../auth/Settings');
const Auth = require('../../auth/Auth.json');
const Calendar = require('node-google-calendar');

let CalendarAPI = {},
    calendar = new Calendar(Config),
    params = {
        showHidden: true
    };  

CalendarAPI.listEvents = () => {
    return calendar.Events.list(Auth.apis.google.calendarId, {});
}

module.exports = CalendarAPI;