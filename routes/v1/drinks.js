const express = require('express');
const router = express.Router();
const axios = require('axios');

const { Drinks, Users } = require.main.require('./models');
const { appId, appSecret } = require.main.require('./config/fb-config')
const authorizeUser = require('./auth');

const setUserId = async (req, res, next) => {
	const drinkId = req.params.drinkId;
	const drink = await Drinks.findOne({ where: { id: drinkId } });

	req.params.userId = drink.userId;
	next();
};

const sanatizeDrink = (req, res, next) => {
	delete req.body.drink.id;
	delete req.body.drink.userId;
	next();
}

// TODO: make this authenticated by public setting as well as accessToken
// Get all drinks from user
router.get('/user/:userId', (req, res, next) => {
	const userId = req.params.userId;

	Drinks.findAll({
		where: { userId },
		order: [
            ['date', 'DESC'],
            ['id', 'DESC'],
        ],
	})
	.then(drinks => {
		res.status(200).json(drinks);
	})
	.catch(err => {
		res.status(400).json(err);
	});
});

// Add drink
router.post('/user/:userId', authorizeUser, sanatizeDrink, (req, res, next) => {
	const userId = req.params.userId;
	const drink = req.body.drink;

	drink.userId = userId;

	Drinks.create(drink)
	.then(drink => {
		res.status(200).json(drink);
	})
	.catch(err => {
		res.status(400).json(err);
	});
});

router.route('/:drinkId')
.all(setUserId, authorizeUser)
// Update drink
.put(sanatizeDrink, (req, res, next) => {
	const drinkId = req.params.drinkId;
	const drink = req.body.drink;

	Drinks.update(drink, { where: { id: drinkId } })
	.then(counts => {
		res.status(200).json(counts[0]);
	})
	.catch(err => {
		res.status(400).json(err);
	});
})
.delete((req, res, next) => {
	const drinkId = req.params.drinkId;

	Drinks.destroy({ where: { id: drinkId } })
	.then(count => {
		res.status(200).json(count);
	})
	.catch(err => {
		res.status(400).json(err);
	});
})

module.exports = router;
