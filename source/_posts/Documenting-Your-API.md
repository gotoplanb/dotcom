---
title: Documenting Your API
date: 2017-01-30 12:46:47
tags:
---

## tl;dr

Apiary provides a web-based editor, viewer, and mocking server for your API documentation.

[![Video](video.jpg)](https://drive.google.com/file/d/0ByuFVgkS5FT6WndJUlJRakR0TWc/view)

## Transcript

1. Create Apiary Blueprint
    1. Create account
    2. Create new Blueprint named “cardset”
    3. Describe Blueprint format
        1. Format
        2. Host
        3. Markdown-like
    4. Use Apiary console to hit blueprint
    5. Describe other Apiary features
        1. Documentation
        2. Inspector
        3. Tests
        4. Team
        5. Settings
            1. CORS
            2. Proxy
2. Rewrite for cardset collections
    1. Define headings for the card collection (get, post) and a card resource (get, put, delete)
    2. Define attributes for an object in the card collection
    3. Use attribute response for getting the card collection
        1. Return an array of card objects
        2. Response will be empty the first time. Rename the collection
        3. Response now has data.
        4. Include three card objects in the response. Sorry they are duplicates.
        5. You can define custom objects if you need variety, but we can use pg-restify for this.
    4. Define the POST /card service
        1. We do not include id since database will determine value
        2. Optional attributes should be indicated. Apiary will not enforce.
    5. Define the /card/{id} services
        1. Define parameters. Use backticks for example values.
        2. Define GET method.
        3. Define PUT method. Same as POST but with 200.
        4. Define DELETE method. Just a 200.
    6. Document should now be valid
        1. Sometimes highlighting is weird because of extra space
    7. Comments
        1. dash for attributes
        2. ellipses for a parameters
    8. Export Apiary Blueprint
        1. Copy/paste is simple. Save in your docs folder.
        2. Atom package for validating blueprints.
        3. GitHub sync is possible, but I prefer not to use.
3. Define card-set collection
    1. Duplicate your card stuff and rename object to card-set
    2. Update attributes to only be name
4. Define card-set-card collection
    1. Duplicate your card stuff and rename object to card-set
    2. Update attributes
    3. Describe what REST for this collection does in reality — add a card to a deck type or remove from a card set type
    4. Remove unnecessary PUT and GET methods for a card set card resource
    5. Use GET in Postman to see all card set card records This will become a scaling problem.
5. Optional parameters for pagination
    1. Add orderBy as an optional parameter for card-set-card collection. Look at pg-restify docs to copy/paste.
    2. Add the other optional parameters.
    3. This gets a bit gross and repetitive, so let's move to the Introduction section. Modify formatting.
    4. Remove optional parameters from the card-set-card collection docs
    5. Apiary often gets slow, so you can edit this stuff in Atom.
        1. api-blueprint-preview
            1. npm install -g aglio
            2. ctrl+shift+a
        2. language-api-blueprint
        3. linter-api-blueprint
6. Put your blueprint into your server repository docs folder
7. Try some requests with Postman
    1. Use heroku local or use your deployed services
    2. orderByDesc=true
    3. pageSize=2
    4. pageSize=2&page=2
