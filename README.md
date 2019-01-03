[![Coverage Status](https://coveralls.io/repos/github/kayroy247/SendIT/badge.svg?branch=develop)](https://coveralls.io/github/kayroy247/SendIT?branch=develop) [![Build Status](https://travis-ci.org/kayroy247/SendIT.svg?branch=ch-TravisCi-Setup-161691793)](https://travis-ci.org/kayroy247/SendIT) [![Maintainability](https://api.codeclimate.com/v1/badges/c90808a7ebcd9f340f8c/maintainability)](https://codeclimate.com/github/kayroy247/SendIT/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/c90808a7ebcd9f340f8c/test_coverage)](https://codeclimate.com/github/kayroy247/SendIT/test_coverage)

# SendIT
SendIT is a courier service that helps users deliver parcels to different destinations

### UI Templates
This is the link to the [UI Templates](https://kayroy247.github.io/SendIT/) on Github Pages.
User dashboard can be found [here](https://kayroy247.github.io/SendIT/UI/userDashboard.html)

### SendIT Restful API on heroku
[SendIT API](https://sendit-1.herokuapp.com/)

#### User Features
- Create an account and login
- Create a parcel delivery order
- Change the destination of the user's parcel delivery order that is not delivered
- Cancel a parcel delivery order
- See all of the user's parcel delivery orders
- See the details of user's single parcel delivery order

### Admin Features
- View all users
- View all parcel delivery orders
- Change the status of parcel delivery order(new, Intransit, delivered)
- Change the present location of a parcel delivery order

#### Optional Features 
1. The application should display a Google Map with Markers showing the pickup location
    and the destination .
2. The application should display computed travel distance and journey duration between
    the pickup location and the destination. Leverage Google Maps Distance Matrix Service .
3. The user gets real-time email notification when Admin changes the status of their        parcel.
4. The user gets real-time email notification when Admin changes the present location of
   their parcel.

### How To Install This
```
npm install

```
### How to test
```
npm test

```
### Technology Used
- Front End - HTML, CSS, JAVASCRIPT(ES6)
- Backend - Nodejs/Expressjs
- nodemailer
- Joi Validator
- babel 7
- Mocha, Chai and Chaihttp
- Nyc 
- Eslint(Airbnb style guide)
 


### Available endpoints
HTTP METHOD | ENDPOINTS | FUNCTIONALITY
--- | --- | ---
GET | /api/v1| *Sends the Welcome message*
GET | /api/v1/users   | *Fetch all the users*
GET | /api/v1/parcels   | *Fetch all the parcel delivery orders*
GET | /api/v1/users/:id   | *Fetch a particular user by weight*
GET | /api/v1/parcels/:id  | *Fetch a particular parcel by id*
PUT | /api/v1/users/:id  | *Update a user by id*
PUT | /api/v1/users/:id/cancel  | *Cancel a parcel delivery order*
PUT | /api/v1/parcels/:id  | *Update a parcel delivery order by id*
POST | /api/v1/users   | *Create a new user*
POST | /api/v1/parcels   | *Create a new parcel*
POST | /api/v1/users/   | *Create a new user*
DELETE | /api/v1/users/:id  | *Delete a user by id*
DELETE | /api/v1/parcels/:id  | *Delete a user by id*




### Author
Okunlade Kayode

### LICENCE
MIT




