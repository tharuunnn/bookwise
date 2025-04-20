📚 Bookwise

A full-stack library management platform built with Next.js, TypeScript, and Drizzle ORM, featuring book borrowing, admin dashboards, email notifications, and rate-limited APIs.

🚀 Tech Stack

Next.js 14 (App Router)

TypeScript

TailwindCSS + ShadCN

Drizzle ORM + Neon PostgreSQL

Upstash Redis (Rate Limiting)

Resend (Transactional Emails)

ImageKit (Media Optimization)

QStash (Background Jobs)

NextAuth (Authentication)

🛠️ Getting Started

1. Clone the repo
   git clone https://github.com/yourusername/bookwise.git
   cd bookwise

2. Install dependencies
   pnpm install

3. Configure environment variables

Create a file named .env.local in the root of the project and add the following content:

# ImageKit

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Public API URL

NEXT_PUBLIC_API_URL=http://localhost:3000

# Neon Postgres

DATABASE_URL=your_neon_postgres_database_url

# Upstash Redis (Rate Limiting)

UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token

# Resend

RESEND_API_KEY=your_resend_api_key

# QStash

QSTASH_URL=your_qstash_url
QSTASH_TOKEN=your_qstash_token

4. Start the development server
   pnpm dev

5. Open your browser and visit http://localhost:3000 to see the application in action.
