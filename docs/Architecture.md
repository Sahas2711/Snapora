# System Architecture – Snapora

## High-Level System Architecture

The application follows a monolithic architecture with Next.js serving both the frontend and backend (API routes). External services are used for authentication (NextAuth.js), database (PostgreSQL via Prisma), and image storage (Cloudinary).

```mermaid
graph TD
    Browser[Browser / Client] --> NextJS[Next.js 15 App Router]
    NextJS --> Auth[NextAuth.js]
    NextJS --> Prisma[Prisma ORM]
    Prisma --> DB[(PostgreSQL)]
    NextJS --> Cloudinary[Cloudinary Image Storage]
    NextJS --> Vercel[Vercel Edge Network]
```

- **Next.js App Router**: handles routing, server‑side rendering, API endpoints, and React components.
- **NextAuth.js**: manages authentication sessions and credentials validation.
- **Prisma**: provides type‑safe database access and migration tooling.
- **PostgreSQL**: persistent storage for users, vlogs, and likes.
- **Cloudinary**: stores and serves cover images; the frontend uploads directly, receiving a secure URL.

## Request Flow

A typical request for viewing a vlog detail page:

1. User visits `/vlogs/[id]`.
2. Next.js server component or server action fetches the vlog from the database using Prisma.
3. The view count is incremented server‑side (via a server action or API call) before returning the page.
4. The page is rendered on the server (SSR) and sent to the client with pre‑fetched data.
5. For authenticated actions (like, create), the client sends requests to API routes; the API validates the session using NextAuth and then performs the DB operation.

## Component Overview

- **Layouts & Pages**: Server‑side rendered React components (App Router).
- **API Routes**: Route handlers under `app/api/` that implement REST endpoints.
- **Auth Configuration**: `auth.ts` exports NextAuth configuration and handlers.
- **Prisma Client**: Singleton instance used across the application.
- **Middleware**: Next.js middleware (optional) can protect routes by redirecting unauthenticated users.

## Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant NextAuth
    participant Prisma
    participant DB

    User->>Frontend: Fill registration form
    Frontend->>NextAuth: POST /api/auth/register (name, email, password)
    NextAuth->>Prisma: Create user (hashed password)
    Prisma->>DB: INSERT user
    DB-->>Prisma: success
    Prisma-->>NextAuth: user
    NextAuth-->>Frontend: 201 + user object
    Frontend-->>User: Registration success

    User->>Frontend: Fill login form
    Frontend->>NextAuth: POST /api/auth/signin (email, password)
    NextAuth->>Prisma: Find user & verify password
    Prisma->>DB: SELECT user
    DB-->>Prisma: user
    Prisma-->>NextAuth: valid user
    NextAuth-->>Frontend: Set session cookie
    Frontend-->>User: Redirect to home

    User->>Frontend: Logout
    Frontend->>NextAuth: POST /api/auth/signout
    NextAuth-->>Frontend: Clear session cookie
    Frontend-->>User: Redirect to home
```

## Vlog Management Flow (Create)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API (/api/vlogs)
    participant Prisma
    participant DB
    participant Cloudinary

    User->>Frontend: Fill create form & upload image
    Frontend->>Cloudinary: Upload image (directly)
    Cloudinary-->>Frontend: imageUrl
    Frontend->>API: POST /api/vlogs (title, description, imageUrl) [session cookie]
    API->>API: Validate session
    API->>Prisma: Create vlog (userId, title, ...)
    Prisma->>DB: INSERT vlog
    DB-->>Prisma: vlog
    Prisma-->>API: vlog
    API-->>Frontend: 201 + vlog object
    Frontend-->>User: Redirect to vlog detail
```

## Like System Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API (/api/vlogs/[id]/like)
    participant Prisma
    participant DB

    User->>Frontend: Click like button
    Frontend->>API: POST /api/vlogs/:id/like (session cookie)
    API->>API: Validate session
    API->>Prisma: Find existing like (userId, vlogId)
    Prisma->>DB: SELECT like
    DB-->>Prisma: none
    Prisma-->>API: no like
    API->>Prisma: Create like record
    Prisma->>DB: INSERT like
    DB-->>Prisma: success
    Prisma-->>API: like
    API-->>Frontend: 201 + updated like count

    Note over Frontend,API: For unlike, DELETE /api/vlogs/:id/like
```

## View Count Flow

```mermaid
sequenceDiagram
    participant Visitor
    participant Frontend
    participant API (/api/vlogs/[id]/view)
    participant Prisma
    participant DB

    Visitor->>Frontend: Load vlog detail page
    Frontend->>API: POST /api/vlogs/:id/view (no auth)
    API->>Prisma: Increment viewCount by 1
    Prisma->>DB: UPDATE vlog SET viewCount = viewCount + 1
    DB-->>Prisma: success
    Prisma-->>API: updated vlog
    API-->>Frontend: 200 + new viewCount
    Frontend-->>Visitor: Display updated count
```

---
