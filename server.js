'use strict';

// let ejs = require('ejs');
// const pg = require('pg');
// const superagent = require('superagent');
const express = require('express');
const env = require('dotenv').config();
const PORT = process.env.PORT;
// const conString = process.env.DATABASE_URL;
const app = express();
const methodOverride = require('method-override');
const controller = require('./controller');
// const client = new pg.Client(conString);
// client.connect();
// client.on('error', error => {
//   console.log(error);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use(methodOverride(function (req) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/random', controller.getRandom);

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/libs', controller.getLibs);

app.post('/libs', controller.postLibs);

app.get('/libs/new', (req, res, next) => {
  // how do i detect an error in here and pass to next? do I have to?
  res.render('pages/libs/new');
});

app.get('/games', controller.getGames);

//displaying form for user inputs into template
app.get('/libs/:id/games/new', controller.newGame);

app.get('/libs/:id/games', controller.getGamesForOneTemplate);


//entering inputs from form into database and returning id to display filled out template.
app.post('/libs/:id/games', controller.addGame);

app.get('/libs/:id/games/:game_id', controller.showGame);

app.delete('/libs/:id/games/:game_id', controller.deleteGame);

app.delete('/libs/:id', controller.deleteTemplate);

app.get('*', (req, res, next) => {
  const err = new Error(`the route ${req.originalUrl} does not exist.`);
  err.statusCode = 404;
  err.shouldRedirect = true;
  // the next() passes the new error object to our middleware error handler
  next(err);
});

app.listen(PORT, () => {
  console.log(`we are listening on port ${PORT}!`);
});

app.use(controller.errorHandler);
