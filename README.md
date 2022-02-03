
# Backend project for a Quote Finder Application

Backend application created using Node, Express and MongoDB.

The backend of this project was developed to be used as a server for an application involving finding, adding, commenting on quotes. Front end is coming later...

# Database Schemas

## Users

### User

- username (String value)
- password (String value)
- first_name (String value)
- last_name (String value)
- is_admin (Boolean value)
- fave_quotes (Array of Object IDs)


## Quotes

### Quote

- content (String value)
- source (String value)
- year (Number value)
- category (String value)
- author (Object ID value)
- objections (Array of Object IDs)

### Author

- name (String value)
- quotes (Array of Object IDs)

### Objection

- comment (String value)
- quote (Object ID value)
- user (Object ID value)


# Server/API

To evaluate the API, I used the Postman application.

The following API calls were developed and tested:

## Users

### GET /users

No arguments

Returns all the users in the database.

### POST /users

Arguments
- username (String value)
- password (String value)
- first_name (String value)
- last_name (String value)
- is_admin (Boolean value)

Returns the newly created user as well as his token (JWT format).

### GET /users/:id

No arguments

Returns the user matched by the id.

### PUT /users/:id

Arguments (not all required)
- username (String value)
- password (String value)
- first_name (String value)
- last_name (String value)
- is_admin (Boolean value)

Returns the updated user. Also middleware is used to authenticate the request.

### POST /users/login

Arguments
- username (String value)
- password (String value)

Returns the logged-in user and his token.

### POST /users/favorite/:id

Arguments
- quote_id (String value)

Adds the quote to the array of favorite quotes and returns the updated user.

### DELETE /users/favorite/:id

Arguments
- quote_id (String value)

Removes the quote from the array of favorite quotes and returns the updated user.

## Quotes

### GET /quotes

No arguments

Returns all the quotes in the database.

### POST /quotes

Arguments
- content (String value)
- source (String value)
- year (Number value)
- author (String value)
- category (String value)

Returns the new quote.

### PUT /quotes/:id

Arguments (not all required)
- content (String value)
- source (String value)
- year (Number value)
- author (String value)
- category (String value)

Returns the updated quote. Since only admin users can updated quotes, middleware is used to authenticate and authorize the user making the request.

### GET /quotes/objections

Arguments (not all required)
- comment (String value)
- quote (String value)
- user (String value)

Returns the objections that match the query.

### POST /quotes/objections

Arguments
- comment (String value)
- quote (String value)
- user (String value)

Returns the new objection.

### GET /quotes/objections/:id

No arguments

Returns the objection matched by the id.

### PUT /quotes/objections/:id

Arguments (not all required)
- comment (String value)
- quote (String value)
- user (String value)

Returns the updated objection matched by the id.

### DELETE /quotes/objections/:id

No arguments

Returns the deleted objection matched by the id.

### GET /quotes/authors

No arguments

Returns all the authors in the database.

### POST /quotes/authors

Arguments
- name (String value)

Returns the newly created author.

### GET /quotes/random

No arguments

Returns a random quote.