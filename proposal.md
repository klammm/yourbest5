# Galvanize Q2 Group Project Proposal

* This proposal is for a fullstack app, eventhough you will actually only build the serverside portion of it.
* 1 member from your team will need to fork this repo and update this README file with your proposal.
* Make sure to preview your proposal in a markdown preview and [use valid markdown syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax/)
  * Unformatted/unreadable proposals will be rejected
* Create a Pull Request against this repo with your own repo.

## Team Name

# *Kevin's #1 Fans*

## Group Members

Klam, General Deep

## Project/Application Name

Your Best 5(+weather)

## Project Description


Our application will allows us to channel our inner NBA fan by comparing different starting NBA lineups, filling each of the starting 5 positions with various combinations of players available within our database. If a player isn’t available for a user to use in their respective line ups, then they can insert and post that player to our data base with specific input that we will specify within the POST request query string. The expected input to insert a new player into our database will include  the following:

1. Points per game(ppg)
2. Assists per game(apg)
3. Field Goal Percentage(fgp)
4. Free throw Percentage(ftp)
5. Three point Percentage(ttp)
6. Rebounds per game(rpg)
7. Blocks per game(bpg)
8. Steals per game(stp)
9. Turnovers per game(tpg)

Upon receiving this input, our algorithm will calculate the +/- for a specific player and also calculate his +/- compared with the 4 other players he’s in the lineup. That in a nutshell is our MVP. Calculate the +/- for a single player and calculate his +/- along with the other 4 players in the lineup.

In addition, since our app is a fan based theme created around the dashboard, we will also include weather for the day in your area using geo location in as an MVP and our stretch goal will include the day in history. The day in history will include interesting things that took place on the particular calendar date. For example, what happened on March 17 in politics, sports, science, births, etc. That is our app, hence the name your best 5 (+weather).

## Who uses it? (from the point of view of end users of your fullstack app)

Sports Enthusiasts, basketball nerds, fantasy players, possible sports investors, NBA scouts, and high school teenagers not *paying attention* in class.


## What outputs do they need? (from the point of view of end users of your fullstack app)


* User's NBA line-up in the form of json
* User's NBA player followed with stats in the form of json
* User's weather in the form of json
* User's Flickr photo url in the form of a string




## What inputs are needed to generate those outputs? (from the point of view of end users of your fullstack app)


Because the bulk of our input is going to be from API endpoints, the types of input we expect are string and integer inputs at most.

* specific routes in the url
  * Ex: `yourbest5.io/ROUTES/:TEAM_NAME`
* query string following the endpoint




##### POST:

Full NBA stats for the specific player being posted. The user will have to specify within their query string the following:

1. Points per game(ppg)
2. Assists per game(apg)
3. Field Goal Percentage(fgp)
4. Free throw Percentage(ftp)
5. Three point Percentage(tpp)
6. Rebounds per game(rpg)
7. Blocks per game(bpg)
8. Steals per game(spg)
9. Turnovers per game(tpg)

Example:

/router/new?name='stephencurry'&ppg=50.4&apg=

## What technologies do you plan to use? (server-side only)
* List libraries/frameworks you plan to use

* Swagger
* Express
* Body-Parser
* Cookie-Parser
* Bcrypt
* Knex
* PostgresQl
* JWT
* Morgan
* Supertest
* Bookshelf ORM


## Feature list (both server side and client side)
* List all features in priority order (including stretch features)

* Compare +/- per team
* Allow users to add NBA Players with their following stats into the database
* **Being able to signup and login**
* **OAuth authentication with Facebook**
* Displays weather on your dashboard
* Using Flickr API, we search and save the user-posted NBA Player

#### Stretch:


* Displays significant events in history on a specific day
* Get images from Flickr API to allow users to customize their profile picture
* Scoring system for users that contribute to the NBA Players database and also for those who win matchups
* In terms of lineup, we can have an "Anything Goes" version where players do not have to fit into the specified position.
  * Ex: `{PG: Shaquille O'Neal}` although `{name: Shaquille O'Neal, position: C, ppg: 26.8, ...}`


## End User wireframes. (Client side view of your app, which you won't be implimenting in Q2)
* This is to inform us and you of how someone may use your api to fill a need. This will also drive your user stories for the backend api.
* Include pictures of wireframes that you've drawn or you've made using a program, in this repo.

### Dashboard:

![dashboard](/images/dashboard.png)

### Login:

![login](/images/login.png)

### Signup:

![login](/images/signup.png)

### Insert NBA Player page:

![insert nba player](/images/insert.png)

## Entity Relationship Diagrams (Server side)
* Include pictures of the diagrams that you've drawn or you've made using a program, in this repo.

