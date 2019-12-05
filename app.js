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
});

app.get('/api/v1/projects/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const project = await database('projects').where({ id });
    if (project.length) {
      response.status(200).json(project);
    } else {
      response.status(404).json({ error: 'Project not found' })
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
});


// get - pallets/:id/
  // getting all pallets on a single project

// get - pallet/:id
  // getting a single pallet

app.post('/api/v1/projects', async (request, response) => {
  const project = request.body;

  if (!project.project_name) {
    return response.status(422).send({ error: 'POST failed, missing required key: project_name' });
  }

  try {
    const newProject = await database('projects').insert(project, 'id')
    response.status(201).json({ id: newProject[0] })
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
});

// post - api/v1/pallets
  // making a new pallet (for a project)

app.patch('/api/v1/projects/:id', async (request, response) => {
  const { project_name } = request.body;
  const { id } = request.params;

  if (!project_name) {
    return response.status(422).send({ error: 'PATCH failed, missing required key: project_name' });
  }

  try {
    const project = await database('projects').where({ id }).update({ project_name })
    
    if (project) {
      return response.status(200).json({ project })
    } else {
      return response.status(404).json({ error: 'This project does not exist' })
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error '})
  }
});

// patch - /api/v1/pallet/:id
  // change info on a single pallet
    // possible changes: pallet_name, color_1, color_2, color_3, color_4, color_5

// delete - /api/projects/:id
  // delete project (CASCADE to delete all pallets)

// delete - /api/pallet/:id
  // delete a pallet from a project


module.exports = app;


