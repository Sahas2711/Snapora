# Snapora – Vlogging Platform

A trainee assignment to build a fully functional vlogging application with authentication, vlog CRUD operations, likes, view counts, and user profiles.

Built with modern web technologies and deployed on Vercel.

---

## Features

- User authentication (Register, Login, Logout)
- Create, view, edit, and delete vlogs
- Cover image upload via Cloudinary
- Like and unlike vlogs
- View count tracking
- Public user profiles
- Fully responsive interface
- Production deployment on Vercel

---

## Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | Next.js 15 (App Router), React, Tailwind CSS |
| Backend | Next.js API Routes, Server Components |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | NextAuth.js v5 (Auth.js) |
| Image Storage | Cloudinary |
| Deployment | Vercel |

---

## Project Structure

```text
snapora/
├── public/
│   └── ...
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── profile/
│   │   ├── vlogs/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── vlogs/
│   │   │   └── users/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   └── types/
├── prisma/
│   └── schema.prisma
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Sahas2711/snapora.git
cd snapora
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file and add the required values.

### 4. Run Database Migrations

Ensure PostgreSQL is running.

```bash
npx prisma migrate dev
```

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Environment Variables

| Variable | Description |
|-----------|-------------|
| DATABASE_URL | PostgreSQL connection string |
| AUTH_SECRET | Auth.js secret |
| AUTH_TRUST_HOST | Set to true in production |
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLOUDINARY_API_KEY | Cloudinary API key |
| CLOUDINARY_API_SECRET | Cloudinary API secret |
| NEXT_PUBLIC_APP_URL | Application base URL |

---

## Running Locally

After setup, you can:

- Browse vlogs as a visitor
- Register a new account
- Create, edit, and delete your own vlogs
- Like and unlike vlogs
- View user profiles

---

## Deployment

Production URL:

```text
https://snapora.vercel.app
```

> Replace with the actual deployment URL after deployment.

---

## Screenshots

Add screenshots of:

- Home Page
- Vlog Detail Page
- User Profile Page
- Create/Edit Vlog Page

---

## Future Improvements

- Video upload support
- Comment system
- Follow/Unfollow users
- Search and filtering
- Pagination
- Unit testing
- Integration testing