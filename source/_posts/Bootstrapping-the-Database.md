---
title: Bootstrapping the Database
date: 2017-01-18 17:00:04
tags:
---

## tl;dr

Creating SQL scripts allows you to quickly create new databases and restore the core data necessary for your application to function.

[![Video](video.jpg)](https://drive.google.com/file/d/0ByuFVgkS5FT6MGx3Q3E3NWpBY0U/view)

## Transcript

1. Add `drop table if exists "card" cascade;` statements
2. Create 3-add-constraints.sql
3. Move the FK stuff
4. Rewrite the insert file to remove IDs
5. Everything should be lowercase
6. Rewrite FK stuff like ALTER TABLE card_set_card ADD FOREIGN KEY (card_id) REFERENCES card(id) ON DELETE CASCADE;
7. Run all scripts again until everything passes with no issues
8. Capture a backup in the future but assume all necessary data is in your inserts script

## Next post in this series

[Generating a RESTful API with Restify](/2017/01/13/Generating-a-RESTful-API-with-Restify/)
