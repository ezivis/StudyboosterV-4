
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const keys = require('./config/keys');

var index = require('./routes/index');

var fake = require('./routes/fake');

var add = require('./routes/add');

var friends = require('./routes/friends');

var task = require('./routes/task');

var stopwatch = require('./routes/stopwatch');
// Example route
// var user = require('./routes/user');

var authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
var app = express();
var passportSetup = require('./config/passport-setup'); // Actualky creates the google strategy
const passport = require('passport');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
mongoose.connect(process.env.MONGODB_URI || keys.mongodb.dbURI,{ useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('connected to mongodb');
});

// If the below is uncommented, app will not run, due to fact that we need
// express 4 for google login, and below is deprecated
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(express.cookieParser('IxD secret key'));
// app.use(express.session());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

// Add routes here
app.get('/', index.view);
app.get('/friends', friends.view);
app.get('/view_friend', friends.open);
app.get('/task_page', task.viewTask);
app.get('/add_task',task.addTask);
app.get('/add',add.addFriend);
app.get('/stop_watch',stopwatch.stopWatch);
app.get('/fake',fake.fake);
// Example route
// app.get('/users', user.list);

//STUFF for Google login

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
