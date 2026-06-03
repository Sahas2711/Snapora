# Project Requirements – Snapora

## Project Objective

Build a **Vlogging Application** that allows users to share short video‑log posts (vlogs) with a cover image, description, and basic engagement features. The application must be fully responsive, deployed to a live environment, and demonstrate full‑stack development skills using the prescribed technology stack.

## Functional Requirements

### User Authentication
- Users can **register** with name, email, and password.
- Users can **login** with email and password.
- Authenticated users can **logout**.
- Sessions are managed securely (JWT via NextAuth.js).

### Vlog Management
- Authenticated users can **create** a new vlog post (title, description, cover image URL).
- All visitors can **view** a list of published vlogs.
- Visitors can **view** a single vlog in detail (including view count and likes).
- The vlog author can **edit** their own vlog (title, description, cover image).
- The vlog author can **delete** their own vlog.

### Engagement
- Authenticated users can **like** a vlog.
- Authenticated users can **unlike** a previously liked vlog.
- **View count** increments each time a vlog detail page is loaded (server‑side increment).

### User Profiles
- Each user has a public profile page showing their name and all vlogs they have published.
- Profile page is accessible to all visitors.

### Responsive Design
- The entire application must be usable and well‑styled on mobile, tablet, and desktop devices.

### Deployment
- The application must be successfully deployed to a production environment (Vercel) with all features functional.

## Non-Functional Requirements

- **Performance**: Pages should load in under 3 seconds on average connections.
- **Security**: Passwords must be hashed; API endpoints must be protected where necessary (authorised access).
- **Maintainability**: Code follows TypeScript best practices and is well‑structured using the App Router.
- **Scalability**: Stateless architecture; image storage offloaded to Cloudinary.
- **Usability**: Forms provide clear validation feedback; UI is intuitive.

## User Stories

1. As a visitor, I want to browse recent vlogs so I can discover new content.
2. As a visitor, I want to view a single vlog in detail and see its like count and view count.
3. As a visitor, I want to view a user’s profile and their published vlogs.
4. As an unregistered user, I want to create an account so I can engage with vlogs.
5. As a registered user, I want to log in and log out securely.
6. As an authenticated user, I want to create a new vlog with a cover image.
7. As an authenticated user, I want to edit my own vlogs.
8. As an authenticated user, I want to delete my own vlogs.
9. As an authenticated user, I want to like or unlike a vlog.
10. As any visitor, I want the application to be usable on my phone without horizontal scrolling.

## Scope of Project

### In Scope
- User registration, login, logout
- Full CRUD for vlogs with cover images (Cloudinary)
- Like/unlike toggle
- View count tracking (simple increment)
- Public user profiles listing user’s vlogs
- Responsive UI using Tailwind CSS
- Production deployment on Vercel

### Out of Scope
- Video hosting or streaming (only cover images handled)
- Commenting system
- Follow/unfollow users
- Admin dashboard
- Advanced search or filtering

## Assumptions

- The cover image is uploaded by the frontend directly to Cloudinary (using the upload widget) and the resulting URL is sent to the backend API.
- The vlog video itself is assumed to be an embedded external link (optional) – not implemented to keep scope minimal. Only the cover image is stored via Cloudinary.
- Views are tracked by a simple integer increment on the vlog record; no duplicate detection per user/session is required.
- Likes are a many‑to‑many relationship between User and Vlog; no notification system is needed.
- Authentication uses the Credentials provider of NextAuth.js with email and password.
- All API endpoints return JSON responses and follow RESTful conventions.

---