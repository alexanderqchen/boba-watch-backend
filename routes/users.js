const express = require('express');
const router = express.Router();

const Users = require('../models').Users;

// Login
router.post('/login', (req, res, next) => {
	const fbRes = req.body.fbRes;
	const facebookUserId = fbRes.userId;
	const accessToken = fbRes.accessToken;

	Users.findOne({ where: { facebookUserId } })
	.then(user => {
		if (user == null) {
			Users.create({ facebookUserId })
			.then(user => {
				res.status(200).json({ userId: user.id });
			})
		}
		else {
			res.json({ userId: user.id });
		}
	})
});

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
})
// Delete User
.delete((req, res, next) => {
	const id = req.params.id;

	Users.destroy({ where: { id } })
	.then(count => {
		res.status(200).json(count);
	})
	.catch(err => {
		res.status(400).json(err);
	});
});

module.exports = router;
