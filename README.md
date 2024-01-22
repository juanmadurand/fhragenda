# Contacts Application - Juan

Hello Factorial team, my name is Juan Manuel Durand (juanma).

## Specification 1 - Contacts Application

We want a Frontend + Backend applicationt that allows you to create, read, update and delete a list of conctacts. Each contact will have a first name, last name, email and phone number. All fields are manadatory and no two contacts can have the same email. A user should be able to see the history of edits on those contacts and the contacts should be persisted in the database.

## Start application

To start the application you need to run:

```bash
npm install

# Set Auth0 secrets provided in the email
cp .env.example .env

# Starts postgresql and populate db
docker-compose up

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
