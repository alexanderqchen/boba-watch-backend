const express = require('express');
const router = express.Router();

const { Users } = require.main.require('./models');
const { authorizeUser, checkAccessToken } = require('./auth');

const sanitizeUser = (req, res, next) => {
	delete req.body.user.id;
	delete req.body.user.facebookUserId;
	next();
};

// Login
router.post('/login', async (req, res, next) => {
	const accessToken = req.body.accessToken;

	const authRes = await checkAccessToken(accessToken);
	const validToken = authRes.data.data.is_valid;
	const facebookUserId = authRes.data.data.user_id;

	if (validToken) {
		const user = await Users.findOne({ where: { facebookUserId } });

		if (user == null) {
			const newUser = await Users.create({ facebookUserId });
			res.status(200).json({ userId: newUser.id });
		}

		res.status(200).json({ userId: user.id });
	}

	res.status(401).json({ msg: "Invalid Facebook access token." });
});

// Public profile actions
router.route('/public/:userId')
// Check if public
.get(async (req, res, next) => {
	const userId = req.params.userId;

	const user = await Users.findOne({ where: { id: userId } });
	res.status(200).json({ public: user.public });
})
.all(authorizeUser)
// Change public setting
.put(async (req, res, next) => {
	const userId = req.params.userId;
	const public = req.body.public;

	const counts = await Users.update({ public }, { where: { id: userId } });
	res.status(200).json(counts[0]);
});

// Authenticated user actions
router.route('/:userId')
.all(authorizeUser)
// Get user information
.get(async (req, res, next) => {
	const userId = req.params.userId;

	const user = await Users.findOne({ where: { id: userId } });
	res.status(200).json(user);
})
// Update user information
.put(sanitizeUser, async (req, res, next) => {
	const id = req.params.userId;
	const user = req.body.user;

	const counts = await Users.update(user, { where: { id } });
	res.status(200).json(counts[0]);
})
// Delete User
.delete(async (req, res, next) => {
	const id = req.params.userId;

	const count = await Users.destroy({ where: { id } });
	res.status(200).json(count);
});

module.exports = router;
