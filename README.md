<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/ss_for_docs/landing_page_dark.png">
    <source media="(prefers-color-scheme: light)" srcset="public/ss_for_docs/landing_page_white.png">
    <img alt="Snapora — Share stories people actually remember" src="public/ss_for_docs/landing_page_white.png" width="100%">
  </picture>
</p>

<div align="center">

# 📸 Snapora

[![Next.js](https://img.shields.io/badge/Next.js-16.2.7-000000?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat&logo=postgresql)](https://neon.tech/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat)](CONTRIBUTING.md)

**Share stories people actually remember.**

Snapora is a modern, full-stack travel storytelling platform where creators publish visual stories with cover images, track engagement, and build their audience — with no algorithms, no distractions.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Architecture Overview](#-architecture-overview)
- [Local Setup](#-local-setup)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

| Aspect | Details |
|--------|---------|
| **What** | A vlogging and storytelling platform for creators |
| **Who** | Travel bloggers, photographers, content creators, storytellers |
| **Problem** | Existing platforms bury content under algorithms; Snapora puts stories first |
| **Solution** | Clean, distraction-free publishing with real engagement metrics |
| **Stack** | Next.js 16 + TypeScript + Prisma + PostgreSQL + Tailwind CSS |

Snapora lets creators write visual stories, upload cover images via Cloudinary, track views and likes, and build a public creator profile — all in a beautifully responsive interface with dark mode support.

---

## ✨ Features

### 🔐 Authentication

| Feature | Details |
|---------|---------|
| **Registration** | Email + password with client & server validation |
| **Login / Logout** | Secure JWT sessions via NextAuth.js |
| **Password Reset** | Token-based email recovery flow |
| **Email Verification** | Required before first login |
| **Session Management** | 30-day JWT sessions, auto-refresh |
| **Rate Limiting** | 10 auth requests/min per IP to prevent brute force |
| **Account Locking** | Auto-locks after 5 failed attempts for 15 min |

### 📝 Story & Vlog Management

| Feature | Details |
|---------|---------|
| **Create Vlog** | Title, description, cover image (Cloudinary), optional video clip |
| **Edit Vlog** | Update any field, replace cover image |
| **Delete Vlog** | Soft-delete with confirmation dialog |
| **Publish** | Instant publishing to public feed |
| **Reading Time** | Auto-calculated from description length |

### 🔍 Discovery

| Feature | Details |
|---------|---------|
| **Browse Stories** | Paginated feed with 9 stories per page |
| **Featured Stories** | Handpicked content on homepage |
| **Featured Creators** | Spotlight creator cards |

### 👤 User Profiles

| Feature | Details |
|---------|---------|
| **Own Profile** | Edit name, username, avatar; view your stories with edit buttons |
| **Public Profile** | Anyone can view a creator's stories and stats |
| **Profile Banner** | Gradient header with avatar, name, stats |
| **Stats Display** | Story count, total views, total likes |

### ❤️ Engagement

| Feature | Details |
|---------|---------|
| **Like / Unlike** | Toggle with real-time count updates |
| **View Count** | Server-side atomic increment per page load |
| **Authorization** | Only owners can edit/delete their content |

### 🎨 User Experience

| Feature | Details |
|---------|---------|
| **Dark Mode** | Full theme support with system preference detection |
| **Responsive Design** | Mobile, tablet, desktop — every page |
| **Loading States** | Skeleton loaders, button spinners, progress indicators |
| **Empty States** | Graceful illustrations when no content exists |
| **Error Handling** | Inline validation, toast-like error messages |
| **Pagination** | Smart pagination with ellipsis for large datasets |
| **Animations** | Framer Motion page transitions and micro-interactions |
| **Glass Navbar** | Blurred backdrop with sticky positioning |

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) | Full-stack React framework |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Type safety |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS |
| **UI Components** | Radix UI + Custom | Accessible primitives |
| **Animations** | [Framer Motion](https://framer.com/motion) | Page transitions |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent icon set |
| **Forms** | React Hook Form + Zod | Validation |
| **Database** | [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/)) | Relational data store |
| **ORM** | [Prisma 6](https://www.prisma.io/) | Type-safe database access |
| **Auth** | [NextAuth.js 5](https://next-auth.js.org/) (JWT) | Authentication |
| **Media** | [Cloudinary](https://cloudinary.com/) | Image & video upload/CDN |
| **Hosting** | [Vercel](https://vercel.com/) | Deployment & edge network |
| **Linting** | ESLint 9 + Next.js config | Code quality |
| **Testing** | Node.js Test Runner | Unit & validation tests |

---

## 🖼 Screenshots

### Landing & Home

| Light Theme | Dark Theme |
|:---:|:---:|
| [![Landing Page (Light)](public/ss_for_docs/landing_page_white.png)](public/ss_for_docs/landing_page_white.png) | [![Landing Page (Dark)](public/ss_for_docs/landing_page_dark.png)](public/ss_for_docs/landing_page_dark.png) |

### Authentication Flow

| Login | Register | Forgot Password |
|:---:|:---:|:---:|
| [![User Login](public/ss_for_docs/login.png)](public/ss_for_docs/login.png) | [![User Registration](public/ss_for_docs/Register.png)](public/ss_for_docs/Register.png) | [![Password Recovery](public/ss_for_docs/forgot_password.png)](public/ss_for_docs/forgot_password.png) |

### Dashboard & Content

| Authenticated Dashboard | Discover Stories | Create Vlog |
|:---:|:---:|:---:|
| [![Authenticated Dashboard](public/ss_for_docs/Successful_login.png)](public/ss_for_docs/Successful_login.png) | [![Discover Travel Stories](public/ss_for_docs/discover.png)](public/ss_for_docs/discover.png) | [![Create New Travel Vlog](public/ss_for_docs/create_vlog.png)](public/ss_for_docs/create_vlog.png) |

### Story Detail

| Published Story |
|:---:|
| [![Published Story Experience](public/ss_for_docs/vlog.png)](public/ss_for_docs/vlog.png) |

---

## 🏗 Architecture Overview

### High-Level System Design

Snapora follows a **monolithic Next.js architecture** where the same application serves both the frontend and API routes.

```mermaid
graph TD
    Browser[🌐 Browser] --> Vercel[Vercel Edge Network]
    Vercel --> NextJS[Next.js 16 App Router]
    NextJS --> Pages[Server Components + Client Components]
    NextJS --> API[API Route Handlers]
    API --> Auth[NextAuth.js JWT]
    API --> Prisma[Prisma ORM]
    Prisma --> DB[(PostgreSQL / Neon)]
    NextJS --> Cloudinary[Cloudinary CDN]
    Pages --> Session[SessionProvider]
    API --> RateLimit[In-Memory Rate Limiter]
```

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant API as API Route
    participant Auth as NextAuth.js
    participant DB as Database
    
    Note over U,DB: Registration
    U->>F: Fill register form
    F->>API: POST /api/auth/register
    API->>Auth: Validate & hash password
    Auth->>DB: Create user (PENDING_VERIFICATION)
    DB-->>API: User created
    API->>API: Create verification token
    API-->>F: 201 + user + verifyUrl
    F-->>U: Success message
    
    Note over U,DB: Login
    U->>F: Enter credentials
    F->>API: POST /api/auth/signin
    API->>Auth: CredentialsProvider.authorize()
    Auth->>DB: Find user, verify password
    DB-->>Auth: User data
    Auth->>Auth: Check status, lock state
    Auth-->>API: JWT token
    API-->>F: Set session cookie
    F-->>U: Redirect to home
```

### Vlog CRUD Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant CDN as Cloudinary
    participant API as API Route
    participant DB as Database
    
    Note over U,DB: Create Vlog
    U->>F: Fill form + select image
    F->>CDN: Upload image (signed request)
    CDN-->>F: secure_url
    F->>API: POST /api/vlogs (with session)
    API->>API: requireAuth() - verify JWT
    API->>DB: INSERT vlog (userId, title, ...)
    DB-->>API: Vlog
    API-->>F: 201 + vlog object
    F-->>U: Redirect to vlog detail
    
    Note over U,DB: View vlog
    U->>F: Load vlog detail page
    F->>API: POST /api/vlogs/:id/view
    API->>DB: UPDATE viewCount += 1
    DB-->>API: Updated count
    API-->>F: 200 + new viewCount
    F-->>U: Display
    
    Note over U,DB: Like / Unlike
    U->>F: Click like button
    F->>API: POST /api/vlogs/:id/like
    API->>API: requireAuth()
    API->>DB: Check existing like
    alt No like exists
        API->>DB: INSERT like
        DB-->>API: success
        API-->>F: 201 + liked: true
    else Already liked
        API->>DB: DELETE like
        DB-->>API: success
        API-->>F: 200 + liked: false
    end
    F-->>U: Updated like count
```

### Database Schema

```mermaid
erDiagram
    User {
        string id PK
        string name
        string email UK
        string password
        enum role
        enum status
        int failedLoginAttempts
        datetime lockedUntil
        datetime emailVerified
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
    }
    Vlog {
        string id PK
        string title
        string description
        string imageUrl
        string videoUrl
        int viewCount
        string userId FK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
    }
    Like {
        string id PK
        string userId FK
        string vlogId FK
        datetime createdAt
    }
    AuditLog {
        string id PK
        string userId FK
        enum action
        string ipAddress
        string userAgent
        json metadata
        datetime createdAt
    }

    User ||--o{ Vlog : "creates"
    User ||--o{ Like : "gives"
    User ||--o{ AuditLog : "logs"
    Vlog ||--o{ Like : "receives"
```

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **JWT Sessions** | Stateless auth — no DB session lookups, faster API responses |
| **Soft Deletes** | Vlogs use `deletedAt` — enables recovery and audit trails |
| **Atomic View Count** | `UPDATE viewCount += 1` prevents race conditions |
| **Like Join Table** | Unique constraint on `(userId, vlogId)` prevents duplicate likes |
| **CUID Primary Keys** | Collision-resistant, no auto-increment predictability |
| **Cloudinary Direct Upload** | Images upload client-side via signed signatures — reduces server load |
| **Rate Limiting** | In-memory token bucket for auth endpoints — prevents brute force |
| **Pino Logging** | Structured JSON logging with separate auth and API loggers |

---

## 🚀 Local Setup

### Prerequisites

- **Node.js** >= 18 (24.13.0 recommended)
- **npm** >= 10
- **PostgreSQL** database (local or [Neon](https://neon.tech/) free tier)
- **Cloudinary** account (free tier)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/snapora.git
cd snapora
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials (see [Environment Variables](#-environment-variables) below).

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Apply migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio for data exploration
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build

```bash
npm run build
npm start
```

---

## 🔐 Environment Variables

All required environment variables are documented in `.env.example`. Copy to `.env.local` and fill in.

| Variable | Required | Purpose | Example |
|----------|----------|---------|---------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |
| `AUTH_SECRET` | ✅ | NextAuth.js signing secret | Generate via `openssl rand -base64 32` |
| `AUTH_URL` | ✅ | Public app URL | `http://localhost:3000` |
| `AUTH_TRUST_HOST` | ✅ | Trust Vercel/host forwarding | `true` |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary account name | `dsbqaryi7` |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary API key | From dashboard |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary API secret | From dashboard |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅ | Public Cloudinary name for client | Same as above |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public app URL for client | `http://localhost:3000` |
| `LOG_LEVEL` | ❌ | Logging verbosity | `info` |

### Generating Secrets

```bash
# Generate a secure AUTH_SECRET
openssl rand -base64 32
```

---

## 📁 Project Structure

```
snapora/
├── docs/                          # Documentation
│   ├── ARCHITECTURE.md            # System architecture
│   ├── DB-Design.md               # Database design
│   ├── DEPLOYMENT.md              # Deployment guide
│   ├── TESTING.md                 # Testing documentation
│   ├── Requirements.md            # Project requirements
│   ├── open-api.yaml              # OpenAPI specification
│   └── issues/issues.csv          # Issue tracker
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── migrations/                # Prisma migration files
├── public/
│   └── ss_for_docs/              # Screenshots for documentation
├── src/
│   ├── actions/
│   │   └── auth.actions.ts       # Server actions (login, register, logout)
│   ├── app/
│   │   ├── (auth)/               # Auth pages (login, register, forgot-password)
│   │   ├── api/                  # API route handlers
│   │   │   ├── auth/            # Auth endpoints
│   │   │   ├── cloudinary/      # Signature endpoint
│   │   │   ├── profile/         # Profile CRUD
│   │   │   └── vlogs/           # Vlog CRUD + like/view
│   │   ├── create-vlog/         # Create vlog page
│   │   ├── profile/             # Own profile page
│   │   ├── users/[id]/          # Public profile page
│   │   ├── vlogs/               # Vlog list, detail, new, edit pages
│   │   ├── globals.css          # Global styles + theme tokens
│   │   ├── layout.tsx           # Root layout (navbar, footer, providers)
│   │   └── page.tsx             # Landing page
│   ├── auth/                    # NextAuth.js configuration
│   ├── components/
│   │   ├── auth/                # LoginForm, RegisterForm, ProfileForm
│   │   ├── layout/              # Navbar, Footer
│   │   ├── ui/                  # Button, Input, Card, Badge, etc.
│   │   └── vlogs/               # VlogCard, Create/Edit forms, Like/View components
│   ├── constants/               # Routes, auth constraints
│   ├── lib/
│   │   ├── auth/                # Password hashing, session helpers
│   │   ├── errors/              # Custom error classes
│   │   ├── logger/              # Pino structured logging
│   │   ├── prisma/              # Prisma client singleton
│   │   ├── utils/               # API response, rate limiting, request utils
│   │   └── validators/          # Zod schemas for auth + vlogs
│   ├── middleware.ts            # Route protection (deprecated in Next.js 16)
│   ├── providers/
│   │   └── session-provider.tsx # Session context provider
│   ├── repositories/            # Data access layer (Prisma queries)
│   ├── services/                # Business logic layer
│   ├── types/                   # TypeScript type definitions
│   └── constants/               # Application constants
├── .env.example                 # Environment variable template
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json
├── postcss.config.mjs           # PostCSS / Tailwind config
├── tsconfig.json
└── vercel.json                  # Vercel deployment configuration
```

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register new user |
| `POST` | `/api/auth/signin` | ❌ | Sign in with credentials |
| `POST` | `/api/auth/signout` | ✅ | Sign out current session |
| `POST` | `/api/auth/forgot-password` | ❌ | Request password reset |
| `POST` | `/api/auth/reset-password` | ❌ | Reset password with token |
| `POST` | `/api/auth/verify-email` | ❌ | Verify email with token |

### Vlogs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/vlogs` | ❌ | List all vlogs |
| `POST` | `/api/vlogs` | ✅ | Create a vlog |
| `GET` | `/api/vlogs/:id` | ❌ | Get vlog details |
| `PUT` | `/api/vlogs/:id` | ✅ | Update vlog (owner only) |
| `DELETE` | `/api/vlogs/:id` | ✅ | Delete vlog (owner only) |

### Engagement

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/vlogs/:id/like` | ✅ | Like a vlog |
| `DELETE` | `/api/vlogs/:id/like` | ✅ | Unlike a vlog |
| `POST` | `/api/vlogs/:id/view` | ❌ | Increment view count |

### Profile

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/profile` | ✅ | Get own profile with vlogs |
| `PUT` | `/api/profile` | ✅ | Update profile |
| `GET` | `/api/users/:id` | ❌ | Get public user profile |

### Utilities

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/cloudinary/signature` | ✅ | Get Cloudinary upload signature |

Full API specification available in [`docs/open-api.yaml`](docs/open-api.yaml).

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# TypeScript type check
npx tsc --noEmit

# Lint
npm run lint
```

See [TESTING.md](docs/TESTING.md) for complete testing documentation including 20+ manual test cases.

---

## 🚢 Deployment

Snapora is designed for **Vercel** deployment.

```bash
# Deploy via Vercel CLI
npx vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions, environment variable configuration, production checklist, and troubleshooting.

### Quick Deploy Checklist

- [ ] `DATABASE_URL` configured with production PostgreSQL connection
- [ ] `AUTH_SECRET` set to a strong random value
- [ ] Cloudinary credentials configured
- [ ] Prisma migrations applied (`npx prisma migrate deploy`)
- [ ] `AUTH_TRUST_HOST` set to `true`
- [ ] `NEXT_PUBLIC_APP_URL` set to production URL

---

## 🗺 Future Improvements

| Area | Improvement | Priority |
|------|-------------|----------|
| **Content** | Rich text editor (TipTap or Editor.js) | High |
| **Video** | Native video player with chapters | High |
| **Social** | Comments system on stories | Medium |
| **Social** | Follow/unfollow creators | Medium |
| **Content** | Tags & categories for discovery | Medium |
| **Search** | Full-text search across stories | Medium |
| **Profile** | Profile bio, website, social links | Medium |
| **Analytics** | Dashboard with views over time | Low |
| **Performance** | Redis for view count caching | Low |
| **DX** | Add Playwright E2E tests | Low |
| **DX** | Migrate middleware to `proxy` convention | Low |
| **Feature** | Collections / reading lists | Low |
| **Feature** | Email notifications for likes | Low |
| **Infra** | CDN caching strategy for images | Low |

---

## 👥 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m 'Add some feature'`
4. **Push**: `git push origin feature/your-feature`
5. **Open a Pull Request**

### Development Guidelines

- Read all docs before generating code
- Generate code incrementally, issue by issue
- Prefer Server Components; use Client Components only where necessary
- Use Zod for input and environment validation
- Centralize logging and error handling
- Protect authenticated routes and avoid exposing internal errors

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js config
- Tailwind CSS for styling (no CSS modules)
- Prisma for all database interactions
- Lucide icons for UI

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 👨‍💻 Developed by Sahas Nagar

Full Stack Developer | Computer Engineering Student

🌐 Portfolio: <a href="https://sahas2711.github.io/Portfolio/">Sahas_Nagar</a>

Built with ❤️ using Next.js, Prisma, TypeScript, and Neon PostgreSQL

</div>