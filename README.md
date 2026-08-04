# CoderSquare: Developer Community Platform

[![TypeScript](https://img.shields.io/badge/typescript-5+-blue.svg)](https://typescriptlang.org/)
[![Bun](https://img.shields.io/badge/runtime-bun-orange.svg)](https://bun.sh/)
[![Express](https://img.shields.io/badge/express-4.17+-green.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/database-sqlite3-blue.svg)](https://sqlite.org/)
[![JWT](https://img.shields.io/badge/auth-JWT-red.svg)](https://jwt.io/)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](LICENSE)

> **Developer Community Platform** — Full-stack platform for developers to share posts, comment, like, and interact. Built with TypeScript, Express, SQLite, and shared types.

---

## 🎯 Overview

**CoderSquare** — A developer community platform where developers can create posts, comment, like, and interact. Built as a full-stack application with shared types between frontend and backend.

---

## 🏗️ Architecture

```
coderSquare/
├── server/                    # Backend API (Bun + Express + TypeScript)
│   ├── datastore/             # Data layer
│   │   ├── dao/               # Data Access Objects
│   │   │   ├── userDao.ts
│   │   │   ├── postDao.ts
│   │   │   ├── commentDao.ts
│   │   │   └── likeDao.ts
│   │   ├── sql/               # SQLite queries
│   │   ├── memorydb/          # In-memory fallback
│   │   └── index.ts           # Datastore factory
│   ├── handlers/              # Route handlers
│   │   ├── AuthHandles.ts     # Auth: register, login, me
│   │   └── postHandlers.ts    # Posts: CRUD, likes, comments
│   ├── middleware/            # Express middleware
│   │   ├── authMiddleware.ts  # JWT authentication
│   │   ├── loggerMiddleware.ts # Request logging (Pino)
│   │   └── errormiddleware.ts # Error handling
│   ├── server.ts              # Express app entry point
│   ├── auth.ts                # Auth utilities
│   ├── nodemon.json           # Watch config (server + shared)
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── shared/                    # Shared TypeScript types
│   ├── index.ts               # Main exports
│   ├── src/
│   │   ├── errors.ts          # Custom error classes
│   │   ├── api.ts             # API client types
│   │   ├── endpoints.ts       # Endpoint definitions
│   │   └── types.ts           # Shared type definitions
│   └── package.json
├── docs/
│   ├── PRD.md                 # Product Requirements Document
│   └── ERD.md                 # Entity Relationship Diagram
└── README.md
```

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Runtime** | Bun (primary) / Node.js 18+ |
| **Language** | TypeScript 5+ |
| **Framework** | Express 4.17+ |
| **Database** | SQLite 3 (sqlite3) / SQLite (sqlite) |
| **ORM/Query** | Raw SQL with `sqlite3` / `sqlite` driver |
| **Auth** | JWT (jsonwebtoken), bcrypt (planned) |
| **Validation** | Manual / Zod (planned) |
| **Logging** | Pino + pino-pretty |
| **Dev Tools** | Nodemon, TypeScript, Jest, Supertest |
| **Shared Types** | TypeScript project references / symlink |

---

## 🗄️ Database Schema (ERD)

### Users
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Posts
```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Comments
```sql
CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL REFERENCES posts(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Likes
```sql
CREATE TABLE likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL REFERENCES posts(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(post_id, user_id)
);
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/oovaa/coderSquare.git
cd coderSquare

# Backend
cd server
bun install  # or npm install
bun run start:dev    # Development with nodemon
# or
bun run start:prod   # Production

# Shared types (linked)
cd ../shared
bun install
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/signup` | Register new user |
| POST | `/api/v1/signin` | Login user |
| GET | `/api/v1/posts` | List posts (paginated, requires auth) |
| POST | `/api/v1/posts` | Create post (requires auth) |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/z` | Health check endpoint |

---

## 🗂️ Shared Types (Type Safety)

```typescript
// shared/src/types.ts
export interface User {
  id: number
  email: string
  username: string
  bio?: string
  avatar_url?: string
  created_at: string
}

export interface Post {
  id: number
  user_id: number
  title: string
  content: string
  created_at: string
  updated_at: string
  author?: User
  likes_count: number
  comments_count: number
  is_liked: boolean
}

export interface Comment {
  id: number
  post_id: number
  user_id: number
  content: string
  created_at: string
  author?: User
}
```

---

## 🛠 Development

```bash
git clone https://github.com/oovaa/coderSquare.git
cd coderSquare

# Backend
cd server
bun install
bun run start:dev

# Run tests
bun run test
bun run test:watch
```

---

## 📋 Development Scripts

```json
// server/package.json
{
  "scripts": {
    "build": "bnu i",
    "start": "nodemon server.ts",
    "start:prod": "bun server.ts",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

---

## 📄 License

ISC License - see [LICENSE](LICENSE) for details.

---

## 👤 Author

**Omar Abdulrahim**  
GitHub: [@oovaa](https://github.com/oovaa)