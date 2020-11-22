# VISION

## Technology stack

- NodeJs
- Typescript
- ReactJs
- TypeORM
- Mysql
- Mocha
- Chai
- Supertest
- react-testing-liberay
- react-hooks-testing-library
- react-test-renderer

## Setting Up

clone or download repository <br>
copy the environment and configuration files and enter your secret information: <br>

###

    cp .env.example .env
    cp .ormconfig.example.json .ormconfig.json

## Steps to run this project:

In the project root directory, you can run the following command

1. Run `npm install` command to install all server dependencies.
2. Run `npm run client-install` command to install all front-end dependencies.
3. Run `npm run migrate` command to run database migration to setup the database schema.
4. Run `npm run dev` command to start the server and also the front-end concurrently.
5. In the root directory, run `npm run test` command to run all test for the server
6. cd into client folder and run `npm run test` command to run all test for front-end.

## NOTE

If you change the PORT on which your server is running on from 5000, then
cd into `client/src/config` and make sure that the PORT on the baseUrl matches the PORT on which your server is running on else API requests from the front-end to the server will not go through.
