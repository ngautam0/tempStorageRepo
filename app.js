var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession=require('express-session');
var flash = require('connect-flash');

var passport = require('passport');
var passportLocal=require('passport-local');

var routes = require('./routes/index');
var users = require('./routes/users');
var loginIntoAltizon = require('./routes/loginIntoAltizon');
var logout = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
  secret:process.env.SESSION_SECRET || 'secretkeybuddy',
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new passportLocal.Startegy(function (username,password,done){
  // console.log("username"+username);
  // console.log("password"+password);

  request({
      uri: "https://api.datonis.io/api_sign_in",
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      formData: {
          "email": username,
          "password": password
      }
  }, function(error, response, body) {
      console.log(body);
      var obj = JSON.parse(body);
      if (obj.auth_token !== undefined) {
        done(null,{id:obj.auth_token});
      } else if (obj.errors !== undefined) {
        done(null,null);
      } else {
        done(null,null);
      }
  });
}));

passport.serializeUser(function(user,done){
  done(null,user.id);
});
passport.deserializeUser(function(id,done){
  done(null,user.id);
});

app.use('/', routes);
app.use('/users', users);
app.use('/loginIntoAltizon', loginIntoAltizon);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
