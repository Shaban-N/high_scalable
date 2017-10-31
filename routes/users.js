var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/users");

var Schema = mongoose.Schema;
// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы
var userScheme = new Schema({
    name: String,
    age: Number
});


var User = mongoose.model("User", userScheme);




/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}, function(err, docs){
        mongoose.disconnect();
        if(err) return console.log(err);
        res.render('users',{docs:docs});

    });
});


module.exports = router;
