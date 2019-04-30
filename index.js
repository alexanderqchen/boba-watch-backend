const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const usersRouter = require('./routes/users');
const drinksRouter = require('./routes/drinks');
const dashboardRouter = require('./routes/dashboard')

const NODE_ENV = process.env.NODE_ENV;

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use('/users', usersRouter);
app.use('/drinks', drinksRouter);
app.use('/dashboard', dashboardRouter);

app.all('/*', (req, res, next) => {
	res.json({
		msg: 'Read the API documentation here: https://github.com/alexanderqchen/boba-watch-backend'
	});
});

if (NODE_ENV == 'production') {
	const PORT = 443;

	const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.boba.watch/privkey.pem');
	const certificate = fs.readFileSync('/etc/letsencrypt/live/api.boba.watch/cert.pem');

	https.createServer({
		key: privateKey,
		cert: certificate
	}, app).listen(PORT, (req, res, next) => {
		console.log(`Listening on port ${PORT}...`);
	});
}
else if (NODE_ENV == 'development') {
	const PORT = 8000;

	app.listen(PORT, (req, res, next) => {
		console.log(`Listening on port ${PORT}...`);
	});
}
else {
	console.log('Error: The environment variable NODE_ENV must be set to either `prod` or `dev`.');
	process.exit(1);
}
