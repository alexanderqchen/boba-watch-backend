const express = require('express');
const router = express.Router();
const axios = require('axios');

const Drinks = require('../models').Drinks;
const Users = require('../models').Users;
const { appId, appSecret } = require('../config/fb-config')

// Add drink
router.post('/:accessToken', (req, res, next) => {
	const accessToken = req.params.accessToken;
	const drink = req.body.drink;

	const userId = drink.userId;

	axios.get(`https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appId}|${appSecret}`)
	.then(authRes => {
		const is_valid = authRes.data.data.is_valid;
		const facebookUserId = authRes.data.data.user_id;

		if (is_valid) {
			Users.findOne({ where: { facebookUserId } })
			.then(user => {
				if (userId == user.id) {
					Drinks.create(drink)
					.then(drink => {
						res.status(200).json(drink);
					})
					.catch(err => {
						res.status(400).json(err);
					});
				}
				else {
					res.status(401).json({
						msg: `Unauthorized to user ${id}`
					})
				}
			})
		}
		else {
			res.status(400).json({
				msg: "Authentication failed."
			})
		}
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

router.route('/:id/:accessToken')
.all((req, res, next) => {
	const drinkId = req.params.id;
	const accessToken = req.params.accessToken;
	Drinks.findOne({ where: { id: drinkId } })
	.then(drink => {
		const userId = drink.userId;
		axios.get(`https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appId}|${appSecret}`)
		.then(authRes => {
			const is_valid = authRes.data.data.is_valid;
			const facebookUserId = authRes.data.data.user_id;

			if (is_valid) {
				Users.findOne({ where: { facebookUserId } })
				.then(user => {
					if (userId == user.id) {
						return next();
					}
					else {
						res.status(401).json({
							msg: `Unauthorized to user ${id}`
						})
					}
				})
			}
			else {
				res.status(400).json({
					msg: "Authentication failed."
				})
			}
		})
	})
	.catch(err => {
		res.status(400).json(err);
	});
})
// Update drink
.put((req, res, next) => {
	let drinkId = req.params.id;
	let drink = req.body.drink;

	delete drink.userId;

	Drinks.update(drink, { where: { id: drinkId } })
	.then(counts => {
		res.status(200).json(counts[0]);
	})
	.catch(err => {
		res.status(400).json(err);
	});
})

router.route('/delete/:id/:accessToken')
.all((req, res, next) => {
	const drinkId = req.params.id;
	const accessToken = req.params.accessToken;
	Drinks.findOne({ where: { id: drinkId } })
	.then(drink => {
		const userId = drink.userId;
		axios.get(`https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appId}|${appSecret}`)
		.then(authRes => {
			const is_valid = authRes.data.data.is_valid;
			const facebookUserId = authRes.data.data.user_id;

			if (is_valid) {
				Users.findOne({ where: { facebookUserId } })
				.then(user => {
					if (userId == user.id) {
						return next();
					}
					else {
						res.status(401).json({
							msg: `Unauthorized to user ${id}`
						})
					}
				})
			}
			else {
				res.status(400).json({
					msg: "Authentication failed."
				})
			}
		})
	})
	.catch(err => {
		res.status(400).json(err);
	});
})
// Delete drink from user
.post((req, res, next) => {
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
