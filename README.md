# Rick & Morty Characters API

This project was created as a sample project API to demonstrate Node.js and Express skills.

It works for an APP frontend

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the api in the development mode.\
Listens to [http://localhost:9000](http://localhost:9000).

## Packages used:

* **eslint**: For code quality 
* **eslint-config-prettier eslint-plugin-prettier prettier**: For code quality
* **cors**: To accept external requests from another domain
* **axios**: To make calls to the Rick&Morty API
* **sqlite3**: To connect to a small database
* **jsonwebtoken passport passport-jwt passport-local**: To protect the API with JWT authentication
* **md5**: To encrypt the user passwords

## Extra comments

* A small SQLite database is used and placed in: /dabatabse.sqlite3 
* The script /models/dbinit.js was used to create database structure but is not used in execution time
* Two users are already created: 

    * admin@example.com / admin123456
    * user@example.com / user123456

* JWT secret is hardcoded in both /app.js and /routes/login.js files! In a production environment it should be placed in a different file and exclude from repo and external access.
