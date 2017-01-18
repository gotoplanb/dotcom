---
title: A Walking Skeleton for Prototyping and Elaboration
date: 2017-01-13 15:00:00
tags:
---

## tl;dr

In this series, I will show you how I like to setup new software projects as early as possible to help me validate architecture and ensure the developers can start the most valuable features during the first development sprint.

## Articles in this Series

1. [A Walking Skeleton for Prototyping and Elaboration](/2017/01/13/A-Walking-Skeleton-for-Prototyping-and-Elaboration/)
2. [Using Lucidchart for Database Design](/2017/01/13/Using-Lucidchart-for-Database-Design/)
3. [Getting Started with PostgreSQL on Heroku](/2017/01/13/Getting-Started-with-PostgreSQL-on-Heroku/)
4. [Creating the Database](/2017/01/18/Creating-the-Database/)
5. [Bootstrapping the Database](/2017/01/18/Bootstrapping-the-Database/)
6. [Generating a RESTful API with Restify](/2017/01/13/Generating-a-RESTful-API-with-Restify/)
7. [Deploying the API](/2017/01/18/Deploying-the-API/)
8. [Configuring a Delivery pipeline](/2017/01/18/Configuring-a-Delivery-Pipeline/)
9. [Organizing Your Project Folder](/2017/01/18/Organizing-the-Project-Folder/)
10. Documenting Your API
11. Testing Your Walking Skeleton

[![Video](video.jpg)](https://drive.google.com/file/d/0ByuFVgkS5FT6elVWUnNNNk5oX28/view)

## Introduction

We all want to build reliable software that users love. How we do this varies widely depending on location of the team and discovery processes.

This article will make a case for using a *walking skeleton* approach to quickly [validate your project idea and understand the risks](http://blog.codeclimate.com/blog/2014/03/20/kickstart-your-next-project-with-a-walking-skeleton/).

## What is a walking skeleton?

A walking skeleton ["is a tiny implementation of the system that performs a small end-to-end function. It need not use the final architecture, but it should link together the main architectural components. The architecture and the functionality can then evolve in parallel."](http://alistair.cockburn.us/Walking+skeleton)

The week before the first development iteration is a frantic combination of validating user stories and configuring all of the tooling for the team. We all create templates or scaffolding of some sort to make this common configuration less painful, but we're all have the same risky assumption: The project as architected and designed can be built on time, within budget, and with low [technical debt](https://en.wikipedia.org/wiki/Technical_debt).

## Why should I build a walking skeleton?

In my experience, the single greatest indicator of project success is seeing complex, valuable work scheduled for the first development iteration. If the first iteration is full of UI-related tickets, I'm immediately suspicious that we don't understand our system complexity yet, so we're kicking the risk can down the road. Trouble lies ahead.

Mature design methodologies share a key tenant: Understand risk as soon as possible. User Experience design relies on interviews and persona generation to help ensure we build something that actually solves a problem. In software architecture, we build prototypes to understand both the complexity of individual components as well as the integrations between components in the larger system.

[Scrum](https://www.scrumalliance.org/why-scrum) refers to a *spike* as a task to understand the complexity of a single technical implementation. [The Pragmatic Programmer](https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X) uses the term *tracer bullet* to similarly describe a strategy for de-risking a specific technical implementation. This singular focus makes sense for collocated teams that can quickly work around infrastructure and build problems.

With distributed teams, and especially when dealing with distant timezones, the biggest time-sucks on a project happen not within a component but at the integration points between components. Two frequent examples are 1) deploying services so that the frontend team can build views, and 2) delivering testable builds to the quality assurance team.

Creating a walking skeleton will allow your developers and testers to focus on the most valuable and most risky features early in the project to allow for [course correction](http://www.qrg.northwestern.edu/projects/vss/docs/navigation/1-what-is-course-correction.html) as soon (and inexpensively) as possible.

## But we are still designing! This seems like it will take a lot of time.

The idea with a walking skeleton is to have a minimal set of integration between the components of the system. The walking skeleton does not represent the final architecture but instead allows each component to evolve with minimal rework of the interfaces between components.

All teams, regardless of size, standardize on tooling and frameworks. Although we don't want to fall into the [golden hammer](https://en.wikipedia.org/wiki/Law_of_the_instrument) anti-pattern, we know that we have expertise in certain tools and frameworks. We sell our projects factoring this experience, so we also should begin design with these tools in mind.

Do we like to use type-safe languages or dynamic languages? Relational databases or document stores? Monolithic or micro services? Offline-first or online-first?

It is doubtful that your user-experience design team will be familiar enough with these different paradigms to design within the constraints of tools most likely to be used. While we don't want to prematurely constrain the inception (aka discovery) phase of a project, the elaboration (aka prototyping) phase of a project is primarily focused on understanding the complexities of multiple solutions.

[Elaboration](https://en.wikipedia.org/wiki/Unified_Process#Elaboration_phase) allows us to better align our design to business values. The time we spent on a feature should be highly correlated with the value of that feature.

It is not enough to just review design artifacts. As an architect, we need to play with the various components and try to uncover unexpected complexity. Does [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) make sense for this experience or are we going to run into performance problems with nested loops? Do we actually care about data relationships, or are we most worried about writing a firehose of messages to disk?

There is no single best way to build. Everything is an optimization between cost, security, performance, durability, and maintainability. Generating a walking skeleton during the elaboration phase of a project both helps me think though the overall solution optimization. Instead of words, I an use a walking skeleton to demonstrate risks early. Uncovering risks early allows course correction before our stakeholders have their hearts set on an expected outcome that we are never going to be able to deliver.

## Okay, I'm convinced! How do I get started with walking skeleton?

Throughout the rest of this article series, I will show you how you can create a walking skeleton that will help you quickly prototype most any type of software project. I will try to strike a balance between generalizing this workflow too broadly or focusing on tightly coupled tools. Each article should be adaptable to many different tools, platforms, and frameworks.

## Next post in this series

[Using Lucidchart for Database Design](/2017/01/13/Using-Lucidchart-for-Database-Design/)
