const Config = require('../../auth/Settings');
const Auth = require('../../auth/Auth.json');
const Calendar = require('node-google-calendar');

let CalendarAPI = {},
    calendar = new Calendar(Config),
    oneWeekAhead = new Date(new Date().getTime() + 604800000).toISOString(),
    now = new Date().toISOString(),
    params = {
        orderBy: 'startTime',
        timeMax: oneWeekAhead,
        timeMin: now,
        singleEvents: true
    };

CalendarAPI.listEvents = () => {
    return calendar.Events.list(Auth.apis.google.email, params);
}

module.exports = CalendarAPI;