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
  response.json(`Let's make the world more colorful!`);
});

app.get('/api/v1/projects', async (request, response) => {
  try {
    const projects = await database('projects').select();
    if (projects.length) {
      response.status(200).json(projects);
    } else {
      response.status(404).json({ error: 'Could not get palettes' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/v1/palettes', async (request, response) => {
  try {
    const palettes = await database('palettes').select();
    if (palettes.length) {
      response.status(200).json(palettes);
    } else {
      response.status(404).status({ error: 'Could not get palettes'})
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/api/v1/projects/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const project = await database('projects').where({ id });
    if (project.length) {
      response.status(200).json(project);
    } else {
      response.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/v1/palettes/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const projectPalettes = await database('palettes')
      .where('project_id', id)
      .select();
    if (projectPalettes.length) {
      response.status(200).json(projectPalettes);
    } else {
      response
        .status(404)
        .json({ error: 'No palettes found for this project' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/v1/palette/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const palette = await database('palettes').where({ id });
    if (palette.length) {
      response.status(200).json(palette);
    } else {
      response.status(404).json({ error: 'Palette not found' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

app.get(`/api/v1/search`, async (request, response) => {
  try {
    const palette_name = request.query.palette_name
    const palettes = await database('palettes').select();
    const searchResults = palettes.filter(result => {
      return result.palette_name == palette_name
    })

    if (!searchResults) {
      response.status(404).json(`No palettes with ${palette_name} can be found. Please try again.`)
    } else {
      response.status(200).json({ searchResults })
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' })
  }
});

app.post('/api/v1/projects', async (request, response) => {
  const project = request.body;

  if (!project.project_name) {
    return response
      .status(422)
      .send({ error: 'POST failed, missing required key: project_name' });
  }

  try {
    const newProject = await database('projects').insert(project, 'id');
    response.status(201).json({ id: newProject[0] });
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/palettes/:id', async (request, response) => {
  const palette = request.body;
  const parameters = [
    'palette_name',
    'project_id',
    'color_1',
    'color_2',
    'color_3',
    'color_4',
    'color_5'
  ];

  for (let requiredParameter of parameters) {
    if (!palette[requiredParameter]) {
      response.status(422).json({
        error: `POST failed, missing required parameters: ${parameters.join(
          ', '
        )}. Missing: ${requiredParameter}`
      });
      return;
    }
  }

  try {
    const newPalette = await database('palettes').insert(palette, 'id');
    response.status(201).json({ id: newPalette[0] });
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/v1/projects/:id', async (request, response) => {
  const { project_name } = request.body;
  const { id } = request.params;

  if (!project_name) {
    return response
      .status(422)
      .send({ error: 'PATCH failed, missing required key: project_name' });
  }

  try {
    const project = await database('projects')
      .where({ id })
      .update({ project_name });

    if (project) {
      return response.status(200).json({ project });
    } else {
      return response
        .status(404)
        .json({ error: 'This project does not exist' });
    }
  } catch (error) {
    response.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/v1/palette/:id', async (request, response) => {
  const { id } = request.params;

  const parameters = [
    'palette_name',
    'project_id',
    'color_1',
    'color_2',
    'color_3',
    'color_4',
    'color_5'
  ];

  try {
    const patchedPalette = await database('palettes').where('id', id);
    const truthy = patchedPalette.length ? true : false;
    if (!truthy) {
      return response
        .status(404)
        .json({ error: `This palette does not exist` });
    }
    for (let param of parameters) {
      if (request.body[param] && truthy) {
        await database('palettes')
          .where('id', id)
          .update(param, request.body[param]);
        return response.status(202).json({ id: patchedPalette[0].id });
      }
    }
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.delete('/api/v1/projects/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const project = await database('projects').where('id', id).del();

    if (project > 0) {
      return response.status(200).json()
    } else {
      response.status(404).json({ error: 'No project found' })
    }
  } catch (error) {
    response.status(500).json(error)
  }
});

app.delete('/api/v1/palette/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const palette = await database('palettes')
      .where('id', id)
      .del();

    if (palette > 0) {
      return response.status(200).json();
    } else {
      response
        .status(404)
        .json({ error: 'No palette with this id can be found' });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = app;
