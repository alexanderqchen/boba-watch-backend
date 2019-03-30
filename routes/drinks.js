const express = require('express');
const router = express.Router();

const Drinks = require('../models').Drinks;

router.route('/')
// Get drinks from user
.get(async (req, res, next) => {
	Drinks.findAll()
	.then(drinks => {
		res.status(200).json(drinks);
	})
	.catch(err => {
		res.status(400).json(err);
	});
})
// Add drink to user
.post((req, res, next) => {
	// let drink = req.body.drink;

	Drinks.create({
		name: 'test1',
		location: 'testloc',
		price: 123,
		date: new Date(),
		photo: 'asdf'
	})
	.then(drink => {
		res.status(201).json(drink);
	})
	.catch(err => {
		res.status(400).json(err);
	});
})
// Update drink
.put((req, res, next) => {
	// let drink = req.body.drink;

	// try {
	// 	drink = await updateDrink(drink);
	// 	res.status(200).json(drink);
	// }
	// catch {
	// 	res.status(500).json();
	// }
})
// Delete drink from user
.delete((req, res, next) => {
	// const drinkId = req.params.drinkId;

	// try {
	// 	const drink = await deleteDrink(drinkId);
	// 	res.status(200).json(drink);
	// }
	// catch {
	// 	res.status(500).json();
	// }
});

module.exports = router;
