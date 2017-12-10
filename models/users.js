var mongoose = require('mongoose');


var Schema = mongoose.Schema;


var userScheme = new Schema({
  name: String,
  age: Number
});


module.exports = mongoose.model("User", userScheme);
/*
 User.create({name: "Tom", age: 34}, function(err, doc){
 if(err) return console.log(err);
 });
 */