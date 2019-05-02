const express = require('express');
const router = express.Router();

const { Drinks, Users } = require.main.require('./models');
const { authorizeUser } = require('./auth');

const setUserId = async (req, res, next) => {
	const drinkId = req.params.drinkId;
	const drink = await Drinks.findOne({ where: { id: drinkId } });

	if (drink == null) {
		res.status(400).json({ msg: 'Invalid drink id.' });
	}

	req.params.userId = drink.userId;
	next();
};

const sanitizeDrink = (req, res, next) => {
	delete req.body.drink.id;
	delete req.body.drink.userId;
	next();
};

const getDrinksForUser = async (userId) => {
	return await Drinks.findAll({
			where: { userId },
			order: [
				['date', 'DESC'],
				['id', 'DESC'],
			],
		});
};

// Get all drinks from user
router.route('/user/:userId')
.get(async (req, res, next) => {
	const userId = req.params.userId;

	const user = await Users.findOne({ where: { id: userId } });

	if (user == null) {
		res.status(400).json({ msg: 'Invalid user id.' });
	}

	if (user.public) {
		const drinks = await getDrinksForUser(userId);
		res.status(200).json(drinks);
	}

	next();
})
.all(authorizeUser)
.get(async (req, res, next) => {
	const userId = req.params.userId;
	const drinks = await getDrinksForUser(userId);
	res.status(200).json(drinks);
})
.post(sanitizeDrink, async (req, res, next) => {
	const userId = req.params.userId;
	const drink = req.body.drink;
	drink.userId = userId;

	const newDrink = await Drinks.create(drink);
	res.status(200).json(newDrink);
});

router.route('/:drinkId')
.all(setUserId, authorizeUser)
// Update drink
.put(sanitizeDrink, async (req, res, next) => {
	const drinkId = req.params.drinkId;
	const drink = req.body.drink;

	const counts = await Drinks.update(drink, { where: { id: drinkId } });
	res.status(200).json(counts[0]);;
})
// Delete drink
.delete(async (req, res, next) => {
	const drinkId = req.params.drinkId;

	const count = await Drinks.destroy({ where: { id: drinkId } });
	res.status(200).json(count);
});

module.exports = router;
