---
title: Using Lucidchart for Database Design
date: 2017-01-13 15:00:56
tags:
---

## tl;dr

This screencast will give you a quick introduction to database design. We will use Lucidchart as a tool to design a database schema for a set of poker cards.

[![Video](video.jpg)](https://drive.google.com/file/d/0ByuFVgkS5FT6M3hhRl9yUE1VdEE/view)

## Transcript

1. Create an account and login to [Lucidchart](lucidchart.com)
2. Explore an example entity relationship diagram
  1. Show "manage fields" menu
  2. Export to SQL
3. Describe a card set
  1. card set is a set of cards of course but what does that mean for the data model
  2. card
  3. card_set
  4. card_set_card
4. Design Card table
  1. Show queen of hearts image
  2. Create a new ERD object with 3 columns
  3. Manage fields
  4. Fields are “name”, “type”, “image”
  5. We use “type” instead of “suit”. We could use same generalized model for Uno or other cards games as well as flashcards for studying. Discuss the compromise of DSLs/jargon vs generalizing/premature-optimization.
  6. Types are text, text, text
  7. [Refer to Postgres docs](https://www.postgresql.org/docs/9.5/static/datatype.html_) for data types
  8. None of these columns are unique, so get rid of keys
  9. Add an “id” column of type “serial” and “pk”
4. Design CardSet table
  1. Describe attributes of a card set
  2. Create a new ERD object
  3. Fields are “id” serial and “name” text
5. Design CardSetCard table
  1. Describe intersection table for having cards reused in many sets
  2. Create a new ERD object
  3. “id” serial , “card_id” integer, “card_set_id” integer
  4. FK to relate to other tables
  5. “id” does not need to be a key since we won't lookup with this column. Still needs to be unique. We'll add this constraint later.
  6. Use bigint 8-bit since we won't increment. Serial is 4-bit unsigned.
5. Draw key constraints
  1. Vertical align the three tables
  2. Left-align text
  3. Set same width
  4. Turn on table coloring
  5. Draw relationship from PK to FK
  6. Change to one-to-one relationships
6. Export to SQL
  1. Choose PostgreSQL
7. Validate SQL
  1. Use SQLFiddle
  2. Choose PostgreSQL
  3. Build schema
  4. Save as “1-create-tables.sql”

## Next post in this series

[Getting Started with PostgreSQL on Heroku](/2017/01/13/Getting-Started-with-PostgreSQL-on-Heroku/)
