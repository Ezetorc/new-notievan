# NotiEvan Backend

Backend for NotiEvan, a school newspaper to publish and manage articles about what is happening at Evan.

## Tech Stack

- **Runtime**: Node.js + Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT (HS256)
- **Storage**: Cloudinary (article images)

## Features

- **Articles**: create, update, delete, list, get own, and get random.
- **Authentication**: register, login, get current user.
- **Authorization**: role-based access control with `USER`, `AUTHOR`, and `ADMIN`.
- **Users**: admin listing and role updates.

## Architecture (high level)

```
Client ──HTTP──> Express API
                 ├─ Auth routes (/auth)
                 ├─ Users routes (/users)
                 └─ Articles routes (/articles)

Prisma Client ──> PostgreSQL
Cloudinary SDK ─> Cloudinary (images)
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm (project uses npm as the package manager)
- PostgreSQL database

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in `backend/` with the following variables:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Initialize the database

Push the Prisma schema to your database:

```bash
npx prisma db push
```

Note: The project uses Prisma. Migrations have not been set up yet; `db push` is used for local schema sync.

### Run the server (development)

```bash
npm run dev
```

The API will be available at:

```
http://localhost:3000
```

## Authentication and Roles

- JWT signed with HS256.
- Roles: `USER`, `AUTHOR`, `ADMIN`.
- Typical access:
  - `AUTHOR` can create and manage their own articles.
  - `ADMIN` has elevated permissions (e.g., list users, update roles).

## File Uploads (Cloudinary)

- Article images are uploaded to Cloudinary.
- The service uploads to a folder named `articles`.
- Ensure Cloudinary environment variables are set.

## API Overview

Base URL: `http://localhost:3000`

### Auth

- `POST /auth/register`
  - Body: `{ name, email, password }`
  - Response: `{ user, token }`

- `POST /auth/login`
  - Body: `{ email, password }`
  - Response: `{ user, token }`

- `GET /auth/`
  - Auth: Bearer token
  - Response: current user

### Users

- `GET /users`
  - Auth: `ADMIN`
  - List users (sanitized)

- `PATCH /users/:id/role`
  - Auth: `ADMIN`
  - Body: `{ role }` where role ∈ `USER | AUTHOR | ADMIN`

- `GET /users/:id/name`
  - Auth: Bearer token
  - Get only the user name by id

### Articles

- `GET /articles`
  - Public list with fields (id, title, subtitle, description, image, authorId)

- `GET /articles/:id`
  - Public get by id

- `GET /articles/random?omit=<id>`
  - Public get random selection (excluding optional `omit` id)

- `GET /articles/own`
  - Auth: Bearer token
  - List articles authored by the current user

- `POST /articles`
  - Auth: `AUTHOR`
  - Multipart form for optional `image`; JSON body for article fields

- `PATCH /articles/:id`
  - Auth: `AUTHOR`
  - Update own article; supports image replacement

- `DELETE /articles/:id`
  - Auth: `AUTHOR`
  - Delete own article; cleans up Cloudinary image if present

## Error Format

Errors are returned as JSON:

```json
{ "error": "message or details" }
```

Validation errors (Zod) return status 400 with issue details.

## Deployment (Vercel)

- Set the environment variables in your Vercel project settings.
- Deploy the Node.js/Express server as a Vercel project.
- Ensure your `PORT` is set (Vercel provides `PORT` automatically for serverless functions; for a custom server you may need configuration). If using Vercel serverless, consider adapting routes into `api/` functions. If deploying as a Node server, configure a Vercel setup that runs your server entry point.

## License

MIT