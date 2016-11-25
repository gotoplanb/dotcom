---
title: Safe PostgreSQL Migrations
date: 2016-11-25 14:40:59
tags:
---


You never get the database design correct the first time. When it comes times to change the database, you have two paths:

1. Drop tables and rebuild
2. Migrate

## Drop tables and rebuild

If you're early in development, and you are changing the database schema daily, it probably just makes more sense to drop all tables and then recreate.

My current strategy is to keep a few SQL scripts in the source code repository in `sql/` folder.

### `1-create-tables.sql`

1. Drop all tables
2. Create tables
3. Add columns to tables
4. Add constraints to columns except for foreign keys

### `2-insert-records.sql`

1. Add realistic data the provide a useful starting point for any developer working with this data.
2. Add additional realistic data that helps QA regression test tricky scenarios.

### `3-foreign-keys.sql`

1. Add all foreign-key constraints. You have to add these constraints after you've inserted records.

## Migrate

Database migrations assume you are altering objects that already exist and that you shouldn't be destroying data.

1. Snapshot your database
2. Create incrementing SQL scripts
3. Run migrations

### Snapshot your database

Always snapshot your database before starting a migration unless you want to cry.

### Create incrementing SQL scripts

Add a SQL script to make each incremental change to the database that you need. Never go backward and modify existing SQL scripts. Also it's possible that a human modified something directly in a dev database. This is great to keep the team moving, but it's going to wreak havoc when you have to promote these changes through your delivery pipeline. For extra safety, wrap every kind of creation statement in a conditional check to only execute if the object doesn't exist. Here are some ways to do this for various types of objects in PostgreSQL:

### Add columns

PostgreSQL 9.6 allows:

```
ATLER TABLE <table_name> ADD COLUMN IF NOT EXISTS <column_name> <column_type>;
```

If you are using an older version of PostgreSQL, then you can use:

```
DO $$
    BEGIN
        BEGIN
            ALTER TABLE <table_name> ADD COLUMN <column_name> <column_type>;
        EXCEPTION
            WHEN duplicate_column THEN RAISE NOTICE 'column <column_name> already exists in <table_name> table.';
        END;
    END;
$$;
```

### Run migrations

There is probably a go-to migrations library for any framework you are using. When in doubt, go with [Flyway](https://flywaydb.org/).
