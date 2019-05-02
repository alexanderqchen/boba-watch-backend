const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const drinksRouter = require('./drinks');
const dashboardRouter = require('./dashboard')

router.use('/users', usersRouter);
router.use('/drinks', drinksRouter);
router.use('/dashboard', dashboardRouter);

module.exports = router;
