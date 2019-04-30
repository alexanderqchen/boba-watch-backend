const express = require('express');
const router = express.Router();

const { Drinks, Users } = require.main.require('./models');

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

		drinks.forEach((drink) => {
			console.log(beginningOfMonth)
			if (new Date(drink.date) > beginningOfMonth) {
				spent += drink.price;
				numDrinks++;
			}
		});
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
		err.message = 'error with GET /dashboard/:userId';
		res.status(400).json(err);
	}
});

module.exports = router;
