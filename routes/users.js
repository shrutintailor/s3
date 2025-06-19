var express = require('express');
var router = express.Router();
const ADMIN = require('../controller/admin')
const upload = require('../helper/multer')

const { isAuth } = require('../middelware/auth')

/* GET users listing. */
router.post('/sign_up', ADMIN.signUp);
router.post('/login', ADMIN.login);
router.get('/get_dp', isAuth, ADMIN.getDp);
router.post('/upload_dp', isAuth, upload.single('file'), ADMIN.uploadDp);

module.exports = router;
