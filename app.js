var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var csrf = require('lusca').csrf();

var _ = require('lodash');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');

/**
 * Controllers (route handlers).
 */
// var homeController = require('./controllers/home');
// var userController = require('./controllers/user');
// var apiController = require('./controllers/api');
// var contactController = require('./controllers/contact');

/**
 * Routes
 */
var routes = require('./routes/index');
var users = require('./routes/users');

/**
 * API keys and Passport configuration.
 */
var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

/**
 * Create Express server
 */
var app = express();

/**
 * Connect to MongoDB
 */
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
}); 

/**
 * CSRF whitelist.
 */
var csrfExclude = ['/url1', '/url2'];

/**
 * Express configuration
 */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * CSRF protection
 */
// app.use(function(req, res, next){
//     if (_.contains(csrfExclude, req.path)) return next();
//     csrf(req, res, next);
// });

app.use('/', routes);
app.use('/users', users);

/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * error handlers
 * 
 * development error handler
 * will print stacktrace
 */
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * production error handler
 *
 * no stacktraces leaked to user
 */ 
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
