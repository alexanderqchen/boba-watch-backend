const express = require('express');
const router = express.Router();

const v0Router = require('./v0');
const v1Router = require('./v1');

router.use('/', v0Router);
router.use('/v0', v0Router);
router.use('/v1', v1Router);

module.exports = router;
