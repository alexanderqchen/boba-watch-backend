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
			where: { userId }
		});

		let spent = 0;
		let numDrinks = 0;
		console.log('1')
		drinks.forEach((drink) => {
			console.log('asdf')
			console.log(drink.date)
			console.log(new Date(drink.date))
			console.log(beginningOfMonth)
			if (new Date(drink.Date) > beginningOfMonth) {
				console.log('in if')
				spent += drink.price;
				numDrinks++;
			}
		});
		console.log(2);

		console.log(`spent: ${spent}`);
		console.log(`numDrinks: ${numDrinks}`);

		const user = await Users.findOne({ where: { id: userId } });

		dashboard = {
			budget: user.budget,
			spent,
			maxDrinks: user.maxDrinks,
			numDrinks
		}
		res.status(200).json(dashboard)
	}
	catch (err) {
		console.log('err');
		res.status(400).json(err);
	}
});

module.exports = router;
