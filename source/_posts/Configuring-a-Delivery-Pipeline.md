---
title: Configuring a Delivery Pipeline
date: 2017-01-18 17:00:32
tags:
---

## tl;dr

Heroku Pipelines allow you to setup a continuous delivery pipeline with multiple stages.

[![Video](video.jpg)](https://drive.google.com/file/d/0ByuFVgkS5FT6eml0Qml4eXVkSFU/view)

## Transcript

1. git-flow refresher
    1. Create develop from master
    2. Change default branch to develop
    3. Protect master will all checkboxes except for merge review for admins
2. Heroku pipeline for development stage
    1. Navigate to pipeline
    2. Create app named davedemo-cardset-develop
    3. Add to pipeline
    4. Move to development stage
    5. Click into app overview
    6. Add PostgreSQL and Papertrail
    7. Connect to database and bootstrap database then add another card for testing
    8. Click to deployment page
    9. Enable automatic deployment for develop
    10. Manually deploy from develop
    11. Click to view the app to be sure it's running.
    12. Try /api/generic/card and see data
    13. Heroku review apps are cool but we will do another time b/c credentials and cost
    14. Create feature branch
    15. Add `.github/PULL_REQUEST_TEMPLATE.md` to feature then PR to  develop
    16. Rebase, merge, delete
    17. PR from develop to master with squash v0.0.1 and describe semver and changelog message
    18. Verify deployment in browser and in Heroku overview
3. Heroku pipeline for staging stag
    1. Repeat steps like setting up development stage
    2. Enable automatic deployments from master
    3. Go into production app and remove automatic deployment

## Next post in this series

[Organizing Your Project Folder](/2017/01/18/Organizing-the-Project-Folder/)
