const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema');

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
mongoose.connect('mongodb://' + dbConnection.host, { useNewUrlParser: true }, (e) => {
  if (!e) console.log("DB is connected to \"" + dbConnection.name + "\"");
  else console.log("DB is not connected\n" + e);
});

let context = {}

app.use('/graphql', graphqlHTTP((req, res) => {
  console.log(req)
  return ({
    schema,
    //rootValue,
    context: {
      ...context,
      req
    },
    graphiql: true,
  });
}));

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
