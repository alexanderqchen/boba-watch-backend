const express = require('express');
const router = express.Router();
const axios = require('axios');

const { Users } = require.main.require('./models');
const { authorizeUser, checkAccessToken } = require('./auth');

// Login
router.post('/login', async (req, res, next) => {
	const accessToken = req.body.accessToken;

	const authRes = await checkAccessToken(accessToken);
	const validToken = authRes.data.data.is_valid;
	const facebookUserId = authRes.data.data.user_id;

	if (validToken) {
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
	}
	else {
		res.status(401).json({
			msg: "Invalid Facebook access token."
		})
	}
});

// Public profile actions
router.route('/public/:userId')
// Check if public
.get((req, res, next) => {
	const id = req.params.userId;

	Users.findOne({ where: { id }})
	.then(user => {
		res.status(200).json({ public: user.public })
	})
	.catch(err => {
		res.status(400).json(err);
	})
})
.all(authorizeUser)
// Change public setting
.put((req, res, next) => {
	const id = req.params.userId;
	const public = req.body.public;

	const user = { public };

	Users.update(user, { where: { id } })
	.then(counts => {
		res.status(200).json(counts[0]);
	})
	.catch(err => {
		res.status(400).json(err);
	});
});

// Authenticated user actions
router.route('/:userId')
.all(authorizeUser)
// Get user information
.get((req, res, next) => {
	const id = req.params.userId;

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
	const id = req.params.userId;
	const user = req.body.user;

	delete user.id;
	delete user.facebookUserId;

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
	const id = req.params.userId;

	Users.destroy({ where: { id } })
	.then(count => {
		res.status(200).json(count);
	})
	.catch(err => {
		res.status(400).json(err);
	});
});

module.exports = router;
