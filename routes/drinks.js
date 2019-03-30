const express = require('express');
const router = express.Router();

router.route('/:uuid')
// Get drinks from user
.get((req, res, next) => {
	const uuid = req.params.uuid;

	res.send('get /drinks');
})
// Add drink to user
.post((req, res, next) => {
	const uuid = req.params.uuid;

	res.send('post /drinks');
})
// Delete drink from user
.delete((req, res, next) => {
	const uuid = req.params.uuid;

	res.send('delete /drinks');
});

module.exports = router;
