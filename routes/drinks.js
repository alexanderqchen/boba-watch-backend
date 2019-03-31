const express = require('express');
const router = express.Router();

const Drinks = require('../models').Drinks;

router.route('/')
// Get all drinks
.get((req, res, next) => {
	Drinks.findAll()
	.then(drinks => {
		res.status(200).json(drinks);
	})
	.catch(err => {
		res.status(400).json(err);
	});
})
// Add drink
.post((req, res, next) => {
	let drink = req.body.drink;

	Drinks.create(drink)
	.then(drink => {
		res.status(200).json(drink);
	})
	.catch(err => {
		res.status(400).json(err);
	});
});

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

router.route('/:id')
// Update drink
.put((req, res, next) => {
	let drinkId = req.params.id;
	let drink = req.body.drink;

	Drinks.update(drink, { where: { id: drinkId } })
	.then(counts => {
		res.status(200).json(counts[0]);
	})
	.catch(err => {
		res.status(400).json(err);
	});
})
// Delete drink from user
.delete((req, res, next) => {
	const drinkId = req.params.id;

	Drinks.destroy({ where: { id: drinkId } })
	.then(count => {
		res.status(200).json(count);
	})
	.catch(err => {
		res.status(400).json(err);
	});
});

module.exports = router;
