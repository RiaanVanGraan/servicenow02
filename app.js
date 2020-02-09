var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var keys = require('./config/keys');
var mongoose = require('mongoose');
var passport = require('passport');
var passportSetup = require('./config/keys');
var cookieSession = require('cookie-session');
var passportSetup = require('./config/passport');

var companyRouter = require('./routes/company');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieSession({ maxAge: 24 * 1 * 60 * 1000, keys: [keys.session.cookieKey] }));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/company', companyRouter);
app.use(loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.set('useFindAndModify', false);

mongoose.connect(keys.mongoDB.dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log(`MOngoDB connection error: ${err.message}`);
  });

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'frontend/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, (req, res) => {
  console.log(`Server listening on port: ${PORT}`)
});

module.exports = app;

