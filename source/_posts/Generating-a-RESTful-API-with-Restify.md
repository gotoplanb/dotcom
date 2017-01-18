---
title: Generating a RESTful API with Restify
date: 2017-01-13 15:01:51
tags:
---

## tl;dr

We use the magical pg-restify library to auto-discover our database schema and generate RESTful services for all of our tables.

[![Video](video.jpg)](https://drive.google.com/file/d/0ByuFVgkS5FT6a3diSHExSUQ4RzA/view)

## Transcript

1. Create a git repository
    1. Create a GitHub repository with a README and .gitignore
    2. Open your terminal
    3. Clone the repo
2. Initialize the project with Yarn
    1. `yarn init`
    2. v0.0.1
    3. `yarn add restify pg-restify`
    4. `"scripts": { "start" : "node ./index.js"}`
3. Connect to Heroku app
    1. `heroku login`
    2. `heroku git:remote -a davedemo-cardset`
    3. `git remote -v`
    4. `heroku config:get DATABASE_URL -s >> .env`
    5. add .env to .gitignore
    6. `git status` to confirm you are ignoring .env
4. Configure pg-restify
    1. Copy example server from https://www.npmjs.com/package/pg-restify
    2. `pbpaste > index.js`
    3. `pgConfig: process.env.DATABASE_URL + '?ssl=true'`
    4. Run `heroku local` to export config vars and run this locally
    5. `curl http://localhost:8080/api/generic/card` to confirm API server is running
    6. Use Postman to GET a single card

## Next post in this series

[Deploying the API](/2017/01/18/Deploying-the-API/)
