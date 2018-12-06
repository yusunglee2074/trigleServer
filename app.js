const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema');
const rootValue = require('./rootValue');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// before graphql check things
app.use((req, res, next) => {
  next();
})

let context = {}

// db connection
const dbConfig = {
  dev: {
    name: 'dev',
    host: '10.211.55.5:27017/trigle-dev'
  },
  production: {
    name: 'production',
  }
}
const dbConnection = dbConfig.dev
// const dbConnection = dbConfig.production
mongoose.connect('mongodb://' + dbConnection.host, { useNewUrlParser: true });
if (mongoose.connection.readyState ==! 2) {
  throw Error("DB is not connected");
} else {
  console.log("DB is connected to \"" + dbConnection.name + "\"");
  context = {...context, mongoose }
};

app.use('/graphql', graphqlHTTP((req, res) => ({
  schema,
  rootValue,
  context: {
    ...context,
    request: req
  },
  graphiql: true,
})));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
