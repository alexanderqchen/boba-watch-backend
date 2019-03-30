const express = require('express');
const router = express.Router();

router.route('/:uuid')
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
