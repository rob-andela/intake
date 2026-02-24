# AI Workforce Transformation — Client Intake Form

Production-ready intake form and gap assessment tool for enterprise AI workforce transformation engagements. Built with Next.js 14, PostgreSQL (via Prisma), and Tailwind CSS.

## Features

- **7-Phase Intake Form** (Phases 0–6) covering executive context, capability assessment, cohort design, talent selection, readiness validation, deployment, and expansion
- **Live AI Readiness Index** — real-time scoring gauge (0–100) with weighted dimensions and readiness bands
- **Light/Dark Theme** toggle with system preference detection
- **PostgreSQL Storage** — all submissions persisted via Prisma ORM
- **Admin Dashboard** (`/admin`) — token-protected view of all entries with status management and admin notes
- **PDF Export** — generate professional PDF reports for any entry via jsPDF
- **Dual-Audience UX** — works for both client self-service and internal discovery calls

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd ai-workforce-intake
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
DATABASE_URL="postgresql://user:password@host:5432/ai_workforce_intake"
ADMIN_SECRET="your-strong-secret-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**PostgreSQL providers that work great:**
- [Neon](https://neon.tech) (free tier, serverless — recommended for Vercel)
- [Supabase](https://supabase.com) (free tier)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Railway](https://railway.app)
- Any standard PostgreSQL instance

### 3. Initialize Database

```bash
npx prisma db push
```

### 4. Run Locally

```bash
npm run dev
```

- **Form**: http://localhost:3000
- **Admin**: http://localhost:3000/admin

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables in Vercel project settings:
   - `DATABASE_URL`
   - `ADMIN_SECRET`
4. Deploy — Vercel auto-detects Next.js

### Netlify

1. Push to GitHub
2. Import in [Netlify Dashboard](https://app.netlify.com/start)
3. Install the `@netlify/plugin-nextjs` plugin
4. Add environment variables in Site Settings → Environment Variables
5. Deploy

## Project Structure

```
src/
├── app/
│   ├── layout.jsx          # Root layout with ThemeProvider
│   ├── page.jsx            # Main intake form page
│   ├── globals.css         # Theme variables + Tailwind
│   ├── admin/
│   │   └── page.jsx        # Admin dashboard
│   └── api/
│       └── entries/
│           ├── route.js    # POST (submit) + GET (list, admin)
│           └── [id]/
│               └── route.js # GET detail, PATCH, DELETE (admin)
├── components/
│   ├── IntakeForm.jsx      # Main form with all 7 phases
│   ├── AdminReport.jsx     # Admin dashboard + detail view
│   ├── ThemeProvider.jsx   # Light/dark context
│   └── ThemeToggle.jsx     # Toggle button
└── lib/
    ├── prisma.js           # Prisma client singleton
    ├── constants.js        # Weights, scores, formulas
    ├── phases.js           # Form phase/field definitions
    ├── auth.js             # Admin auth helper
    └── pdf-export.js       # Client-side PDF generation
```

## Admin Dashboard

Access at `/admin` with the `ADMIN_SECRET` you set in your environment.

**Capabilities:**
- View all submitted entries with filtering by status
- Drill into full entry detail with all responses
- Update entry status (draft → submitted → reviewed)
- Add internal admin notes
- Export any entry as a formatted PDF
- Delete entries

## AI Readiness Index

The readiness score is calculated as:

```
Index = Σ (dimension_score × weight) × 20
```

| Dimension | Weight |
|-----------|--------|
| Business Alignment | 20% |
| Technical & Data Maturity | 25% |
| Delivery Governance | 20% |
| Workforce Capability | 20% |
| Economic Readiness | 15% |

**Readiness Bands:**
- **0–39**: Foundational Risk
- **40–59**: Emerging
- **60–79**: Deployable
- **80–100**: Scalable Transformation

## License

Proprietary. Internal use only.
