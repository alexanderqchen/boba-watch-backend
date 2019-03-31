const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const usersRouter = require('./routes/users');
const drinksRouter = require('./routes/drinks');
const dashboardRouter = require('./routes/dashboard')

const PORT = 443;

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/users', usersRouter);
app.use('/drinks', drinksRouter);
app.use('/dashboard', dashboardRouter);

const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.boba.watch/privkey.pem');
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.boba.watch/cert.pem');

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(PORT, (req, res, next) => {
	console.log(`Listening on port ${PORT}...`);
});
