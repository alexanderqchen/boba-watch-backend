const axios = require('axios');
const { appId, appSecret } = require.main.require('./config/fb-config')
const { Users } = require.main.require('./models');

const handleAuthError = (res) => {
	res.status(401).json({ msg: 'You are not authorized to access this.' });
}

const handleNoAccessToken = (res) => {
	res.status(400).json({ msg: 'Missing attribute `accessToken` in request body.' });
}

const checkAccessToken = async (accessToken) => {
	return await axios.get(`https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${appId}|${appSecret}`)
}

const authorizeUser = async (req, res, next) => {
	const userId = req.params.userId;
	const accessToken = req.body.accessToken;

	if (accessToken == null) {
		handleNoAccessToken(res);
	}

	const authRes = await checkAccessToken(accessToken);

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

module.exports = {
	authorizeUser,
	checkAccessToken
};
