/****
 * server using express.js for the smart brain react application
 */
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// create db connection to postgresql using knex api
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'smartbrain'
  }
});

db.select('*').from('users').then(data => {
  console.log(data);
});

// use express, use json
const app = express();
app.use(express.json());
app.use(cors());

// post sign user in method
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt); });

// post register user method
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); });

// get user method based on id
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db); });

// put update user entries when adding a new image
app.put('/image', (req, res) => { image.handleImage(req, res, db); });

// post to imageurl to handle api call
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res); });

// start the server listening on port 3000
app.listen(3000, () => {
  console.log('app is running on port 3000');
});
