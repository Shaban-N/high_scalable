var express = require('express');
var router = express.Router();


var users_controller = require('../controllers/usersController');


/* GET users listing. */
router.get('/', users_controller.users_list);

/* GET request to delete User. */
router.delete('/:id', users_controller.user_remove);

/* GET request to change User. */
router.get('/:id', users_controller.user_find);

/* PUT request to update User. */
router.put('/', users_controller.user_update);

/* POST request for creating User. */
router.post('/', users_controller.user_create);


module.exports = router;
