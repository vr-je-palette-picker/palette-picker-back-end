const data = require('../../../data/data');

const createProject = (knex, project) => {
  return knex('projects')
    .insert(
      {
        project_name: project.project_name
      },
      'id'
    )
    .then(project_id => {
      let palettePromises = [];

      data.palettes.forEach(palette => {
        palettePromises.push(
          createPalette(knex, {
            palette_name: palette.palette_name,
            color_1: palette.color_1,
            color_2: palette.color_2,
            color_3: palette.color_3,
            color_4: palette.color_4,
            color_5: palette.color_5,
            project_id: project_id[0]
          })
        );
      });

      return Promise.all(palettePromises);
    });
};

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette);
};

exports.seed = knex => {
  return knex('palettes')
    .del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = [];

      data.projects.forEach(project => {
        projectPromises.push(createProject(knex, project));
      });

      return Promise.all(projectPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
