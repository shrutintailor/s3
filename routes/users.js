var express = require('express');
var router = express.Router();
const ADMIN = require('../controller/admin')
const upload = require('../helper/multer')

/* GET users listing. */
router.get('/get_dp', ADMIN.getDp);
router.post('/upload_dp', upload.single('file'), ADMIN.uploadDp);

module.exports = router;
