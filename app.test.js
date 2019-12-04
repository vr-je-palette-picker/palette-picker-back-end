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
      expect(projects).toEqual(expectedProjects)
    });
  });

    describe('GET /api/v1/projects/:id', () => {
      it('should return a 200 status code and the project with the matching id', async () => {
        const expectedProject = await database('projects').first();
        const { id } = expectedProject;

        const response = await request(app).get(`/api/v1/projects/${id}`);
        const project = response.body[0];

        expect(response.status).toBe(200);
        expect(project).toEqual(expectedProject);
      });

      it('should return a 404 and the message "Project not found"', async () => {
        const invalidId = -1;
        
        const response = await request(app).get(`/api/v1/projects/${invalidId}`)

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Project not found');
      });
    });

    describe('POST /api/v1/projects', () => {
      it('should return a 201 status code and add a new project to the database', async () => {
        const newProject = { project_name: 'Drag Nation' };

        const response = await request(app).post('/api/v1/projects').send(newProject);
        const projects = await database('projects').where('id', response.body.id).select();
        const project = projects[0];

        expect(response.status).toBe(201);
        expect(project.project_name).toBe(newProject.project_name);
      });

      it('should return a 422 status code upon receving incorrect information from client', async () => {
        const newProject = { projectname: 'Zippity Do Dah' };

        const response = await request(app).post('/api/v1/projects').send(newProject);

        expect(response.status).toBe(422);
      });
    });
});
