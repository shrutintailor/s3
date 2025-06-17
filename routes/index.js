var express = require('express');
var router = express.Router();

// index route
router.use('/admin', require('./users'))

module.exports = router;
