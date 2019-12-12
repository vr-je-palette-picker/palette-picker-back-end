const request = require('supertest');
const app = require('./app');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

describe('Server', () => {
  beforeEach(async () => {
    await database.seed.run();
  });

  describe('init', () => {
    it('should return a 200 status code', async () => {
      const res = await request(app).get('/');

      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/v1/projects', () => {
    it('should return a 200 status code and all of the projects', async () => {
      const expectedProjects = await database('projects').select();

      const response = await request(app).get('/api/v1/projects');
      const projects = response.body;

      expect(response.status).toBe(200);
      expect(projects[0].project_name).toEqual(
        expectedProjects[0].project_name
      );
    });
  });

  describe('GET /api/v1/palettes', () => {
    it('should return a 200 status code and all of the palettes', async () => {
      const expectedPalettes = await database('palettes').select();

      const response = await request(app).get('/api/v1/palettes');
      const palettes = response.body;
      expect(response.status).toBe(200);
      expect(palettes[0].palette_name).toEqual(
        expectedPalettes[0].palette_name
      );
    });
  });

  describe('GET /api/v1/projects/:id', () => {
    it('should return a 200 status code and the project with the matching id', async () => {
      const expectedProject = await database('projects').first();
      const { id } = expectedProject;

      const response = await request(app).get(`/api/v1/projects/${id}`);
      const project = response.body[0];

      expect(response.status).toBe(200);
      expect(project.project_name).toEqual(expectedProject.project_name);
    });

    it('should return a 404 and the message "Project not found"', async () => {
      const invalidId = -1;

      const response = await request(app).get(`/api/v1/projects/${invalidId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Project not found');
    });
  });

  describe('GET /api/v1/palettes/:id', () => {
    it('should return a status code of 200 and get all palettes with a specific project id', async () => {
      const expectedProject = await database('projects').first();
      const { id } = expectedProject;

      const response = await request(app).get(`/api/v1/palettes/${id}`);
      const expectedPalettes = await database('palettes')
        .where('project_id', id)
        .select();
      const { palette_name, color_4 } = response.body[0];

      expect(response.status).toBe(200);
      expect(palette_name).toEqual(expectedPalettes[0].palette_name);
      expect(color_4).toEqual(expectedPalettes[0].color_4);
    });

    it('should return a 404 status code and the message `No palettes found for this project.`', async () => {
      const invalidId = -1;

      const response = await request(app).get(`/api/v1/palettes/${invalidId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('No palettes found for this project');
    });
  });

  describe('GET /api/v1/palette/:id', () => {
    it('should return a 200 status code and the palette with the matching id', async () => {
      const expectedPalette = await database('palettes').first();
      const { id } = expectedPalette;

      const response = await request(app).get(`/api/v1/palette/${id}`);
      const palette = response.body[0];

      expect(response.status).toBe(200);
      expect(palette.palette_name).toBe(expectedPalette.palette_name);
    });

    it('should return a 404 status code and the message `Palette not found.`', async () => {
      const invalidId = -1;

      const response = await request(app).get(`/api/v1/palette/${invalidId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Palette not found');
    });
  });

  describe('POST /api/v1/projects', () => {
    it('should return a 201 status code and add a new project to the database', async () => {
      const newProject = { project_name: 'Drag Nation' };

      const response = await request(app)
        .post('/api/v1/projects')
        .send(newProject);
      const projects = await database('projects')
        .where('id', response.body.id)
        .select();
      const project = projects[0];

      expect(response.status).toBe(201);
      expect(project.project_name).toBe(newProject.project_name);
    });

    it('should return a 422 status code upon receving incorrect information from client', async () => {
      const newProject = { projectname: 'Zippity Do Dah' };

      const response = await request(app)
        .post('/api/v1/projects')
        .send(newProject);

      expect(response.status).toBe(422);
    });
  });

  describe('POST /api/v1/palettes/:id', () => {
    it('should return a 201 status code and add a new palette to the database', async () => {
      const selected = await database('projects').first();
      const { id } = selected;
      const newPalette = {
        palette_name: 'Basement Living',
        color_1: '#3D3935',
        color_2: '#009DDC',
        color_3: '#F26430',
        color_4: '#F1F1F1',
        color_5: '#009B72',
        project_id: `${id}`
      };
      const response = await request(app)
        .post(`/api/v1/palettes/${id}`)
        .send(newPalette);
      const palette = await database('palettes')
        .where({ palette_name: 'Basement Living' })
        .first();

      expect(response.status).toBe(201);
      expect(palette.palette_name).toBe(newPalette.palette_name);
    });

    it('should return a 422 status code and an error message', async () => {
      const selected = await database('projects').first();
      const { id } = selected;
      const incompletePalette = {
        color_1: '#3D3935',
        color_2: '#009DDC',
        color_3: '#F26430',
        color_4: '#F1F1F1',
        color_5: '#009B72'
      };
      const response = await request(app)
        .post(`/api/v1/palettes/${id}`)
        .send(incompletePalette);

      expect(response.status).toBe(422);
      expect(response.body.error).toEqual(
        'POST failed, missing required parameters: palette_name, project_id, color_1, color_2, color_3, color_4, color_5. Missing: palette_name'
      );
    });
  });

  describe('PATCH /api/v1/projects/:id', () => {
    it('should return a 200 status code and update the project name', async () => {
      const expectedProject = await database('projects').where(
        'project_name',
        'Nature'
      );
      const { id } = expectedProject[0];

      const updatedProject = { project_name: 'Tea and Crumpets' };

      const response = await request(app)
        .patch(`/api/v1/projects/${id}`)
        .send(updatedProject);
      const projects = await database('projects').where('id', id);
      const project = projects[0];

      expect(response.status).toBe(200);
      expect(project.project_name).toBe(updatedProject.project_name);
    });

    it('should return a 422 status code and an error message', async () => {
      const expectedProject = await database('projects').where(
        'project_name',
        'Nature'
      );
      const newName = { projectName: 'Biscuits and Gravy' };

      const response = await request(app)
        .patch(`/api/v1/projects/${expectedProject[0].id}`)
        .send(newName);

      expect(response.status).toBe(422);
      expect(response.body.error).toBe(
        'PATCH failed, missing required key: project_name'
      );
    });

    it('should return a 404 status code and an error message', async () => {
      const updatedProject = { project_name: 'Tea and Crumpets' };
      const response = await request(app)
        .patch('/api/v1/projects/-1')
        .send(updatedProject);
      const expectedMessage = 'This project does not exist';

      expect(response.status).toBe(404);
      expect(response.body.error).toBe(expectedMessage);
    });
  });

  describe('PATCH /api/v1/palette/:id', () => {
    it('should return a 202 status code and update the project param passed in', async () => {
      const expectedPalette = await database('palettes').where(
        'palette_name',
        'Ocean'
      );
      const newInfo = {
        palette_name: 'Fresh Fall'
      };
      const response = await request(app)
        .patch(`/api/v1/palette/${expectedPalette[0].id}`)
        .send(newInfo);
      const updatedPalette = await database('palettes').where(
        'palette_name',
        'Fresh Fall'
      );
      expect(updatedPalette[0].palette_name).toBe('Fresh Fall');
      expect(response.status).toBe(202);
    });

    it('should return a 422 status code and an error message', async () => {
      const expectedPalette = await database('palettes').first();
      const newPaletteName = { paletteName: 'Kitchen Walls' };

      const response = await request(app)
        .patch(`/api/v1/palette/${expectedPalette.id}`)
        .send(newPaletteName);

      expect(response.status).toBe(422);
      expect(response.body.error).toBe('PATCH failed, missing required key');
    });

    it('should return a 404 status code and error message', async () => {
      const invalidId = -1;

      const response = await request(app).patch(`/api/v1/palette/${invalidId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('This palette does not exist');
    });
  });

  describe('DELETE /api/v1/projects/:id', () => {
    it('should return a 200 status code and remove project from database', async () => {
      const currentProjects = await database('projects').select();
      const projectToDelete = await database('projects').first();

      const response = await request(app).delete(
        `/api/v1/projects/${projectToDelete.id}`
      );
      const updatedProjects = await database('projects').select();
      const updatedPalettes = await database('palettes').where(
        'project_id',
        projectToDelete.id
      );

      expect(response.status).toBe(200);
      expect(updatedProjects.length).toBe(currentProjects.length - 1);
      expect(updatedPalettes.length).toBe(0);
    });

    it('should return a 404 status code and an error message when there is no project found', async () => {
      const response = await request(app).delete('/api/v1/projects/-1');
      const expectedMessage = 'No project found';

      expect(response.status).toBe(404);
      expect(response.body.error).toBe(expectedMessage);
    });
  });

  describe('DELETE /api/v1/palette/:id', () => {
    it('should return a 200 status code and remove the palette from the project and the database', async () => {
      const currentPalettes = await database('palettes').select();
      const paletteToDelete = await database('palettes').first();

      const response = await request(app).delete(
        `/api/v1/palette/${paletteToDelete.id}`
      );
      const updatedPalettes = await database('palettes').select();

      expect(response.status).toBe(200);
      expect(updatedPalettes.length).toBe(currentPalettes.length - 1);
    });

    it('should return a 404 status code and an error message when there is no palette found', async () => {
      const response = await request(app).delete('/api/v1/palette/-1');
      const expectedMessage = 'No palette with this id can be found';

      expect(response.status).toBe(404);
      expect(response.body.error).toBe(expectedMessage);
    });
  });
});
