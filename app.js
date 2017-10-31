var express = require('express');
var path = require('path');
var Logger = require('./logs/index.js');
var index = require('./routes/index');
var users = require('./routes/users');
var contacts=require('./routes/contacts');
var mongoose = require('mongoose');



var logger = new Logger();
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
 app.use(express.static(path.join(__dirname, 'public')));
 */

app.use('/', index);
app.use('/users', users);
app.use('/contacts', contacts);
app.use(require('./logs/rt'));





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