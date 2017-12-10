var express = require('express');
var path = require('path');
var Logger = require('./logs/index.js');
var index = require('./routes/index');
var users = require('./routes/users');
var contacts=require('./routes/contacts');
var version=require('./routes/versions');
var mongoose = require('mongoose');
var bodyParser=require('body-parser');


var logger = new Logger();

var app = express();

mongoose.connect("mongodb://localhost:27017/users", {
  useMongoClient: true
});

mongoose.Promise = global.Promise;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./logs/rt'));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/users', users);
app.use('/contacts', contacts);
app.use('/content',version);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
