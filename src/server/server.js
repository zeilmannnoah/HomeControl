const express = require("express");
const os = require("os");
const UserAuthDAO = require('./repositories/UserAuthDAO.js');
const SmartHomeAPI = require('./apis/SmartHomeAPI.js');
const CalendarAPI = require('./apis/CalendarAPI.js');


SmartHomeAPI.lookForPlugs().then(console.log).catch(console.log);
const app = express();
app.use(express.static("dist"));

app.get("/api/login", (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	UserAuthDAO.retreiveUser(req.query.username)
	 .then(data => res.send(data)).catch(err => res.send(err));
});

app.get("/api/signup", (req, res) => {
  	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	UserAuthDAO.addUser(req.query.fullname, req.query.username, req.query.hashPass)
	 .then(data => res.send(data)).catch(err => res.send(err));
});

app.get("/api/getDevices", (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	res.send(SmartHomeAPI.devices.map(i => i.data));
});

app.get("/api/toggleDevice", (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	SmartHomeAPI.toggleDevice(req.query.deviceId)
	 .then(data => res.send(data)).catch(err => res.send(err));
});

app.get('/api/getEvents', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	CalendarAPI.listEvents()
	 .then(data => res.send(data.filter(i => new Date(i.start.dateTime) > new Date()))).catch(err => res.send(err));
})

app.listen(8080, () => console.log("Listening on port 8080!"));