##### MVP:


Because one player can only have one stat and only one position at a time, our entity relationship diagram mainly consists of one database table which is our primary database table.

##### Stretch:

As a stretch goal, we can incorporate which teams players were in and perhaps which specific season we want to draw from. This would require separate tables for which we will have a higher degree of relationships between tables.
![entity relationship diagram](/images/erd.jpg)

## User Stories for completing the serverside.
* Use a tracking software like trello or gihub issues.
* Should include all API end points as well details on the input and output to these endpoints

### User Stories:
1. As a user, I can sign up using email.
2. As a user, I can sign up and login using Facebook through OAuth.
3. As a user, I can check if the NBA player I am requesting exists in the database.
4. As a user, I can insert NBA players that do not exist in the database.
5. As a user, I can add 5 players per team and compare the better overall team.
6. As a user, I can remove/update a player from a specific position.
7. As a user, I can save a team on my profile.
8. As a user, I can delete teams from my profile.
9. As a user, I can find the photo of the NBA player through Flickr.


### Tasks:
For the respective user stories 1, 2, 3, etc...

1. Referring to the Signup wireframe and after validation of a user's email, password, and full name, the "SUBMIT" button will send an HTTP request which will send the user's information into our Postgres Database, specifically the `users` table.
2. Referring to the Login wireframe, we will incorporate Facebook OAuth by following Facebook's OAuth documentation along with implementing our own server handle in receiving HTTP requests from the client and from the 3rd party. Placing the respective `client_id` and `client_secret` along with using `Passport.js` to fully implement OAuth.
3. Referring to the API Endpoints with the specific GET request required to retrieve the user-specified NBA player from our Postgres database, the user must provide the endpoint and the correct `params` for the NBA player requested. By cross-referencing with our Postgres database using `knex(players)` to see if the specified player entry is `null` or `undefined`, we will either return the requested NBA player in JSON format or return a "Requested player does not exist" string.
4. Referring to the API Endpoints with the specific POST request required, the user must insert into the query parameter: each and every statistic, name, and position. Upon submission, we will be using the similar logic with the GET request of checking if the NBA player exists or not in the database. If the player exists already, we will prompt the user with a "Player exists already". If not, we will `knex(players).insert()` the request.
5. Referring to the API Endpoint with the GET request for a roster's +/- and referring to the API Endpoint with the POST request to add a player to their roster, our application will have the user making separate requests to first insert players into their roster with a POST request using the `knex(teams).insert()` for the specific `user_id` then with a GET request to check an overall team's +/- using our algorithm of calculating a teams +/- .
6. To remove a player is to rather place a player in their place since we will not allow the user to place more than 5 players into their requested team, therefore referring to the API Endpoint for the PUT request, we will be using `knex(team).where().delete` followed up with `knex(team).where().insert()`.
7. Referring to the API Endpoint for the POST request, I can add a team to my profile by creating a team name using `knex(team).where().insert()`.
8. Referring to the API Endpoint for the DELETE request, I can delete a team within my profile using `knex(team).where().del()`.
9. Referring to the API Endpoint for the GET request, I can find the Flickr photo of the NBA player that I am requesting using `knex(player).where(image)`.


### API Endpoints:

___

#### GET:

___

###### User Roster:
* /:userid/roster
  * the user's roster


* /:userid/roster/:team
  * specific team within a user's roster


###### All-NBA:

* /nba
  * all players with their respective stats and positions within the database


* /nba/:playerId
  * specific player within the database

* /nba/:playerId/image
  * player's image within the database

* /nba/:stat
  * rankings for a certain stat


* /nba/:position
  * rankings for a certain position


###### +/- :
* /:userid/roster/:team/result
  * the user's entire team +/-


* /:userid/roster/:team/:position/result
  * the player's specific +/- within the user's team

___

#### POST:
___

###### User Roster:

* /:userid/roster/:team/:position
  * adds one player to the user's roster based on player ID
  * query:
    * integer parameter. Ex: `api/path/:position?id=12`

* /:userid/roster {REQ BODY JSON}
  * user creates a new team for their roster

###### All-NBA:


* /nba/new {REQ BODY JSON}
  * user creates new player within the database
  * if the player exists already, the user will be prompted with a string "Already Exists"



* /nba/:playerid/image {REQ STRING}
  * user adds an image of a player to the database

___

**Note**: The user is not allowed to make any changes to the Postgres database.

#### PUT:

___

###### User Roster:
* /:userid/roster/:team/:position
  * switch out players within a user's roster

___
#### DELETE:
___

###### User Roster:
* /:userid/roster
  * delete the user's specified team
