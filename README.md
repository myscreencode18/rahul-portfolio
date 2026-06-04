# Rahul Gupta — Portfolio

> Full-stack experience engineer building intelligent, high-performance digital systems.

## Stack

### Frontend
| Technology | Role |
|------------|------|
| Next.js 14 (App Router) | Foundation, routing, SSR |
| React + TypeScript | Component orchestration |
| GSAP + ScrollTrigger + SplitText | Cinematic timelines |
| Framer Motion | Micro-interactions, gestures |
| Three.js + React Three Fiber | 3D spatial atmosphere |
| Lenis | Premium smooth scroll |
| Zustand | Global state management |
| Tailwind CSS + SCSS | Styling system |
| Howler.js | Ambient audio engine |

### Backend
| Technology | Role |
|------------|------|
| Node.js + Hono | Edge-ready API server |
| Socket.io | Real-time WebSocket layer |
| PostgreSQL + Drizzle ORM | Relational data store |
| Redis | Cache, sessions, rate limiting |
| OpenAI API | AI chat and intelligence |
| LangChain | AI workflow orchestration |
| Nodemailer | Email notifications |

### DevOps
| Technology | Role |
|------------|------|
| Vercel | Frontend deployment |
| Cloudflare | CDN, security, edge |
| GitHub Actions | CI/CD |
| Sentry | Error + performance monitoring |

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- OpenAI API key

### Frontend

```bash
cd frontend
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd backend
cp .env.example .env
# Fill in your environment variables
npm install

# Run database migrations
psql $DATABASE_URL -f src/db/migrations/001_init.sql

npm run dev
```

API running at [http://localhost:4000](http://localhost:4000)

---

## Project Structure

```
rahul-portfolio/
├── frontend/                   # Next.js App
│   └── src/
│       ├── app/                # App Router pages + API routes
│       │   ├── page.tsx        # Homepage (all sections)
│       │   ├── layout.tsx      # Root layout
│       │   ├── api/            # Next.js API routes
│       │   └── routes/         # Sub-pages
│       ├── components/
│       │   ├── canvas/         # Three.js + WebGL components
│       │   ├── cursor/         # Custom cursor system
│       │   ├── entry/          # Boot sequence
│       │   ├── layout/         # Nav, providers
│       │   ├── motion/         # Motion primitives
│       │   ├── sections/       # All page sections
│       │   └── ui/             # Reusable UI components
│       ├── hooks/              # Custom React hooks
│       ├── lib/                # Third-party setup
│       ├── shaders/            # GLSL vertex + fragment
│       ├── store/              # Zustand stores
│       ├── styles/             # Global CSS + design system
│       ├── types/              # TypeScript types
│       ├── utils/              # Utility functions
│       └── data/               # Static data (projects, etc.)
│
└── backend/                    # Hono API Server
    └── src/
        ├── app.ts              # Hono app + middleware
        ├── index.ts            # Entry point
        ├── routes/             # API route handlers
        ├── controllers/        # Request controllers
        ├── services/           # Business logic
        ├── middleware/         # Rate limiting, error handling
        ├── websocket/          # Socket.io setup
        ├── db/
        │   ├── postgres.ts     # DB connection
        │   ├── redis.ts        # Cache connection
        │   ├── schema.ts       # Drizzle schema
        │   └── migrations/     # SQL migrations
        └── types/              # Shared types
```

---

## Environment Variables

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
BACKEND_URL=http://localhost:4000
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Backend (`backend/.env`)
```env
PORT=4000
DATABASE_URL=postgresql://postgres:password@localhost:5432/rahul_portfolio
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=sk-...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=rahul@example.com
SMTP_PASS=your-app-password
CONTACT_TO_EMAIL=rahul@example.com
FRONTEND_URL=http://localhost:3000
```

---

## Deployment

### Vercel (Frontend)
```bash
vercel --prod
```

### Backend (Railway / Render / VPS)
```bash
npm run build
npm start
```

---

## Features

- **Cinematic Boot Sequence** — System initialization experience
- **Custom Cursor System** — Context-aware, mode-adaptive cursor
- **Ambient Background** — Live canvas signal grid with cursor lighting
- **Tech Ecosystem Visualizer** — Interactive cluster-based stack explorer
- **Case Study Environments** — Full architecture + decision breakdowns
- **Motion Laboratory** — Magnetic, kinetic, and spatial experiments
- **AI Lab** — Live workflow visualization with simulation
- **Contact Terminal** — Terminal-style communication interface
- **AI Chat API** — Streaming GPT-4 portfolio assistant
- **WebSocket Layer** — Real-time analytics and presence
- **Engineering Mode** — Toggle between experience and technical views
