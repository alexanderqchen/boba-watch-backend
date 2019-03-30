const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const drinksRouter = require('./routes/drinks');

const PORT = 80;

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', usersRouter);
app.use('/drinks', drinksRouter);

app.listen(PORT, (req, res, next) => {
	console.log(`Listening on port ${PORT}...`);
});
