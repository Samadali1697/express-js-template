# express-js-template
template project for express js


## How to run the app
- Install docker desktop
- Instal node (project build with v22.8.0)
- Run following commands

```
npm install

make build

make up
```

## Endpoints
1. Person

   **GET** `/api/person?name=alice` - Returns specific person

   **POST** `/api/person` body `{"id":3,"name":"john","address":"Berlin, Germany","isMarried":true}` - Adds new person

   **DELETE** `/api/person/1` - Deletes person id 1

## Testing
### Get Record
Run below curl to insert person
```
curl -i -X GET -H 'Content-Type: application/json' http://localhost:4000/api/person?name=alice
```
### Insert Record
Run below curl to insert person
```
curl -i -X POST -H 'Content-Type: application/json' -d '{"name":"alice","address":"Berlin, Germany","isMarried":true}' http://localhost:4000/api/person
```
### Delete Record
Run below curl to delete person by id
```
curl -i -X DELETE -H 'Content-Type: application/json' http://localhost:4000/api/person/4
```
