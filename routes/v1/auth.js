const axios = require('axios');
const { appId, appSecret } = require.main.require('./config/fb-config')
const { Users } = require.main.require('./models');

const handleAuthError = (res) => {
	res.status(401).json({ msg: 'You are not authorized to access this.' });
}

const authorizeUser = async (req, res, next) => {
	const userId = req.params.userId;
	const accessToken = req.body.accessToken;

	const authRes = await axios.get(`https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appId}|${appSecret}`)

	const validToken = authRes.data.data.is_valid;
	const facebookUserId = authRes.data.data.user_id;

	let user;
	if (validToken) {
		user = await Users.findOne({ where: { facebookUserId } });
	}
	else {
		handleAuthError(res);
	}

	if (userId == user.id) {
		next();
	}
	else {
		handleAuthError(res);
	}
}

module.exports = authorizeUser;
