# Project Name

ContentFlow (working name)

# Problem

Builders, developers, founders, and creators often do meaningful work every day but struggle to share it consistently online.

The issue is not always a lack of content. Many ideas are hidden inside daily work such as shipped features, bug fixes, product decisions, lessons learned, screenshots, and project updates.

By the time a builder sits down to post, much of that context is forgotten.

# Goal

Help builders turn their daily work into content ideas and posts without starting from a blank page.

# Target Users

* Indie hackers
* Developers
* SaaS founders
* Freelancers
* Builders who post in public

# User Flow

## Account Creation

1. User signs up with Google.
2. User enters the dashboard.

## Create Project

1. User creates a project.
2. User provides:

   * Project name
   * Description
   * Industry
   * Target audience
   * Optional tags

The system stores project context.

## Daily Update

1. User opens a project.
2. User enters:

   * What they worked on today
   * Features shipped
   * Bugs fixed
   * Lessons learned
   * Notes
   * Screenshots (optional)

## Content Generation

The system uses:

* Project context
* Previous updates
* Today's update

To generate:

* Content opportunities
* Content angles
* Platform-specific posts

## Content Backlog

Users can:

* Save ideas
* Save generated posts
* Edit posts
* Organize content

## Publish

Users can:

* Copy content
* Save drafts
* Schedule posts

# MVP Features

## Authentication

* Google Login

## Projects

* Create project
* Edit project
* Delete project

## Daily Updates

* Create update
* View update history

## AI Features

* Generate content ideas
* Generate X posts
* Generate LinkedIn posts
* Generate Reddit posts

## Content Backlog

* Save content
* Edit content
* Delete content

## Scheduling

* Schedule content internally
* Reminder support

# Database Models

## User

* id
* name
* email
* image
* createdAt

## Project

* id
* userId
* name
* description
* industry
* audience
* tags
* createdAt

## DailyUpdate

* id
* projectId
* content
* screenshots
* createdAt

## ContentIdea

* id
* projectId
* updateId
* title
* description
* createdAt

## GeneratedPost

* id
* projectId
* ideaId
* platform
* content
* status
* createdAt

## Schedule

* id
* postId
* scheduledFor
* status

# Tech Stack

Frontend

* Next.js
* TypeScript
* Tailwind CSS
* Shadcn UI

Authentication

* Better Auth

Database

* MongoDB

AI

* Gemini

Caching

* Redis

Email

* Resend

Storage

* Supabase Storage

# Build Roadmap

## Phase 1

* Project setup
* Better Auth
* MongoDB
* Basic dashboard

## Phase 2

* Create Project
* Project listing
* Project details page

## Phase 3

* Daily update system
* Update history

## Phase 4

* AI content ideas
* AI post generation

## Phase 5

* Content backlog
* Content management

## Phase 6

* Scheduling
* Email reminders

# Future Features

* GitHub integration
* Notion integration
* Linear integration
* Automatic work detection
* Team workspaces
* Analytics
* Social platform publishing
* Content performance tracking

# Success Metric

A user can:

1. Create a project.
2. Log today's work in less than 2 minutes.
3. Receive multiple content ideas.
4. Generate platform-specific posts.
5. Save or schedule content.

If users repeatedly return to log daily work, the product is providing value.
