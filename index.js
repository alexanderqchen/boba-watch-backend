const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const drinksRouter = require('./routes/drinks');

const PORT = 8080;

app.use('/users', usersRouter);
app.use('/drinks', drinksRouter);

app.listen(PORT, (req, res, next) => {
	console.log(`Listening on port ${PORT}...`);
});
