const express = require('express');
const cors = require('cors');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.locals.title = 'Palette Picker';
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send(`Let's make the world more colorful!`);
});


// get - projects

// get - projects:id

// get - projects/:id/pallets

// get - projects/:id/pallets/:id

module.exports = app;
