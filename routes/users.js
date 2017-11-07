var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');



var Schema = mongoose.Schema;
// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы
var userScheme = new Schema({
    name: String,
    age: Number
});


var User = mongoose.model("User", userScheme);
/*
User.create({name: "Tom", age: 34}, function(err, doc){
    if(err) return console.log(err);
});
*/


/* GET users listing. */
router.get('/', function(req, res, next) {
    mongoose.connect("mongodb://localhost:27017/users");

    User.find({}, function(err, docs){
        mongoose.disconnect();
        for (var i=0;i<docs.length;i++)
            console.log(docs[i])
        if(err) return console.log(err);
        res.render('users',{docs:docs});

    });

});

router.delete('/:id',function (req, res, next) {
    mongoose.connect("mongodb://localhost:27017/users");
    User.findByIdAndRemove(req.params.id, function(err, user){
        if(err) return console.log(err);
        mongoose.disconnect();
        res.send(user);
    });
});

router.get('/:id',function(req,res,next){
    mongoose.connect("mongodb://localhost:27017/users");
    User.findById(req.params.id, function(err, doc){
        mongoose.disconnect();
        if(err) return console.log(err);

        res.send(doc);

    });
});


//res.sendStatus - error handler
router.put( '/', function(req, res) {
        if (!req.body) return res.sendStatus(400);
        var id = req.body.id;
        var userName = req.body.name;
        var userAge = req.body.age;
        mongoose.connect("mongodb://localhost:27017/users");

        User.findOneAndUpdate({_id: id}, {$set: {age: userAge, name: userName}}, {new:true}, function (err, result) {
                mongoose.disconnect();
                    if (err) return res.status(400).send();
                    res.send(result);
                });
})
router.post('/',function(req, res){

    if (!req.body) return res.sendStatus(400);
    var userName = req.body.name;
    var userAge = req.body.age;
    var user = {name: userName, age: userAge};

    mongoose.connect("mongodb://localhost:27017/users");

    User.create(user, function (err, result) {
        mongoose.disconnect();
        if (err) return res.status(400).send();
        console.log(result.id)
        res.send(result);
    });


})





module.exports = router;
