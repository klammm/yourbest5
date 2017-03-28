# YourBest5(+highlights)

_**Version 1.0.0**_

_3/24/2017_

### Description:

YourBest5(+highlights) is a sole back-end web application targeted towards NBA fans and enthusiasts.

**Features:**
 - A user dashboard that shows users their team(s).
 - Users can create their team with 5 NBA players if the players are available in our database.
 - If a player isn't available, the user can add a player with their career stats.
 - Upon selecting 5 players, our app will generate a total number indicating the total points the current team will score.

#### Getting started

1. `npm install`
2. `createdb nba_dev`
3. `knex migrate:latest`
4. `knex seed:run`

#### Tools used:
- Swagger
- Express
- Body-Parser
- Knex
- PostGresQL
- Morgan
- Node-fetch
- Youtube-API
- Supertest
- Mocha & Chai


#### Things to note:

- Shaq video highlights are not working.
- Some updates will mess with some posts. There might be a bug somewhere from making many commands to post, put, get, delete.

## Swagger generated server

##### Overview


#### Running the server
To run the server, run:

```
npm start
```

### API Endpoints:

```
open https://yourbest5.herokuapp.com/dist/swagger.yaml
```



### How to conribute:
1. Check the "Issues" tab
2. Fork and clone this repo
3. Write some awesome `code()`!!
4. Make a pull request to this repo("smokymcbear/yourbest5")
5. We'll look over the pull request and merge it if it looks good(please don't break our code).
6. Celebrate🎉😎!!! We'll add you in as a contributor if you have enough awesome pull merged requests.

___

##### Contributors:
  - Kevin Lam
  - Gurdip Singh
