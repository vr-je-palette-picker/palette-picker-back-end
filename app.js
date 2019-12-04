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

app.get('/api/v1/projects', async (request, response) => {
  try {
    const projects = await database('projects').select();
    if (projects.length) {
      response.status(200).json(projects)
    } else {
      response.status(404).json({ error: 'Projects not found' })
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
})


// get - projects

// get - projects:id

// get - projects/:id/pallets

// get - projects/:id/pallets/:id

module.exports = app;
