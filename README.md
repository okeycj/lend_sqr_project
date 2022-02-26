# Overview

This is a Nodejs API for a bank account application where one can create an account, fund the account, withdraw funds from the account and also transfer funds to another account.

# Tech Stack

* Nodejs
* KnexJS ORM
* MySQL Database

## Local Setup

To setup the api on your local machine,

1. Run `npm install` command on your command prompt to install dependencies.

2. Copy and paste the `.env.example` file in the same directory.

3. Rename the newly copied file to `.env`.

4. Setup your local database, open the `.env` file and assign values of `MYSQL_DATABASE`, `MYSQL_PASSWORD`, `MYSQL_USERNAME`, `MYSQL_PASSWORD`, `MYSQL_PORT`, `MYSQL_HOST`
   to the name, username, password, port and host respectively for the newly created database.

5. Open your command prompt and run `npx knex migrate:latest` to migrate the database tables.

6. Run `npm start` to run the application locally and run `npm test` to run the test.

7. A CI/CD github action have been set here on github to push automatically to push code heroku.

8. This Application Heroku like is `http://lendsqrtest.herokuapp.com/`.

## Endpoints

| Http verb | Path                        | Controller.action                  | Used for                                    |
| --------- | --------------------------- | ---------------------------------- | ------------------------------------------- |
| POST      | `/api/account`              | AccountController.createAccount    | Creates an account for a user               |
| GET       | `/api/account/id`           | AccountController.showAccount      | To get an account information               |
| POST      | `/api/account/id/fund`      | AccountController.fundWallet       | To fund an account specifying the amount    |
| POST      | `/api/account/id/transfer`  | AccountController.transferFund     | To transfer fund to another account         |
| GET       | `/api/account/id/withdraw`  | AccountController.withdrawFund     | To withdraw fund from an account            |




