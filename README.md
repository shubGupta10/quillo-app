# Quillo: Turn Daily Progress Into Content

Quillo is a creator-focused SaaS application built for developers, founders, and creators. It helps builders log daily work updates (features shipped, bugs fixed, architectural decisions, and product progress) and converts those logs into authentic social posts for **LinkedIn**, **X (formerly Twitter)**, and **Reddit** without artificial AI fluff or corporate jargon.

---

## Key Features

- **Project Workspace Management**: Organize content across multiple brands or projects with audience, industry, and tag contexts.
- **Daily Progress Logging**: Log daily updates, notes, and screenshots.
- **Human-First AI Prompting**: Grounded prompt architecture using Gemini model to generate natural, practitioner-focused content.
- **Style Memory (MongoDB Vector Search)**: Embeds user-preferred post blueprints using Gemini embeddings to match your personal writing style over time.
- **Social OAuth and Direct Publishing**: Connect LinkedIn and X (Twitter) accounts with encrypted token storage. Supports video and image publishing.
- **Automated Scheduling**: Schedule posts for future publication with background cron worker execution and idempotency locking.
- **Rate Limiting and Quota Protections**: Sliding-window rate limiting using Upstash Redis and persistent monthly usage tracking.
- **Dark-First UI**: Responsive design built with Next.js 16 (App Router), Tailwind CSS v4, Shadcn UI, and Base UI.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling and UI** | Tailwind CSS v4, Shadcn UI, Base UI, Lucide Icons, React Icons |
| **Authentication** | Better Auth (Google OAuth 2.0) |
| **Database** | MongoDB (Mongoose) with Vector Search |
| **Caching and Rate Limiting** | Upstash Redis (`@upstash/redis`, `@upstash/ratelimit`) |
| **AI Model** | Gemini model (`@google/genai`) |
| **Media Uploads** | UploadThing |
| **Social Publishing** | LinkedIn REST API and Twitter API v2 |
| **Email** | Nodemailer |

---

## Project Structure

```text
├── app/                        # Next.js App Router pages and API routes
│   ├── (dashboard)/            # Authenticated user pages (Projects, Content, Schedule, Settings)
│   ├── api/                    # API endpoints (OAuth callbacks, UploadThing, Cron workers)
│   └── page.tsx                # Landing page
├── components/                 # Shared UI components
│   ├── layout/                 # Sidebar, AppHeader, AppFooter, NavItems
│   └── ui/                     # Shadcn and Base UI components
├── features/                   # Feature modules
│   ├── analytics/              # Usage statistics and activity tracking
│   ├── auth/                   # Authentication logic
│   ├── content/                # Post generation, prompt builder, content library, canvas
│   ├── daily-updates/          # Work logging and update history
│   ├── feedback/               # User feedback dialogs and admin review
│   ├── projects/               # Workspace creation and settings
│   ├── schedule/               # Post scheduling and platform publishers (LinkedIn, X)
│   ├── settings/               # Social account connections and user settings
│   └── subscriptions/          # Quota checks and usage widgets
├── lib/                        # Shared client initializations and helpers
│   ├── ai.ts                   # Gemini AI client configuration
│   ├── db.ts                   # MongoDB database connection
│   ├── encryption.ts           # Token encryption and decryption helper
│   ├── redis.ts                # Upstash Redis client
│   └── auth.ts                 # Better Auth server configuration
└── package.json                # Dependencies and scripts
```

---

## Environment Variables

Create a `.env` or `.env.local` file in your root directory:

```env
# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_ADMIN_EMAIL="admin@example.com"
ENCRYPTION_KEY="your-32-character-random-encryption-key"
CRON_SECRET="your-cron-secret-token"

# Database
MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/quillo?retryWrites=true&w=majority"

# Redis (Upstash)
UPSTASH_REDIS_REST_URL="https://your-redis-instance.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-token"

# Authentication (Better Auth & Google OAuth)
BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI
GEMINI_API_KEY="your-gemini-api-key"

# Media Uploads (UploadThing)
UPLOADTHING_TOKEN="your-uploadthing-token"

# Social Platform Connections
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"
TWITTER_CLIENT_ID="your-twitter-client-id"
TWITTER_CLIENT_SECRET="your-twitter-client-secret"

# Email
EMAIL_HOST="smtp.example.com"
EMAIL_PORT=587
EMAIL_USER="noreply@example.com"
EMAIL_PASS="your-smtp-password"
```

---

## Local Development Setup

### 1. Prerequisites
- **Node.js**: v20.x or higher
- **npm** or **pnpm**
- **MongoDB**: A running MongoDB instance or connection string.

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/shubGupta10/quillo-app.git
cd quillo-app
npm install
```

### 3. Run Development Server

Start the local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Background Worker

Quillo runs a cron worker endpoint to process scheduled posts:

- **Endpoint**: `/api/cron/publish`
- **Header**: `Authorization: Bearer <CRON_SECRET>`

---

## Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the production bundle.
- `npm run start`: Runs the production server.
- `npm run lint`: Runs ESLint.

---

## License

Proprietary software. All rights reserved.
