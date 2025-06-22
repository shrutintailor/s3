var express = require('express');
var router = express.Router();
const ADMIN = require('../controller/admin')
const upload = require('../helper/multer')
const { validate } = require('../middelware/errorMessage');
const { createrUser, getDp, uploadDp } = require('../validation/user')

const { isAuth } = require('../middelware/auth');

/* GET users listing. */
router.get('/get_dp', isAuth, validate(getDp), ADMIN.getDp);
router.post('/login', ADMIN.login);
router.post('/sign_up', validate(createrUser), ADMIN.signUp);
router.post('/upload_dp', isAuth, upload.single('file'), validate(getDp),  ADMIN.uploadDp);

module.exports = router;
