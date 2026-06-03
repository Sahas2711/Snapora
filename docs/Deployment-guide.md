# Deployment Guide – Snapora

This guide explains how to deploy **Snapora** using **Vercel**, **PostgreSQL**, and **Cloudinary**.

---

# Prerequisites

Before deployment, ensure you have:

* A GitHub repository containing the Snapora source code
* A Vercel account
* A PostgreSQL database (Neon, Supabase, Railway, or self-hosted)
* A Cloudinary account for image storage

---

# Environment Variables

Configure the following environment variables in:

* `.env.local` (local development)
* Vercel Project Settings → Environment Variables (production)

| Variable                            | Description                           |
| ----------------------------------- | ------------------------------------- |
| `DATABASE_URL`                      | PostgreSQL connection string          |
| `AUTH_SECRET`                       | Random secret used for authentication |
| `AUTH_TRUST_HOST`                   | Must be set to `true` in production   |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                 |
| `CLOUDINARY_API_KEY`                | Cloudinary API key                    |
| `CLOUDINARY_API_SECRET`             | Cloudinary API secret                 |
| `NEXT_PUBLIC_APP_URL`               | Public application URL                |

Example:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/snapora_dev"

AUTH_SECRET="your-generated-secret"

AUTH_TRUST_HOST=true

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"

CLOUDINARY_API_KEY="your-api-key"

CLOUDINARY_API_SECRET="your-api-secret"

NEXT_PUBLIC_APP_URL="https://snapora.vercel.app"
```

---

# PostgreSQL Setup

## Local Development

### 1. Install PostgreSQL

Install PostgreSQL on your machine and ensure the service is running.

### 2. Create Database

Create a local database:

```sql
CREATE DATABASE snapora_dev;
```

### 3. Configure Connection String

Update `.env.local`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/snapora_dev"
```

### 4. Run Database Migrations

```bash
npx prisma migrate dev
```

---

## Production Database

For production, use a managed PostgreSQL provider:

* Neon
* Supabase
* Railway
* AWS RDS

Copy the provided connection string and set it as:

```env
DATABASE_URL=postgresql://...
```

Ensure SSL is enabled:

```text
?sslmode=require
```

Example:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

---

# Cloudinary Setup

## 1. Create Cloudinary Account

Create a Cloudinary account and access the dashboard.

## 2. Retrieve Credentials

Obtain:

* Cloud Name
* API Key
* API Secret

## 3. Configure Environment Variables

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"

CLOUDINARY_API_KEY="your-api-key"

CLOUDINARY_API_SECRET="your-api-secret"
```

---

## Upload Configuration

If using the Cloudinary Upload Widget:

* Create an Upload Preset
* Configure upload permissions
* Enable unsigned uploads if required

Cloudinary will be used for:

* Vlog cover images
* User profile images
* Future media uploads

---

# Vercel Deployment

## Step 1: Push Code

Push the latest code to GitHub:

```bash
git push origin main
```

---

## Step 2: Import Repository

1. Open Vercel Dashboard
2. Click **Add New Project**
3. Import the Snapora repository
4. Select the repository

Vercel automatically detects Next.js.

No custom framework configuration is required.

---

## Step 3: Configure Environment Variables

Navigate to:

```text
Project Settings → Environment Variables
```

Add all required variables listed above.

---

## Step 4: Deploy

Click:

```text
Deploy
```

Vercel will begin the build and deployment process.

---

# Prisma Migration Configuration

To ensure database migrations run during deployment, update `package.json`.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postinstall": "prisma generate",
    "vercel-build": "prisma migrate deploy && next build"
  }
}
```

---

## Apply Production Migrations

Before production deployment:

```bash
npx prisma migrate deploy
```

This command:

* Applies pending migrations
* Preserves migration history
* Prevents schema drift

---

# Deployment Workflow

## Recommended Process

### 1. Complete Development

```bash
git add .
git commit -m "Feature implementation"
```

### 2. Push Changes

```bash
git push origin main
```

### 3. Automatic Deployment

Vercel automatically detects changes and starts a new deployment.

### 4. Verify Deployment

Check:

* Build logs
* Runtime logs
* Database connectivity
* Authentication flow
* Image upload functionality

---

# Post-Deployment Checklist

## Application

* [ ] Home page loads successfully
* [ ] User registration works
* [ ] User login works
* [ ] Create vlog functionality works
* [ ] Edit vlog functionality works
* [ ] Delete vlog functionality works
* [ ] Like functionality works
* [ ] View counts update correctly
* [ ] User profiles load correctly

## Database

* [ ] Database connection successful
* [ ] Migrations applied successfully
* [ ] Data persists correctly

## Cloudinary

* [ ] Image uploads successful
* [ ] Images render correctly
* [ ] Invalid uploads handled properly

## Security

* [ ] Environment variables configured
* [ ] Secrets not exposed
* [ ] HTTPS enabled

---

# Troubleshooting

## Database Connection Errors

Verify:

```env
DATABASE_URL
```

is correct and includes:

```text
sslmode=require
```

for production databases.

---

## Prisma Migration Errors

Run:

```bash
npx prisma migrate status
```

Then:

```bash
npx prisma migrate deploy
```

---

## Cloudinary Upload Failures

Verify:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

and ensure the upload preset is correctly configured.

---

# Architecture Summary

**Frontend**

* Next.js
* TypeScript
* Tailwind CSS

**Backend**

* Next.js Route Handlers
* Prisma ORM

**Database**

* PostgreSQL

**Media Storage**

* Cloudinary

**Hosting**

* Vercel

---

**Version:** 1.0
**Project:** Snapora
**Deployment Platform:** Vercel
