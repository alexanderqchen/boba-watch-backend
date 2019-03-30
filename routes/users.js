const express = require('express');
const router = express.Router();

const Users = require('../models').Users;

// Create user
router.post('/', (req, res, next) => {
	const user = req.body.user;

	Users.create(user)
	.then(user => {
		res.status(200).json(user)
	})
	.catch(err => {
		res.status(400).json(err);
	});
});

router.route('/:id')
// Get user information
.get((req, res, next) => {
	const id = req.params.id;

	Users.findOne({ where: { id } })
	.then(user => {
		res.status(200).json(user);
	})
	.catch(err => {
		res.status(400).json(err);
	});
})
// Update user information
.put((req, res, next) => {
	const id = req.params.id;
	const user = req.body.user;

	Users.update(user, { where: { id } })
	.then(counts => {
		res.status(200).json(counts[0]);
	})
	.catch(err => {
		res.status(400).json(err);
	});
});

module.exports = router;
