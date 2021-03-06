const express = require('express');
const router = express.Router();
const axios = require('axios');

const { Users } = require.main.require('./models');
const { appId, appSecret } = require.main.require('./config/fb-config')

// Login
router.post('/login', (req, res, next) => {
	const fbRes = req.body.fbRes;
	const facebookUserId = fbRes.userID;
	const accessToken = fbRes.accessToken;

	axios.get(`https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appId}|${appSecret}`)
	.then(authRes => {
		if (authRes.data.data.is_valid) {
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
			res.status(400).json({
				msg: "Authentication failed."
			})
		}
	})
	.catch(err => {
		res.status(400).json(err);
	});
});

// Public profile actions
router.route('/public/:id')
// Check if public
.get((req, res, next) => {
	const id = req.params.id;

	Users.findOne({ where: { id }})
	.then(user => {
		res.status(200).json({ public: user.public })
	})
	.catch(err => {
		res.status(400).json(err);
	})
})
// Authentication
.all((req, res, next) => {
	const userId = req.params.id;
	const accessToken = req.body.accessToken;

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
	.catch(err => {
		res.status(400).json(err);
	})
})
// Change public setting
.put((req, res, next) => {
	const id = req.params.id;
	const public = req.body.public;

	const user = { public }

	Users.update(user, { where: { id } })
	.then(counts => {
		res.status(200).json(counts[0]);
	})
	.catch(err => {
		res.status(400).json(err);
	});
});

// Authenticated user actions
router.route('/:id/:access_token')
.all((req, res, next) => {
	const userId = req.params.id;
	const accessToken = req.params.access_token;

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
			.catch(err => {
				res.status(400).json(err);
			})
		}
		else {
			res.status(400).json({
				msg: "Authentication failed."
			})
		}
	})
	.catch(err => {
		res.status(400).json(err);
	});
})
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
