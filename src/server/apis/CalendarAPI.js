const Config = require('../../auth/Settings');
const Auth = require('../../auth/Auth.json');
const Calendar = require('node-google-calendar');

let CalendarAPI = {},
    calendar = new Calendar(Config),
    oneWeekAhead = new Date(new Date().getTime() + 604800000).toISOString(),
    oneDayBehind = new Date(new Date().getTime() - 86400000).toISOString();
    params = {
        orderBy: 'startTime',
        timeMax: oneWeekAhead,
        timeMin: oneDayBehind
    };  

CalendarAPI.listEvents = () => {
    return calendar.Events.list(Auth.apis.google.email, {});
}

module.exports = CalendarAPI;