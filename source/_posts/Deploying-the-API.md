---
title: Deploying the API
date: 2017-01-18 17:00:20
tags:
---

## tl;dr

Heroku provides easy code deployments.

[![Video](video.jpg)](https://drive.google.com/file/d/0ByuFVgkS5FT6TWhuTV85NHJTdGM/view)

## Transcript

1. New Pipeline
    1. Same name as your app
    2. connect to github
    3. search for your repo and connect
    4. Click into production stage
    5. Click deploy tab
    6. Enable automatic deployments from master
2. First attempt to deploy to production stage
    1. git status and confirm .env is not listed
    2. git add, commit, push
    3. `heroku ps` OR `heroku ps:scale web=1`
    4. Wait for deployment success, try to curl, and be sad. What happened?
3. Add Papertrail to troublshoot
    1. `heroku addons:create papertrail:choklad`
    2. Create  Procfile with contents  web: node index.js since we likely will need in the future
    3. Git add, commit, push
    4. Wait for deployment again, and see it still doesn't work.
    5. Look at Resources > Papertrail and note problem binding do port
4. Update index.js to bind to port 5000
    1. var port = process.env.PORT || 8080;
    2. console.log(`REST server listening on ${port}`);
    3. server.listen(port);`
    4. Confirm heroku local still works and you see port 5000 message
    5. Git add, commit, push
    6. GET /api/generic/card to confirm it worked
    7. Look in Papertrail to see API request success

## Next post in this series

[Configuring a Delivery pipeline](/2017/01/18/Configuring-a-Delivery-Pipeline/)
