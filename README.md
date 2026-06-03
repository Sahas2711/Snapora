# Snapora

Snapora is a full-stack vlogging platform where users can register, publish vlog posts with Cloudinary-hosted cover images, like and unlike content, track views, and browse public creator profiles.

This repository currently contains the project documentation and planning artifacts that define the implementation scope. The application is intended to be built with Next.js 15, TypeScript, Prisma, PostgreSQL, NextAuth.js, Tailwind CSS, and Vercel.

## Project Status

- Documentation and planning are present.
- Application source code has not been scaffolded yet.
- The implementation should follow the documents in `docs/` without adding undocumented features.

## Core Features

- User registration, login, and logout
- Create, read, update, and delete vlogs
- Cover image upload using Cloudinary
- Like and unlike functionality
- Server-side view count tracking
- Public user profile pages
- Responsive UI for mobile, tablet, and desktop

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 15, React, Tailwind CSS, Shadcn UI |
| Backend | Next.js Route Handlers, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | NextAuth.js with credentials and JWT sessions |
| Storage | Cloudinary |
| Validation | Zod |
| Deployment | Vercel |

## Documentation Map

All implementation decisions should come from these files:

- [Requirements](docs/Requirements.md)
- [Architecture](docs/Architecture.md)
- [Database Design](docs/DB_Design.md)
- [API Specification](docs/API_Specfication.md)
- [OpenAPI Contract](docs/openapi.yaml)
- [Deployment Guide](docs/Deployment.md)
- [Issue List](docs/issues/issues.csv)

## Functional Scope

### In Scope

- Authentication with name, email, and password
- Vlog CRUD for authenticated users
- Public vlog listing and detail pages
- Like and unlike actions
- Public user profile pages with authored vlogs
- Cloudinary-based cover image workflow
- Production deployment on Vercel

### Out of Scope

- Video hosting or streaming
- Comments
- Follow and unfollow features
- Admin dashboard
- Advanced search and filtering

## Planned Architecture

The documented architecture is a monolithic Next.js application:

- App Router handles pages, layouts, and route handlers
- Prisma manages PostgreSQL access and migrations
- NextAuth.js manages credentials-based authentication
- Cloudinary stores and serves cover images
- Vercel hosts the deployed application

High-level request patterns:

- Visitors can browse vlogs and public profiles without authentication
- Protected API routes require a valid session cookie
- View counts are incremented server-side
- Likes are represented through a relational join table

## Data Model Summary

The documented schema contains three core entities:

- `User`: account identity, email, hashed password, timestamps
- `Vlog`: author-owned post with title, description, image URL, and `viewCount`
- `Like`: join table between users and vlogs with a uniqueness constraint on `userId + vlogId`

Database rules defined in the docs:

- `User -> Vlog` is one-to-many
- `User -> Like` is one-to-many
- `Vlog -> Like` is one-to-many
- Deletes cascade from users to their vlogs and likes, and from vlogs to their likes

## API Summary

All APIs are documented under `/api` and return JSON.

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/signin`
- `POST /api/auth/signout`

### Vlogs

- `GET /api/vlogs`
- `POST /api/vlogs`
- `GET /api/vlogs/{id}`
- `PUT /api/vlogs/{id}`
- `DELETE /api/vlogs/{id}`

### Engagement

- `POST /api/vlogs/{id}/like`
- `DELETE /api/vlogs/{id}/like`
- `POST /api/vlogs/{id}/view`

### Profiles

- `GET /api/profile`
- `GET /api/users/{id}`

For request and response details, use [docs/openapi.yaml](docs/openapi.yaml) and [docs/API_Specfication.md](docs/API_Specfication.md).

## Recommended Folder Structure

The docs and implementation instructions point toward a feature-oriented Next.js structure similar to:

```text
snapora/
|-- docs/
|-- prisma/
|   `-- schema.prisma
|-- public/
|-- src/
|   |-- app/
|   |   |-- (auth)/
|   |   |-- api/
|   |   |-- profile/
|   |   `-- vlogs/
|   |-- components/
|   |-- features/
|   |-- lib/
|   `-- types/
|-- .env.example
|-- package.json
`-- README.md
```

## Environment Variables

The following variables are required by the documented setup:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth secret |
| `AUTH_TRUST_HOST` | Production host trust flag |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `NEXT_PUBLIC_APP_URL` | Base application URL |

## Local Setup Plan

Once the codebase is scaffolded, the intended workflow is:

```bash
npm install
npx prisma migrate dev
npm run dev
```

Expected local URL:

```text
http://localhost:3000
```

## Issue-Driven Implementation Order

Based on `docs/issues/issues.csv`, the implementation sequence should be:

1. Project Documentation and Requirement Analysis
2. Repository Setup and Git Workflow
3. Design Database and API Specification
4. Authentication Module
5. Create Vlog Feature
6. View Vlogs Feature
7. Edit Vlog Feature
8. Delete Vlog Feature
9. Like System
10. View Count Tracking
11. User Profile Page
12. UI and UX Improvements
13. Application Testing
14. Deployment Configuration
15. Final Documentation and Screenshots

Parallelizable work after the foundation is in place:

- Frontend page scaffolding and shared UI components
- Validation schemas and DTO definitions
- API tests and component tests
- Deployment and environment documentation

## Implementation Rules

The supplied project instructions establish these working constraints:

- Read all documents before generating code
- Generate code incrementally, issue by issue
- Do not add undocumented features
- Prefer Server Components and use Client Components only where necessary
- Use Zod for input and environment validation
- Centralize logging and error handling
- Protect authenticated routes and avoid exposing internal errors

## Deployment Target

The intended deployment platform is Vercel with:

- PostgreSQL as the primary database
- Cloudinary for image hosting
- Prisma migrations applied during deployment or just before release

See [docs/Deployment.md](docs/Deployment.md) for the full verification checklist.

## Notes

- The repository currently contains planning documents only.
- The API specification document is named `API_Specfication.md` in the current repo; keep that filename in mind when referencing it.
