# express-js-template
template project for express js


## How to run the app
- Install docker desktop
- Instal node (project build with v22.8.0)
- Run following commands

```
make build
make up
```

## Endpoints
1. Person
   *GET* `/api/person?name=alice` - Returns specific person
   *POST* `/api/person` body `{"id":3,"name":"john","address":"Berlin, Germany","isMarried":true}` - Adds new person
   *DELETE* `/api/person/1` - Deletes person id 1