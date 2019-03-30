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
	const uuid = req.params.uuid;

	res.send('get /users');
})
// Update user information
.put((req, res, next) => {
	const uuid = req.params.uuid;

	res.send('post /users')
});

module.exports = router;
