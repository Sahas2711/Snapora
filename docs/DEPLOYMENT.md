# 🚀 Snapora — Deployment Guide

**Deploy Snapora to production on Vercel with PostgreSQL and Cloudinary.**

---

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Architecture Overview](#-architecture-overview)
- [Environment Variables](#-environment-variables)
- [Vercel Deployment](#-vercel-deployment)
- [PostgreSQL Setup](#-postgresql-setup)
- [Cloudinary Setup](#-cloudinary-setup)
- [Production Checklist](#-production-checklist)
- [Post-Deployment Verification](#-post-deployment-verification)
- [Common Deployment Failures](#-common-deployment-failures)
- [Troubleshooting Guide](#-troubleshooting-guide)
- [Monitoring & Maintenance](#-monitoring--maintenance)
- [Rollback Strategy](#-rollback-strategy)

---

## ✅ Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Repository** | Source code committed and pushed |
| **Vercel Account** | Free tier (Pro recommended for team) |
| **PostgreSQL Database** | [Neon](https://neon.tech/) (recommended), [Supabase](https://supabase.com/), or [Railway](https://railway.app/) |
| **Cloudinary Account** | Free tier ([sign up](https://cloudinary.com/)) |
| **Custom Domain** (optional) | Vercel provides `*.vercel.app` domain by default |

### Local Prerequisites Check

```bash
node --version  # >= 18
npm --version   # >= 10
npx next --version  # Should match package.json (16.x)
npx prisma --version  # Should match package.json (6.x)
```

---

## 🏗 Architecture Overview

```mermaid
graph TD
    User[🌐 Browser] --> Vercel[Vercel Edge Network]
    Vercel --> NextJS[Next.js 16 Server]
    NextJS --> API[API Route Handlers]
    API --> Prisma[Prisma ORM]
    Prisma --> DB[(Neon PostgreSQL)]
    NextJS --> Static[Static Assets CDN]
    Client[Client Browser] --> Cloudinary[Cloudinary CDN]
    Cloudinary --> Images[Image Upload/Storage]
```

**Key points:**
- Vercel hosts both the Next.js server and static assets
- PostgreSQL is an external managed service (database is **not** on Vercel)
- Cloudinary handles all image/video upload and delivery
- Prisma migrations run during Vercel build via `vercel-build` script
- JWT sessions are stateless — no session database needed

---

## 🔐 Environment Variables

### All Required Variables

| Variable | Required | Purpose | How to Get |
|----------|----------|---------|------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string | Neon/Supabase dashboard |
| `AUTH_SECRET` | ✅ | NextAuth.js signing secret | `openssl rand -base64 32` |
| `AUTH_URL` | ✅ | Public app URL | Set during deployment |
| `AUTH_TRUST_HOST` | ✅ | Trust Vercel host header | Always `true` in production |
| `CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary account name | Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary API key | Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary API secret | Cloudinary dashboard |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary name (client) | Same as CLOUDINARY_CLOUD_NAME |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public app URL | `https://snapora.vercel.app` |
| `LOG_LEVEL` | ❌ | Logging verbosity | `info` (default) |

### Example `.env.local`

```env
DATABASE_URL="postgresql://user:password@ep-example-123456.us-east-1.aws.neon.tech/neondb?sslmode=require"

AUTH_SECRET="your-generated-32-byte-base64-secret"
AUTH_URL="https://snapora.vercel.app"
AUTH_TRUST_HOST="true"

CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="abc123def456"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"

NEXT_PUBLIC_APP_URL="https://snapora.vercel.app"
LOG_LEVEL="info"
```

### Generating AUTH_SECRET

```bash
# Linux/macOS
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

---

## 🗄 PostgreSQL Setup

### Option A: Neon (Recommended)

1. Sign up at [neon.tech](https://neon.tech/)
2. Create a new project (region closest to your audience)
3. Copy the connection string from the dashboard
4. Append `?sslmode=require` to the connection string
5. Set as `DATABASE_URL` in Vercel

```env
DATABASE_URL="postgresql://neondb_owner:password@ep-xxxx-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### Option B: Supabase

1. Sign up at [supabase.com](https://supabase.com/)
2. Create a new project
3. Go to Project Settings → Database → Connection string (URI)
4. Copy the URI and set as `DATABASE_URL`

### Option C: Railway

1. Sign up at [railway.app](https://railway.app/)
2. Create a new PostgreSQL service
3. Copy the `DATABASE_URL` from the service dashboard

### Run Migrations

After configuring `DATABASE_URL`, apply migrations:

```bash
# Locally
npx prisma migrate deploy

# This also runs automatically on Vercel via "vercel-build" script
```

---

## ☁️ Cloudinary Setup

### 1. Create Account

1. Sign up at [cloudinary.com](https://cloudinary.com/)
2. Access the dashboard

### 2. Get Credentials

From the Cloudinary Console Dashboard:

| Variable | Where to Find |
|----------|--------------|
| `CLOUDINARY_CLOUD_NAME` | Dashboard → Account Details |
| `CLOUDINARY_API_KEY` | Dashboard → Account Details → API Keys |
| `CLOUDINARY_API_SECRET` | Dashboard → Account Details → API Keys |

### 3. Configure Environment Variables

```env
CLOUDINARY_CLOUD_NAME="dsbqaryi7"
CLOUDINARY_API_KEY="791232142229942"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dsbqaryi7"
```

### 4. Upload Configuration

The app uses **server-signed uploads** — no upload preset required. The signature is generated server-side at `/api/cloudinary/signature`.

---

## ▲ Vercel Deployment

### Step 1: Push Code

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Import to Vercel

1. Open [vercel.com](https://vercel.com/)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Vercel automatically detects Next.js

### Step 3: Configure Environment Variables

Navigate to **Project Settings → Environment Variables** and add all variables from the [Environment Variables](#-environment-variables) table above.

Add each variable **three times** (for each environment):
| Environment | Value |
|-------------|-------|
| Production | Your production values |
| Preview | Same or staging DB |
| Development | Check "Override for local development" |

### Step 4: Build & Deploy Settings

Vercel auto-detects the following from `package.json`:

| Setting | Value |
|---------|-------|
| **Framework** | Next.js |
| **Build Command** | `npx prisma generate && npx prisma migrate deploy && next build` (via `vercel-build` script) |
| **Output Directory** | `.next` (default) |
| **Root Directory** | `./` (default) |

> **Note:** The `package.json` contains a `vercel-build` script that runs Prisma migrations before building. If you see "PrismaClientInitializationError", ensure `DATABASE_URL` is properly configured.

### Step 5: Deploy

Click **Deploy**. Vercel will:

1. Install dependencies (`npm ci`)
2. Run `postinstall` → `prisma generate` (generates Prisma client)
3. Run `vercel-build` → `prisma migrate deploy && next build`
4. Deploy to production URL

### Step 6: (Optional) Custom Domain

1. Go to **Project Settings → Domains**
2. Add your domain
3. Configure DNS records as instructed by Vercel
4. Update `AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your custom domain

---

## ✅ Production Checklist

### Application Functionality

- [ ] Home page loads — hero section visible, CTAs work
- [ ] Login page loads — form validation works
- [ ] Registration works — new user created, verification email sent
- [ ] Password reset flow — request and complete reset
- [ ] Vlog feed loads — paginated stories display correctly
- [ ] Vlog detail page loads — image, stats, author info
- [ ] Create vlog — upload image, fill form, publish succeeds
- [ ] Edit vlog — update fields, save changes
- [ ] Delete vlog — soft delete, removed from feed
- [ ] Like/unlike toggles — count updates correctly
- [ ] View count increments — atomic, per page load
- [ ] User profile loads — own profile and public profiles
- [ ] Dark mode toggle works — preference persists

### Database

- [ ] All migrations applied (`npx prisma migrate status`)
- [ ] Connection string uses SSL (`?sslmode=require`)
- [ ] No pending migrations
- [ ] Database has proper indexes (email, userId, createdAt, deletedAt)
- [ ] Database backups configured (Neon has automatic backups)

### Cloudinary

- [ ] Image uploads work (create vlog test)
- [ ] Images render correctly on all pages
- [ ] Signature endpoint works (`/api/cloudinary/signature`)
- [ ] Video uploads work (under 5MB limit)
- [ ] Upload errors handled gracefully

### Security

- [ ] `AUTH_SECRET` is a strong random value (not default/example)
- [ ] `AUTH_TRUST_HOST` set to `true` (required for Vercel)
- [ ] Rate limiting active on auth endpoints
- [ ] HTTPS enforced (Vercel auto-enables)
- [ ] Environment variables not exposed to client
- [ ] CORS headers configured (if needed)
- [ ] Session cookies are `httpOnly` and `secure` in production
- [ ] Soft deletes prevent data loss on accidental deletion

### Performance

- [ ] Lighthouse score > 80 (mobile)
- [ ] Pages load in under 3 seconds (average connection)
- [ ] Images optimized (Cloudinary auto-optimizes)
- [ ] Static assets cached (Vercel CDN)

### Monitoring

- [ ] Vercel Analytics enabled (if using Pro)
- [ ] Error logging configured (Vercel Logs)
- [ ] Database query monitoring (Neon dashboard)

---

## 🔍 Post-Deployment Verification

### Verify All Pages

```bash
# Test all public pages
for path in "/" "/login" "/register" "/forgot-password" "/vlogs" "/terms" "/guidelines"
do
  echo -n "$path -> "
  curl -s -o /dev/null -w "%{http_code}" "https://your-app.vercel.app$path"
  echo ""
done
```

### Verify API Endpoints

```bash
# Test public API
curl -s https://your-app.vercel.app/api/vlogs | head -c 200

# Test auth validation
curl -s -o /dev/null -w "%{http_code}" -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"wrong"}' \
  https://your-app.vercel.app/api/auth/signin

# Test profile auth enforcement
curl -s -o /dev/null -w "%{http_code}" \
  https://your-app.vercel.app/api/profile
```

### Verify Database Connection

Check Vercel deployment logs for:

```
✔ Your database is connected
✔ Migrations applied successfully
```

---

## ❌ Common Deployment Failures

| Issue | Symptom | Cause | Solution |
|-------|---------|-------|----------|
| **Database connection failed** | "Can't reach database server" | Wrong `DATABASE_URL` or firewall | Verify URL in Vercel env vars. Ensure `?sslmode=require` is appended. |
| **Prisma migration failed** | "Migration not applied" | `vercel-build` script issue | Check `package.json` has `"vercel-build": "prisma migrate deploy && next build"` |
| **Prisma client not generated** | "PrismaClientInitializationError" | Missing `postinstall` script | Ensure `"postinstall": "prisma generate"` in `package.json` |
| **Cloudinary upload fails** | "Upload failed" in browser console | Wrong Cloudinary env vars | Verify `CLOUDINARY_CLOUD_NAME`, `API_KEY`, `API_SECRET` |
| **Auth loop / redirects** | Login → redirect back to login | Wrong `AUTH_URL` or `AUTH_SECRET` | Set `AUTH_URL` to exact production URL. Regenerate `AUTH_SECRET`. |
| **404 on page routes** | Page not found on Vercel | Missing `cleanUrls` in vercel.json | Add `"cleanUrls": true` to `vercel.json` |
| **Build timeout** | Build exceeds 45s limit | Large dependency or slow build | Check for unnecessary deps. Optimize imports. |
| **Middleware not working** | Routes not protected | Deprecated `middleware` convention | Migrate to `proxy` file (Next.js 16 deprecation) |
| **Images not loading** | Broken image placeholders | Cloudinary CORS or URL issue | Verify Cloudinary URLs are HTTPS. Check `imageUrl` format in DB. |
| **Rate limiter blocking** | Random 429 errors on auth | Rate limiter state across Vercel serverless | In-memory rate limiter resets per instance — expected behavior at low traffic. |

---

## 🔧 Troubleshooting Guide

### Debugging Checklist

```bash
# 1. Check Node.js and npm versions
node --version && npm --version

# 2. Check Prisma status
npx prisma migrate status
npx prisma generate

# 3. Test database connection
npx prisma db push --dry-run

# 4. Build locally
npm run build

# 5. Run tests
npm test
npx tsc --noEmit
npm run lint
```

### Vercel-Specific Debugging

**1. Check Build Logs**

Navigate to Vercel Dashboard → Deployment → Click on latest deployment → **Build Logs**

Look for:
- `prisma generate` ran successfully
- `prisma migrate deploy` applied migrations
- `✓ Compiled successfully` at the end

**2. Check Runtime Logs**

Navigate to Vercel Dashboard → **Logs** tab

Look for:
- API route errors (500s)
- Database connection errors
- Auth callback errors

**3. Environment Variable Verification**

Navigate to Vercel Dashboard → **Project Settings → Environment Variables**

Ensure:
- All variables present (compare with `.env.example`)
- No trailing spaces in values
- Production values not using localhost URLs
- `AUTH_URL` matches the exact deployment URL

### Common Error Messages

| Error Message | Likely Cause | Fix |
|---------------|--------------|-----|
| `PrismaClientInitializationError: PrismaClient can't reach database` | `DATABASE_URL` is wrong or database is paused (Neon) | Verify URL, wake Neon database from sleep |
| `Error: Invalid `prisma.user.create()` invocation` | Schema mismatch | Run `npx prisma migrate deploy` |
| `CredentialsSignin` | Auth callback error | Check `AUTH_SECRET` and `AUTH_URL` |
| `MiddlewareError: The "middleware" file convention is deprecated` | Next.js 16 deprecation | Migrate to `proxy` convention |
| `Network Error` from Cloudinary upload | Missing Cloudinary env vars on server | Verify server-side Cloudinary variables |
| `429 Too Many Requests` | Rate limiting | Wait 1 minute, reduce request frequency |
| `500 Internal Server Error` on API route | Unhandled exception | Check Vercel runtime logs for stack trace |

### Database Issues

**Neon specific:**
- Neon free tier pauses after 5 minutes of inactivity
- First request after pause takes 2-5 seconds to wake up
- Solution: Use Neon's "always-available" compute add-on

```env
# Add connection pooler for better performance
DATABASE_URL="postgresql://user:password@ep-xxxx-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&connection_limit=5"
```

### Cloudinary Issues

**Common problems:**
- Upload signature expired → Refresh page and retry
- File too large → Video limit is 5MB; images have no hard limit
- Wrong upload folder → Check `folder` parameter in signature endpoint

---

## 📊 Monitoring & Maintenance

### Vercel Monitoring

| Feature | How to Access |
|---------|--------------|
| **Deployment Logs** | Vercel Dashboard → Deployments |
| **Runtime Logs** | Vercel Dashboard → Logs |
| **Analytics** | Vercel Dashboard → Analytics (Pro) |
| **Speed Insights** | Vercel Dashboard → Speed (Pro) |
| **Error Tracking** | Vercel Dashboard → Logs → Errors |

### Database Monitoring

| Feature | Neon Dashboard |
|---------|---------------|
| Query performance | Monitoring → Query Performance |
| Connection count | Monitoring → Connections |
| Storage usage | Monitoring → Storage |
| Backups | Backups → Automated backups |

### Regular Maintenance Tasks

| Frequency | Task |
|-----------|------|
| **Daily** | Check Vercel error logs |
| **Weekly** | Review database query performance |
| **Monthly** | Update dependencies (`npm update`) |
| **Monthly** | Review and resolve ESLint warnings |
| **Per Release** | Run full test suite |
| **Per Release** | Apply any pending Prisma migrations |

---

## ↩️ Rollback Strategy

### Option A: Vercel Instant Rollback

1. Go to Vercel Dashboard → **Deployments**
2. Find the last known-good deployment
3. Click the three dots → **Promote to Production**

### Option B: Git Revert

```bash
git revert HEAD
git push origin main
```

Vercel automatically deploys the revert.

### Option C: Database Rollback

```bash
# Identify the migration to revert
npx prisma migrate status

# Roll back the last migration
npx prisma migrate reset  # ⚠️ DESTROYS DATA — use with caution
npx prisma migrate dev
```

> **⚠️ Warning:** Database rollbacks can cause data loss. Always back up your database before reverting migrations. Neon provides point-in-time recovery.

---

## 📝 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Environment Variables Guide](https://vercel.com/docs/projects/environment-variables)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides)
- [Cloudinary Node.js SDK](https://cloudinary.com/documentation/node_integration)
- [Neon Serverless PostgreSQL](https://neon.tech/docs/introduction)

---

<div align="center">
  <sub>Version 1.0 · Snapora · Deployed on Vercel</sub>
</div>
