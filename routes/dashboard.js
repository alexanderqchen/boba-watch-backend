const express = require('express');
const router = express.Router();

const Drinks = require('../models').Drinks;
const Users = require('../models').Users;

router.route('/:userId')
// Get all drinks
.get(async (req, res, next) => {
	const userId = req.params.userId;
	const now = new Date();
	const beginningOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

	try {
		const spent = await Drinks.sum('price', { where: {
			userId,
			date: { $gt: beginningOfMonth }
		} });
		const numDrinks = await Drinks.count({ where: {
			userId,
			date: { $gt: beginningOfMonth }
		} });
		const user = await Users.findOne({ where: { id: userId } });

		dashboard = {
			budget: user.budget,
			spent,
			maxDrinks: user.maxDrinks,
			numDrinks
		}
		console.log(dashboard);
		res.status(200).json(dashboard)
	}
	catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
