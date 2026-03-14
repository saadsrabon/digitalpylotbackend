# RBAC System -- Dynamic Permission Platform

A dynamic Role Based Access Control (RBAC) system where access is
controlled by **permissions instead of hard-coded roles**.

Administrators and managers can grant or revoke permissions from users
without changing the codebase.

The system enforces a **grant ceiling rule**, meaning a user cannot
grant permissions they do not possess.

------------------------------------------------------------------------

## ✦ Technology Stack

### Backend

-   Node.js
-   Express.js
-   TypeScript
-   Prisma ORM
-   PostgreSQL

### Authentication

-   JWT Access Tokens (15 minutes)
-   Refresh Tokens (7 days)
-   httpOnly Cookie Storage

### Security

-   bcrypt password hashing
-   Rate limiting
-   Session revocation
-   Audit logging

### Frontend (planned)

-   Next.js 14
-   TypeScript
-   Permission based routing

------------------------------------------------------------------------

## ✦ Key Features

-   Dynamic permission system
-   Role based defaults with user overrides
-   Grant ceiling enforcement
-   Cookie based authentication
-   Refresh token rotation
-   Session management
-   Audit log tracking
-   User status enforcement (Active, Suspended, Banned)

------------------------------------------------------------------------

## ✦ System Architecture

The backend follows a modular architecture.

Request ↓ Routes ↓ Controllers ↓ Services ↓ Database (Prisma)

Responsibilities

Routes\
Handle endpoint definitions.

Controllers\
Handle request and response.

Services\
Contain business logic.

Middleware\
Authentication and permission checks.

Utilities\
Reusable helpers such as JWT and auditing.

------------------------------------------------------------------------

## ✦ Project Structure

    src
    │
    ├── config
    │   ├── env.ts
    │   └── prisma.ts
    │
    ├── middleware
    │   ├── auth.middleware.ts
    │   ├── permission.middleware.ts
    │   ├── error.middleware.ts
    │   └── rateLimit.middleware.ts
    │
    ├── modules
    │   │
    │   ├── auth
    │   │   ├── auth.controller.ts
    │   │   ├── auth.routes.ts
    │   │   └── auth.service.ts
    │   │
    │   ├── users
    │   │   ├── user.controller.ts
    │   │   ├── user.routes.ts
    │   │   └── user.service.ts
    │   │
    │   ├── permissions
    │   │   ├── permission.controller.ts
    │   │   ├── permission.routes.ts
    │   │   └── permission.service.ts
    │   │
    │   └── audit
    │       ├── audit.controller.ts
    │       ├── audit.routes.ts
    │       └── audit.service.ts
    │
    ├── services
    │   └── permission.service.ts
    │
    ├── utils
    │   ├── jwt.ts
    │   ├── password.ts
    │   └── audit.ts
    │
    ├── routes
    │   └── index.ts
    │
    ├── app.ts
    └── server.ts

------------------------------------------------------------------------

## ✦ RBAC Permission Model

Permissions are atomic keys.

Example permission keys

    dashboard.view
    users.read
    users.create
    users.update
    users.delete
    permissions.manage
    audit.read
    leads.read
    leads.manage
    tasks.read
    tasks.manage
    reports.view
    settings.manage

Final permission resolution

    User Permissions
          +
    Role Permissions
          =
    Effective Permissions

------------------------------------------------------------------------

## ✦ Database Schema Overview

### User

Represents system users.

Fields

-   id
-   name
-   email
-   password
-   roleId
-   managerId
-   status

Relations

-   role
-   sessions
-   permissions
-   auditLogs

### Role

Defines default permission groups.

Examples

-   Admin
-   Manager
-   Agent
-   Customer

### Permission

Atomic access rule.

Example

    users.create

### RolePermission

Maps roles to permissions.

### UserPermission

Overrides role permissions.

### Session

Stores refresh token sessions.

Fields

-   refreshToken
-   revoked
-   expiresAt

### AuditLog

Tracks system actions.

Example actions

    LOGIN
    LOGOUT
    USER_CREATED
    PERMISSION_UPDATED

------------------------------------------------------------------------

## ✦ API Endpoints

### Authentication

POST /api/auth/login\
POST /api/auth/refresh\
POST /api/auth/logout

### Users

GET /api/users\
POST /api/users\
GET /api/users/:id

### Permissions

GET /api/permissions\
GET /api/permissions/user/:id\
PATCH /api/permissions/user/:id

### Audit

GET /api/audit

------------------------------------------------------------------------

## ✦ Environment Variables

Create `.env`

PORT=5000 DATABASE_URL=postgresql://user:password@localhost:5432/rbac
JWT_SECRET=supersecret JWT_REFRESH_SECRET=superrefreshsecret

------------------------------------------------------------------------

## ✦ Installation

Clone repository

git clone `https://github.com/saadsrabon/digitalpylotbackend.git`
cd digitalpylotbackend

Install dependencies

npm install

Run migrations

npx prisma migrate dev

Seed database

npx tsx prisma/seed.ts

Start development server

npm run dev

------------------------------------------------------------------------

## ✦ Default Admin User

The seed script creates an administrator.

Email

demoadmin@digitalpylot.com

Password

Admin123!

------------------------------------------------------------------------

## ✦ Security Features

-   bcrypt password hashing
-   httpOnly cookies
-   refresh token rotation
-   session revocation
-   user status enforcement
-   rate limiting
-   audit logging

------------------------------------------------------------------------

