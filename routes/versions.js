var express = require('express');
var router = express.Router();


var versions_controller = require('../controllers/versionsController');

router.get('/',versions_controller.contents_list)
module.exports = router;