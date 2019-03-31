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
		const drinks = await Drinks.findAll({
			where: { userId },
			order: [
				['date', 'DESC'],
				['id', 'DESC'],
			],
		});
		const spent = drinks.reduce((acc, drink) => {
			if (drink.date < beginningOfMonth) {
				acc += drink.price
			}
			return acc;
		});
		const numDrinks = drinks.reduce((acc, drink) => {
			drinkDate = new Date(drink.date);

			if (drinkDate < beginningOfMonth) {
				acc++;
			}
			return acc;
		});
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
