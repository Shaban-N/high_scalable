var User = require('../models/users')


exports.users_list = function (req, res, next) {

  User.find({}, function (err, docs) {
    if (err) return console.log(err);
    res.render('users', { docs });
  });

}


exports.user_remove = function (req, res, next) {

  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return console.log(err);
    res.send(user);
  });

}


exports.user_find = function (req, res, next) {

  User.findById(req.params.id, function (err, doc) {
    if (err) return console.log(err);
    res.send(doc);
  });

}


exports.user_update = function (req, res) {

  if (!req.body) return res.sendStatus(400);
  var id = req.body.id;
  var userName = req.body.name;
  var userAge = req.body.age;
  User.findOneAndUpdate(
    { _id: id },
    { $set: { age: userAge, name: userName } },
    { new: true },
    function (err, result) {
      if (err) return res.status(400).send();
      res.send(result);
    });

}


exports.user_create = function (req, res) {

  if (!req.body) return res.sendStatus(400);
  var userName = req.body.name;
  var userAge = req.body.age;
  var user = { name: userName, age: userAge };
  User.create(user, function (err, result) {
    if (err) return res.status(400).send();
    console.log(result.id)
    res.send(result);
  });

}

