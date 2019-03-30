const express = require('express');
const router = express.Router();

router.route('/')
// Get drinks from user
.get(async (req, res, next) => {
	try {
		const drinks = await getDrinks();
		res.status(200).json(drinks);
	}
	catch {
		res.status(500).json();
	}
})
// Add drink to user
.post((req, res, next) => {
	let drink = req.body.drink;

	try {
		drink = await addDrink(drink);
		res.status(200).json(drink);
	}
	catch {
		res.status(500).json();
	}
})
// Update drink
.put((req, res, next) => {
	let drink = req.body.drink;

	try {
		drink = await updateDrink(drink);
		res.status(200).json(drink);
	}
	catch {
		res.status(500).json();
	}
})
// Delete drink from user
.delete((req, res, next) => {
	const drinkId = req.params.drinkId;

	try {
		const drink = await deleteDrink(drinkId);
		res.status(200).json(drink);
	}
	catch {
		res.status(500).json();
	}
});

module.exports = router;
