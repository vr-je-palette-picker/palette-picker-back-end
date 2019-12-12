# Palette Picker API

### Built By:
[Jeannie Evans](https://github.com/jmevans0211) & [Vanessa Randall](https://github.com/vrandall66)

[Deployed Database](https://vr-je-palette-picker-api.herokuapp.com)

### Installation and Setup

From the command line:

1. `git clone https://github.com/vr-je-palette-picker/palette-picker-back-end <PROJECT_NAME>`
1. Run `npm install`
1. Run `nodemon server.js`

In your browser:
Open localhost://3000/

### Documentation:

[Can be found here](https://github.com/vr-je-palette-picker/palette-picker-back-end/blob/master/README.md)

### Tech Stack

- JavaScript / Node.js
- Express.js
- PostgreSQL
- Knex.js

### Project Management Board

[Can be found here](https://github.com/orgs/vr-je-palette-picker/projects)

### Endpoints

| URL                                                       | Type   | Options                                                                                                                                                                      | Expected response                                                                                                  |
| --------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `api/v1/projects`     | GET    | None                                                                                                                                                                         | ARRAY of all projects currently in the database                                                              |
| `/api/v1/palettes`      | GET    | None                                                                                                                                                                         | ARRAY of all palettes currently in the database                                                               |
| `/api/v1/palettes/:id`      | GET    | None                                                                                                                                                                         | ARRAY of all palettes currently in the project requested by project_id                                                               |
| `/api/v1/project/:id` | GET    | None                                                                                                                                                                         | OBJECT of project requested by project_id                                                                               |
| `/api/v1/palette/:id`  | GET    | None                                                                                                                                                                         | OBJECT of palette requested by palette_id                                                                                |
| `/api/v1/search`  | GET    | `{palette_name: <STRING>}`                                                                                                                                                                         | OBJECT of palette requested by palette_name                                                                                |
| `/api/v1/projects`    | POST   | `{"project_name": <STRING>}`                                                        | Add a new project to the database, an example of a successful response can be found below                            |
| `/api/v1/palettes/:id`     | POST   | `{"palette_name": <STRING>, "project_id": <INTEGER>, "color_1": <STRING>, "color_2": <STRING>, "color_3": <STRING>, "color_4": <STRING>, "color_5": <STRING>}` | Add a new palette to a pre-existing project within the database, an example of a successful response can be found below |
| `/api/v1/projects/:id`    | PATCH   | `{"project_name": <STRING>}`                                                        | Update a pre-existing project's name in the database, an example of a successful response can be found below                            |
| `/api/v1/palette/:id`    | PATCH   | `{"palette_name": <STRING>, "color_1": <STRING>, "color_2": <STRING>, "color_3": <STRING>, "color_4": <STRING>, "color_5": <STRING>}`                                                        | Update a pre-existing palette's name or colors in the database, an example of a successful response can be found below                             |
| `/api/v1/projects/:id` | DELETE | `{"id": <INTEGER>}`                                                                                                                                                     |                                                                              |
| `/api/v1/palette/:id`  | DELETE | `{"id": <INTEGER>}`                                                                                                                                                     |                                                                               |

#### Example of a GET response to /api/v1/projects

  ```json
    {
        "id": 1,
        "project_name": "Portfolio Website",
        "created_at": "2019-12-06T02:59:43.256Z",
        "updated_at": "2019-12-06T02:59:43.256Z"
    },
        {
        "id": 2,
        "project_name": "Nature",
        "created_at": "2019-12-12T04:08:55.672Z",
        "updated_at": "2019-12-12T04:08:55.672Z"
    }
  ```

#### Example of a GET response to /api/v1/palettes
```json
[
    {
        "id": 1,
        "palette_name": "Option 1",
        "color_1": "#192435",
        "color_2": "#678589",
        "color_3": "#77ACA2",
        "color_4": "#EDF3F3",
        "color_5": "#C59563",
        "project_id": 1
    },
    {
        "id": 2,
        "palette_name": "Option 2",
        "color_1": "#D8E2DC",
        "color_2": "#FFE5D9",
        "color_3": "D1A6AE",
        "color_4": "#9D8189",
        "color_5": "#432F32",
        "project_id": 1
    },
        {
        "id": 3,
        "palette_name": "Ocean",
        "color_1": "#020216",
        "color_2": "#00042B",
        "color_3": "#001E64",
        "color_4": "#006CAD",
        "color_5": "#00C0FA",
        "project_id": 2
    },
]
```

#### Example of a GET response to /api/v1/projects/1

  ```json
    {
        "id": 1,
        "project_name": "Portfolio Website",
        "created_at": "2019-12-06T02:59:43.256Z",
        "updated_at": "2019-12-06T02:59:43.256Z"
    }
  ```

#### Example of a GET response to /api/v1/palettes/1

```json
[
    {
        "id": 1,
        "palette_name": "Option 1",
        "color_1": "#192435",
        "color_2": "#678589",
        "color_3": "#77ACA2",
        "color_4": "#EDF3F3",
        "color_5": "#C59563",
        "project_id": 1
    },
    {
        "id": 2,
        "palette_name": "Option 2",
        "color_1": "#D8E2DC",
        "color_2": "#FFE5D9",
        "color_3": "D1A6AE",
        "color_4": "#9D8189",
        "color_5": "#432F32",
        "project_id": 1
    }
  ```
  
  #### Example of a GET response to /api/v1/palette/3
  
  ```json
          {
        "id": 3,
        "palette_name": "Ocean",
        "color_1": "#020216",
        "color_2": "#00042B",
        "color_3": "#001E64",
        "color_4": "#006CAD",
        "color_5": "#00C0FA",
        "project_id": 2
    }
  ```
  
  #### Example of a GET response to /api/v1/search/?palette_name=Ocean
  ```json
  {
    "searchResults": [
        {
            "id": 26,
            "palette_name": "Ocean",
            "color_1": "#020216",
            "color_2": "#00042B",
            "color_3": "#001E64",
            "color_4": "#006CAD",
            "color_5": "#00C0FA",
            "project_id": 78
        }
    ]
}
```

#### Example of a POST response to /api/v1/projects

```json
{
    "id": 6
}
```

#### Example of a POST response to /api/v1/palettes/6
```json
{
    "id": 26
}
```

#### Example of a PATCH response to /api/v1/projects/6

```json
{
    "project": 1
}
```

#### Example of a PATCH response to /api/v1/palette/26
```json
{
    "id": 26
}
```
