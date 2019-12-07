# Palette Picker API

**Contributors:** Jeannie Evans & Vanessa Randall

This is an API to get the countries and their happiness ranking.

*heroku link*

***

### Endpoints

i. GET all projects

ii. GET a single project

iii. GET all palettes for a single project

iv. GET a single palette

v. POST a new project

vi. POST a new palette

vii. PATCH a project

viii. PATCH a palette

iix. DELETE a project

ix. DELETE a palette

***

## GET all projects

This endpoint will get all project info.

`'/api/v1/projects'`

### Response

<table>
  <tr>
    <th>Status</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>200</td>
    <td>returns all projects</td>
  </tr>
</table>

### Response Parameters

<table style="width:100%">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>integer</td>
    <td>unique id for each individual continent</td>
  </tr>
  <tr>
    <td>project</td>
    <td>string</td>
    <td>project name</td>
</table>
<details>
  <summary>Example Response</summary>

```javascript
[
    {
        "id": 1,
        "project_name": "Portfolio Website",
        "created_at": "2019-12-06T02:59:43.256Z",
        "updated_at": "2019-12-06T02:59:43.256Z"
    },
    {
        "id": 2,
        "project_name": "Nature",
        "created_at": "2019-12-06T02:59:43.266Z",
        "updated_at": "2019-12-06T02:59:43.266Z"
    }
]
```
</details>

***

## GET a single project

This endpoint will get a single project.

`'/api/v1/projects/:id'`

### Query Parameters
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>integer</td>
    <td>unique id</td>
  </tr>
</table>

### Response
<table>
  <tr>
    <th>Status</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>200</td>
    <td>404</td>
  </tr>
    <tr>
    <td>returns that single project</td>
    <td>returns "Project not found"</td>
  </tr>
</table>

### Response Parameters

<table style="width:100%">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>integer</td>
    <td>unique id for each individual project</td>
  </tr>
  <tr>
    <td>project</td>
    <td>string</td>
    <td>project name</td>
  </tr>
</table>

<details>
  <summary>Example Response</summary>
  
  ```javascript
    {
        "id": 1,
        "project_name": "Portfolio Website",
        "created_at": "2019-12-06T02:59:43.256Z",
        "updated_at": "2019-12-06T02:59:43.256Z"
    }
  ```
</details

***

## GET all palettes for a single project

This endpoint will get all palettes for a single project.

`'/api/v1/palettes/:id'`

### Response

<table>
  <tr>
    <th>Status</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>200</td>
    <td>returns all palettes from a specific project</td>
  </tr>
</table>

### Response Parameters

<table style="width:100%">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>integer</td>
    <td>unique id for each individual </td>
  </tr>
  <tr>
    <td>palette_name</td>
    <td>string</td>
    <td>palette name</td>
  </tr>
  <tr>
    <td>color_1</td>
    <td>string</td>
    <td>first color in color palette</td>
  </tr>
  <tr>
    <td>color_2</td>
    <td>string</td>
    <td>second color in color palette</td>
  </tr>
    <tr>
    <td>color_3</td>
    <td>string</td>
    <td>third color in color palette</td>
  </tr>
  <tr>
    <td>color_4</td>
    <td>string</td>
    <td>forth color in color palette</td>
  </tr>
  <tr>
    <td>color_5</td>
    <td>string</td>
    <td>fifth color in color palette</td>
  </tr>
  <tr>
    <td>project_id</td>
    <td>integer</td>
    <td>id of project palette belongs to (foreign key)</td>
  </tr>
</table>

<details>
  <summary>(Part of an)Example Response</summary>
  
```javascript
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
]
```
</details>
  
***

## GET a single country
This endpoint will get a single country.

`'/api/v1/countries/:id'`

### Query Parameters
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>integer</td>
    <td>unique id</td>
  </tr>
</table>

### Response
<table>
  <tr>
    <th>Status</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>200</td>
    <td>404</td>
  </tr>
    <tr>
    <td>returns that single country</td>
    <td>returns "Could not find country with an id of [id]"</td>
  </tr>
</table>

### Response Parameters

<table style="width:100%">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>integer</td>
    <td>unique id for each individual continent</td>
  </tr>
  <tr>
    <td>country</td>
    <td>string</td>
    <td>country name</td>
  </tr>
    <tr>
    <td>happiness_score</td>
    <td>integer</td>
    <td>happiness score for that country out of 10</td>
  </tr>
</table>

<details>
  <summary>Example Response</summary>
  
  ```javascript
    {
        "id": 459,
        "country": "Kazakhstan",
        "happiness_score": 5,
        "continent_id": 83,
        "created_at": "2019-11-21T18:31:13.273Z",
        "updated_at": "2019-11-21T18:31:13.273Z"
    }
  ```
</details

***

## POST a new continent

`/api/v1/continents`

### Parameters

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>continent</td>
    <td>string</td>
    <td>continent name</td>
  </tr>
  <tr>
    <td>land_area</td>
    <td>integer</td>
    <td>the land area in miles squared</td>
  </tr>
</table>

### Response

<table>
  <tr>
    <th>200</th>
    <th>422</th>
  </tr>
  <tr>
    <td>Returns the id of the new continent</td>
    <td>`error: Expected format: { continent: <String>, land_area: <Integer>}. You're missing a ${requiredParameter} property.`</td>
  </tr>
</table>
  
<details>
  <summary>Example</summary>
  
  `{ "id": 91 }`
  
</details>

***

## POST a new country

`/api/v1/countries`

### Parameters

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>country</td>
    <td>string</td>
    <td>country name</td>
  </tr>
  <tr>
    <td>happiness_score</td>
    <td>integer</td>
    <td>the country happiness score</td>
  </tr>
</table>

### Response

<table>
  <tr>
    <th>200</th>
    <th>422</th>
  </tr>
  <tr>
    <td>Returns the id of the new country</td>
    <td>`error: Expected format: { country: <String>, happiness_sore: <Integer>}. You're missing a ${requiredParameter} property.`</td>
  </tr>
</table>
  
<details>
  <summary>Example</summary>
  
  `{ "id": 549 }`
  
</details>

***

## DELETE an existing country

`/api/v1/countries/:id`

<table>
  <tr>
    <th>Status</th>
    <th>Response</th>
  </tr>
  <tr>
    <td>200</td>
    <td>'Country was deleted with success.'</td>
  </tr>
    <tr>
    <td>404</td>
    <td>`Could not find country with the id of ${id}.`</td>
  </tr>
</table>
