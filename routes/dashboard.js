const express = require('express');
const router = express.Router();

const Drinks = require('../models').Drinks;
const Users = require('../models').Users;

router.route('/:userId')
// Get all drinks
.get(async (req, res, next) => {
	const userId = req.params.userId;

	try {
		const spent = await Drinks.sum('price', { where: { userId } });
		const numDrinks = await Drinks.count({ where: { userId } });
		const user = await Users.findOne({ where: { id } });


		// where: { actualEndDate: { $lt: sequelize.col('scheduleEndDate') } }

		dashboard = {
			budget: user.budget,
			spent,
			maxDrinks: user.maxDrinks,
			numDrinks
		}

		res.status(200).json(dashboard)
	}
	catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
