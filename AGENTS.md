# AGENTS.md

## Project Overview

This project helps builders turn their daily work into content ideas and posts.

Users create projects, log daily updates, generate content ideas, generate platform-specific posts, save content, and schedule content.

The application should feel focused, clean, and creator-friendly.

---

## Tech Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS v4
* Shadcn UI
* Better Auth
* MongoDB
* Redis
* Gemini AI
* Resend

---

## UI Philosophy

The UI should feel:

* Clean
* Minimal
* Modern
* Content-focused

Avoid:

* Fancy animations
* Heavy gradients
* Glassmorphism
* Neon colors
* AI-looking interfaces
* Overcrowded layouts

Prioritize readability over visual effects.

---

## Design System

Theme:

* Dark First

Primary Style:

* Slate background
* Amber primary
* Orange accent

Color definitions live in:

* app/globals.css

Always use existing CSS variables.

Never hardcode colors inside components.

---

## Layout Rules

Every page must have breathing room.

Preferred container:

* max-w-7xl
* mx-auto
* px-6
* lg:px-8

Section spacing:

* py-8 minimum
* py-12 preferred
* py-16 for major sections

Card spacing:

* p-6 minimum
* p-8 preferred

Never place components too close together.

---

## Typography

Use clear hierarchy.

Page Title:

* text-3xl or text-4xl
* font-semibold

Section Title:

* text-xl or text-2xl

Description:

* text-muted-foreground

Avoid excessive font sizes.

Avoid more than 3 typography levels in a section.

---

## Components

Prefer Shadcn components whenever possible.

Before creating a custom component:

1. Check Shadcn
2. Extend Shadcn if needed
3. Create custom component only when necessary

Keep components reusable.

---

## Forms

Forms should:

* Be simple
* Use clear labels
* Use proper validation
* Show helpful error messages

Avoid placeholder-only inputs.

---

## Buttons

Primary actions:

* Default button variant

Secondary actions:

* Outline variant

Danger actions:

* Destructive variant

Avoid creating unnecessary button styles.

---

## Data Fetching

* Prefer Server Components
* Use Client Components only when necessary
* Minimize client-side state

---

## State Management

Use:

- React state for local component state
- Zustand for global client state
- Server Actions for server mutations

Guidelines:

- Keep local UI state inside components when possible
- Use Zustand for shared application state
- Use Server Actions for data mutations and server-side operations
- Avoid duplicating the same state across multiple stores

---

## File Structure

app/
components/
components/ui/
lib/
actions/
hooks/
types/
constants/

Keep files organized by feature.

---


## Responsiveness

All pages must work on:

- Mobile
- Tablet
- Desktop

Mobile experience is required.

Avoid desktop-only layouts.


---


## Empty States

Every data-driven page should have:

- Loading state
- Empty state
- Error state

Never leave blank screens.


---



## Accessibility

- Use semantic HTML
- Provide labels for inputs
- Ensure keyboard navigation works
- Maintain proper contrast ratios


---